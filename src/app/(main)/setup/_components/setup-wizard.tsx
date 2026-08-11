"use client";

import { ArrowLeft, Building2, Check, FileCheck, Globe, LayoutDashboard, Sparkles, Users } from "lucide-react";

import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CompanyStep } from "./steps/company-step";
import { DashboardPreview } from "./dashboard-preview";
import { ModulesStep } from "./steps/modules-step";
import { NotificationsStep } from "./steps/notifications-step";
import { ProjectStep } from "./steps/project-step";
import { SummaryStep } from "./steps/summary-step";
import { UsersStep } from "./steps/users-step";
import { WelcomeStep } from "./steps/welcome-step";

const steps = [
  { title: "Boas-vindas", icon: Sparkles, component: WelcomeStep, required: null },
  { title: "Empresa", icon: Building2, component: CompanyStep, required: true },
  { title: "Projeto", icon: Globe, component: ProjectStep, required: true },
  { title: "Módulos", icon: LayoutDashboard, component: ModulesStep, required: true },
  { title: "Usuários", icon: Users, component: UsersStep, required: false },
  { title: "Notificações", icon: Users, component: NotificationsStep, required: false },
  { title: "Resumo", icon: FileCheck, component: SummaryStep, required: null },
];

export function SetupWizard() {
  const { currentStep, setStep } = useSetup();
  const StepComponent = steps[currentStep]?.component || WelcomeStep;
  const totalSteps = steps.length;
  const canGoBack = currentStep > 0 && currentStep < totalSteps - 1;

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a]">
      {/* Left panel - Form */}
      <div className="flex w-full flex-col lg:w-[55%]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#16a34a] text-white">
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-bold text-foreground">BCRM</span>
          </div>
        </div>

        {/* Progress segments */}
        <div className="px-6 lg:px-10">
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={`segment-${i}`}
                className={cn(
                  "h-1 flex-1 rounded-full transition-all duration-300",
                  i < currentStep
                    ? "bg-[#16a34a]"
                    : i === currentStep
                      ? "bg-[#16a34a]"
                      : "bg-border",
                )}
              />
            ))}
          </div>
        </div>

        {/* Form content */}
        <div className="flex flex-1 flex-col px-6 py-8 lg:px-10">
          {/* Back button */}
          {canGoBack && (
            <button
              type="button"
              onClick={() => setStep(currentStep - 1)}
              className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Voltar
            </button>
          )}

          {/* Step component */}
          <div className="flex flex-1 flex-col">
            <StepComponent />
          </div>
        </div>
      </div>

      {/* Right panel - Dashboard preview (hidden on mobile) */}
      <div className="hidden w-[45%] items-center justify-center p-6 lg:flex">
        <div className="relative w-full max-w-md">
          {/* Decorative gradient */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#16a34a]/5 to-transparent" />

          {/* Dashboard preview */}
          <DashboardPreview className="relative" />
        </div>
      </div>
    </div>
  );
}
