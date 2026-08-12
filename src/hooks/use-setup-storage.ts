"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/auth/auth-context";

interface SetupUserData {
  name: string;
  email: string;
  role: string;
  team: string;
}

interface SetupTeamData {
  name: string;
  description: string;
  color: string;
}

interface SetupCustomRoleData {
  name: string;
  description: string;
}

interface SetupStorageData {
  company?: {
    name?: string;
    cnpj?: string;
    [key: string]: unknown;
  };
  project?: {
    name?: string;
    [key: string]: unknown;
  };
  users?: SetupUserData[];
  teams?: SetupTeamData[];
  customRoles?: SetupCustomRoleData[];
  [key: string]: unknown;
}

function getStorageKeys(userId: string) {
  return {
    demo: "bcrm_setup_data_demo",
    real: `bcrm_setup_data_${userId}`,
  };
}

export function useSetupStorage() {
  const { user, isDemo } = useAuth();
  const [setupData, setSetupData] = useState<SetupStorageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) {
      setLoading(false);
      return;
    }

    try {
      const keys = getStorageKeys(user.userId);
      const raw = localStorage.getItem(isDemo ? keys.demo : keys.real);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSetupData(parsed);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [user?.userId, isDemo]);

  const saveSetupData = (data: SetupStorageData) => {
    if (!user?.userId) return;
    try {
      const keys = getStorageKeys(user.userId);
      const storageKey = isDemo ? keys.demo : keys.real;
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSetupData(data);
    } catch {
      // ignore
    }
  };

  const updateSetupData = (partial: Partial<SetupStorageData>) => {
    if (!setupData) return;
    const updated = { ...setupData, ...partial };
    saveSetupData(updated);
  };

  return {
    setupData,
    loading,
    setupUsers: setupData?.users ?? [],
    setupTeams: setupData?.teams ?? [],
    setupCustomRoles: setupData?.customRoles ?? [],
    saveSetupData,
    updateSetupData,
  };
}
