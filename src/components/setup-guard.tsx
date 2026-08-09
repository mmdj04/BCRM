"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/lib/supabase/auth-context";

function getSetupStorageKey(userId: string): string {
  return `bcrm_setup_complete_${userId}`;
}

export function SetupGuard({ children }: { children: React.ReactNode }) {
  const { user, isDemo, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/v1/login");
      return;
    }

    const userId = user.id || "demo-user-001";
    const stored = localStorage.getItem(getSetupStorageKey(userId));

    if (stored !== "true") {
      router.push("/setup");
      return;
    }

    setChecked(true);
  }, [user, loading, router]);

  if (loading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
