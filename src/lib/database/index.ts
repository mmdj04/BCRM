let isPlatform: (platform: string) => boolean = () => false;
try {
  // biome-ignore lint/style/noCommonJs: Conditional dynamic require for Capacitor platform detection
  const capacitor = require("@capacitor/core");
  isPlatform = capacitor.isPlatform;
} catch {
  // Not in Capacitor environment
}

import { prisma } from "./prisma-client";

export interface UserData {
  id: string;
  supabaseId?: string | null;
  name?: string | null;
  email: string;
  role?: string;
  avatar?: string | null;
  phone?: string | null;
  status?: string;
  website?: string | null;
  company?: string | null;
  plan?: string | null;
  planInterval?: string | null;
  subscriptionStatus?: string | null;
  cancelAtPeriodEnd?: boolean;
  isBusiness?: boolean;
  companyName?: string | null;
  cnpj?: string | null;
  syncVersion?: number;
  lastSyncedAt?: Date | null;
  isDirty?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface CustomerData {
  id: string;
  supabaseId?: string | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  status?: string;
  notes?: string | null;
  tags?: string;
  source?: string | null;
  syncVersion?: number;
  lastSyncedAt?: Date | null;
  isDirty?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DatabaseAdapter {
  getUser(id: string): Promise<UserData | null>;
  getUserByEmail(email: string): Promise<UserData | null>;
  createUser(data: Partial<UserData>): Promise<UserData>;
  updateUser(id: string, data: Partial<UserData>): Promise<UserData>;

  getCustomers(): Promise<CustomerData[]>;
  getCustomer(id: string): Promise<CustomerData | null>;
  createCustomer(data: Partial<CustomerData>): Promise<CustomerData>;
  updateCustomer(id: string, data: Partial<CustomerData>): Promise<CustomerData>;
  deleteCustomer(id: string): Promise<void>;

  getDirtyRecords(table: string, userId: string): Promise<any[]>;
  markSynced(table: string, id: string, supabaseId: string): Promise<void>;
}

class PrismaDatabaseAdapter implements DatabaseAdapter {
  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id } }) as Promise<UserData | null>;
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } }) as Promise<UserData | null>;
  }

  async createUser(data: Partial<UserData>) {
    return prisma.user.create({ data: data as any }) as Promise<UserData>;
  }

  async updateUser(id: string, data: Partial<UserData>) {
    return prisma.user.update({ where: { id }, data: data as any }) as Promise<UserData>;
  }

  async getCustomers() {
    return prisma.customer.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    }) as Promise<CustomerData[]>;
  }

  async getCustomer(id: string) {
    return prisma.customer.findUnique({ where: { id } }) as Promise<CustomerData | null>;
  }

  async createCustomer(data: Partial<CustomerData>) {
    return prisma.customer.create({ data: data as any }) as Promise<CustomerData>;
  }

  async updateCustomer(id: string, data: Partial<CustomerData>) {
    return prisma.customer.update({ where: { id }, data: data as any }) as Promise<CustomerData>;
  }

  async deleteCustomer(id: string) {
    await prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date(), isDirty: true },
    });
  }

  async getDirtyRecords(table: string, _userId: string) {
    const model = (prisma as any)[table];
    if (!model) return [];
    return model.findMany({
      where: { isDirty: true },
    });
  }

  async markSynced(table: string, id: string, supabaseId: string) {
    const model = (prisma as any)[table];
    if (!model) return;
    await model.update({
      where: { id },
      data: {
        supabaseId,
        isDirty: false,
        syncVersion: { increment: 1 },
        lastSyncedAt: new Date(),
      },
    });
  }
}

async function getAdapter(): Promise<DatabaseAdapter> {
  if (isPlatform("hybrid")) {
    const { CapacitorDatabaseAdapter } = await import("./capacitor");
    return new CapacitorDatabaseAdapter();
  }
  return new PrismaDatabaseAdapter();
}

let _adapter: DatabaseAdapter | null = null;

export async function getDb(): Promise<DatabaseAdapter> {
  if (!_adapter) {
    _adapter = await getAdapter();
  }
  return _adapter;
}

export const db: DatabaseAdapter = new PrismaDatabaseAdapter();
