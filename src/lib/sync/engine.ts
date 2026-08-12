import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { prisma } from "@/lib/database/prisma-client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export type SyncDirection = "push" | "pull" | "both";
export type SyncStatus = "idle" | "syncing" | "error" | "success";

export type SyncResult = {
  pushed: number;
  pulled: number;
  errors: string[];
  timestamp: Date;
};

class SyncEngine {
  private supabase: SupabaseClient | null = null;
  private interval: ReturnType<typeof setInterval> | null = null;
  private status: SyncStatus = "idle";
  private listeners: Set<(status: SyncStatus) => void> = new Set();

  constructor() {
    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  get currentStatus(): SyncStatus {
    return this.status;
  }

  onStatusChange(callback: (status: SyncStatus) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private setStatus(status: SyncStatus) {
    this.status = status;
    this.listeners.forEach((cb) => {
      cb(status);
    });
  }

  async pushLocalChanges(userId: string): Promise<number> {
    if (!this.supabase) return 0;

    let pushed = 0;
    const tables = ["customer", "deal", "task", "payment"];

    for (const table of tables) {
      const model = (prisma as any)[table];
      if (!model) continue;

      const dirtyRecords = await model.findMany({
        where: { userId, isDirty: true },
      });

      for (const record of dirtyRecords) {
        try {
          const { id, supabaseId, isDirty, syncVersion, lastSyncedAt, createdAt, updatedAt, ...data } = record;

          const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));

          if (supabaseId) {
            const { error } = await this.supabase
              .from(`${table}s`)
              .update(cleanData)
              .eq("id", supabaseId);

            if (error) throw error;
          } else {
            const { data: remoteRecord, error } = await this.supabase
              .from(`${table}s`)
              .insert({ ...cleanData, user_id: userId })
              .select("id")
              .single();

            if (error) throw error;

            if (remoteRecord) {
              await model.update({
                where: { id },
                data: {
                  supabaseId: remoteRecord.id,
                  isDirty: false,
                  syncVersion: syncVersion + 1,
                  lastSyncedAt: new Date(),
                },
              });
            }
            pushed++;
            continue;
          }

          await model.update({
            where: { id },
            data: {
              isDirty: false,
              syncVersion: syncVersion + 1,
              lastSyncedAt: new Date(),
            },
          });
          pushed++;
        } catch (error) {
          console.error(`Sync push error for ${table}:`, error);
        }
      }
    }

    return pushed;
  }

  async pullRemoteChanges(userId: string): Promise<number> {
    if (!this.supabase) return 0;

    let pulled = 0;
    const tables = ["customers", "deals", "tasks", "payments"];

    for (const tableName of tables) {
      const singularTable = tableName.replace(/s$/, "");
      const model = (prisma as any)[singularTable];
      if (!model) continue;

      try {
        const lastRecord = await model.findFirst({
          where: { userId },
          orderBy: { lastSyncedAt: "desc" },
        });

        const lastSync = lastRecord?.lastSyncedAt?.toISOString() || new Date(0).toISOString();

        const { data: remoteRecords, error } = await this.supabase
          .from(tableName)
          .select("*")
          .eq("user_id", userId)
          .gt("updated_at", lastSync);

        if (error) throw error;

        if (!remoteRecords) continue;

        for (const remote of remoteRecords) {
          const { id: remoteId, user_id, created_at, updated_at, ...remoteData } = remote;

          const existing = await model.findFirst({
            where: { supabaseId: remoteId },
          });

          if (existing) {
            await model.update({
              where: { id: existing.id },
              data: {
                ...remoteData,
                isDirty: false,
                lastSyncedAt: new Date(),
              },
            });
          } else {
            await model.create({
              data: {
                id: crypto.randomUUID(),
                supabaseId: remoteId,
                userId,
                ...remoteData,
                isDirty: false,
                lastSyncedAt: new Date(),
              },
            });
          }
          pulled++;
        }
      } catch (error) {
        console.error(`Sync pull error for ${tableName}:`, error);
      }
    }

    return pulled;
  }

  async sync(userId: string): Promise<SyncResult> {
    if (!this.supabase) {
      return {
        pushed: 0,
        pulled: 0,
        errors: ["Supabase not configured"],
        timestamp: new Date(),
      };
    }

    this.setStatus("syncing");
    const errors: string[] = [];

    try {
      const pushed = await this.pushLocalChanges(userId).catch((e) => {
        errors.push(`Push error: ${e.message}`);
        return 0;
      });

      const pulled = await this.pullRemoteChanges(userId).catch((e) => {
        errors.push(`Pull error: ${e.message}`);
        return 0;
      });

      const result: SyncResult = {
        pushed,
        pulled,
        errors,
        timestamp: new Date(),
      };

      this.setStatus(errors.length > 0 ? "error" : "success");
      return result;
    } catch (error) {
      this.setStatus("error");
      return {
        pushed: 0,
        pulled: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        timestamp: new Date(),
      };
    }
  }

  startPeriodicSync(userId: string, intervalMs = 30000): void {
    this.stopPeriodicSync();

    this.sync(userId).catch(console.error);

    this.interval = setInterval(() => {
      this.sync(userId).catch(console.error);
    }, intervalMs);
  }

  stopPeriodicSync(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export const syncEngine = new SyncEngine();
