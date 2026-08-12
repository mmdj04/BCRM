"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useAuth } from "@/lib/auth/auth-context";

import { type SyncResult, type SyncStatus, syncEngine } from "./engine";

type SyncContextValue = {
  status: SyncStatus;
  lastSync: SyncResult | null;
  sync: () => Promise<SyncResult>;
  startAutoSync: () => void;
  stopAutoSync: () => void;
};

const SyncContext = createContext<SyncContextValue>({
  status: "idle",
  lastSync: null,
  sync: async () => ({ pushed: 0, pulled: 0, errors: [], timestamp: new Date() }),
  startAutoSync: () => {
    // Default - overridden by provider
  },
  stopAutoSync: () => {
    // Default - overridden by provider
  },
});

export function useSync() {
  return useContext(SyncContext);
}

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [lastSync, setLastSync] = useState<SyncResult | null>(null);

  useEffect(() => {
    const unsubscribe = syncEngine.onStatusChange(setStatus);
    return unsubscribe;
  }, []);

  const sync = useCallback(async () => {
    if (!user?.userId) {
      return { pushed: 0, pulled: 0, errors: ["Not authenticated"], timestamp: new Date() };
    }

    const result = await syncEngine.sync(user.userId);
    setLastSync(result);
    return result;
  }, [user?.userId]);

  const startAutoSync = useCallback(() => {
    if (user?.userId) {
      syncEngine.startPeriodicSync(user.userId, 30000);
    }
  }, [user?.userId]);

  const stopAutoSync = useCallback(() => {
    syncEngine.stopPeriodicSync();
  }, []);

  useEffect(() => {
    if (user?.userId) {
      startAutoSync();
    }
    return () => stopAutoSync();
  }, [user?.userId, startAutoSync, stopAutoSync]);

  return (
    <SyncContext.Provider value={{ status, lastSync, sync, startAutoSync, stopAutoSync }}>
      {children}
    </SyncContext.Provider>
  );
}
