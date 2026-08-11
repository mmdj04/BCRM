"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth/auth-context";

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

    // Demo users: check sessionStorage (setup completes within same session)
    if (isDemo) {
      const demoSetupDone = sessionStorage.getItem("bcrm_setup_complete_demo") === "true";
      if (!demoSetupDone) {
        router.push("/setup");
        return;
      }
      setChecked(true);
      return;
    }

    // Real users: check localStorage
    const userId = user.id;
    const stored = localStorage.getItem(`bcrm_setup_complete_${userId}`);

    if (stored !== "true") {
      router.push("/setup");
      return;
    }

    setChecked(true);
  }, [user, isDemo, loading, router]);

  if (loading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
