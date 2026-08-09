"use client";

import { redirect } from "next/navigation";

import { SetupProvider, useSetup } from "@/contexts/setup-context";
import { useAuth } from "@/lib/supabase/auth-context";

import { SetupWizard } from "./_components/setup-wizard";

function SetupContent() {
  const { user, isDemo, loading: authLoading } = useAuth();
  const { isSetupComplete, isLoading: setupLoading } = useSetup();

  if (authLoading || setupLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    redirect("/auth/v1/login");
    return null;
  }

  if (isSetupComplete) {
    redirect("/dashboard/default");
    return null;
  }

  return <SetupWizard />;
}

export default function SetupPage() {
  return (
    <SetupPageInner />
  );
}

function SetupPageInner() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    redirect("/auth/v1/login");
    return null;
  }

  return (
    <SetupProvider userId={user.id || "demo-user-001"}>
      <SetupContent />
    </SetupProvider>
  );
}
