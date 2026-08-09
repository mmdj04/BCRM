"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SetupProvider, useSetup } from "@/contexts/setup-context";
import { useAuth } from "@/lib/supabase/auth-context";

import { SetupWizard } from "./_components/setup-wizard";

function SetupContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { isSetupComplete, isLoading: setupLoading } = useSetup();

  useEffect(() => {
    if (authLoading || setupLoading) return;
    if (!user) {
      router.push("/auth/v1/login");
      return;
    }
    if (isSetupComplete) {
      window.location.href = "/dashboard/default";
    }
  }, [user, isSetupComplete, authLoading, setupLoading, router]);

  if (authLoading || setupLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (isSetupComplete) {
    return null;
  }

  return <SetupWizard />;
}

export default function SetupPage() {
  return <SetupPageInner />;
}

function SetupPageInner() {
  const { user, isDemo, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SetupProvider userId={user.id || "demo-user-001"} isDemo={isDemo}>
      <SetupContent />
    </SetupProvider>
  );
}
