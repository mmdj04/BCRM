"use client";

import {
  Bell,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  FileCheck,
  Globe,
  LayoutDashboard,
  Sparkles,
  Users,
} from "lucide-react";

import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

import { CompanyStep } from "./steps/company-step";
import { ModulesStep } from "./steps/modules-step";
import { NotificationsStep } from "./steps/notifications-step";
import { PaymentStep } from "./steps/payment-step";
import { ProjectStep } from "./steps/project-step";
import { SummaryStep } from "./steps/summary-step";
import { UsersStep } from "./steps/users-step";
import { WelcomeStep } from "./steps/welcome-step";

const steps = [
  { title: "Boas-vindas", icon: Sparkles, component: WelcomeStep, required: null },
  { title: "Empresa", icon: Building2, component: CompanyStep, required: true },
  { title: "Projeto", icon: Globe, component: ProjectStep, required: true },
  { title: "Módulos", icon: LayoutDashboard, component: ModulesStep, required: true },
  { title: "Pagamento", icon: CreditCard, component: PaymentStep, required: false },
  { title: "Usuários", icon: Users, component: UsersStep, required: false },
  { title: "Notificações", icon: Bell, component: NotificationsStep, required: false },
  { title: "Resumo", icon: FileCheck, component: SummaryStep, required: null },
];

type VisibleStep = {
  title: string;
  icon: typeof Sparkles;
  index: number;
  type: "completed" | "current" | "next" | "future";
  collapsedCount?: number;
  required?: boolean | null;
};

function getVisibleSteps(current: number): VisibleStep[] {
  const total = steps.length;
  const maxVisible = 5;

  if (total <= maxVisible) {
    return steps.map((s, i) => ({
      title: s.title,
      icon: s.icon,
      index: i,
      type: getStepType(i, current),
      required: s.required,
    }));
  }

  const result: VisibleStep[] = [];

  if (current <= 2) {
    for (let i = 0; i <= Math.min(current + 1, total - 1); i++) {
      result.push({ title: steps[i].title, icon: steps[i].icon, index: i, type: getStepType(i, current), required: steps[i].required });
    }
    if (current + 2 < total) {
      result.push({ title: "...", icon: Sparkles, index: -1, type: "future" });
    }
  } else if (current >= total - 2) {
    if (current - 1 > 0) {
      result.push({ title: "...", icon: Sparkles, index: -1, type: "completed", collapsedCount: current - 1 });
    }
    for (let i = current; i < total; i++) {
      result.push({ title: steps[i].title, icon: steps[i].icon, index: i, type: getStepType(i, current), required: steps[i].required });
    }
  } else {
    if (current - 1 > 0) {
      result.push({ title: "...", icon: Sparkles, index: -1, type: "completed", collapsedCount: current - 1 });
    }
    for (let i = current; i <= current + 1; i++) {
      result.push({ title: steps[i].title, icon: steps[i].icon, index: i, type: getStepType(i, current), required: steps[i].required });
    }
    if (current + 2 < total) {
      result.push({ title: "...", icon: Sparkles, index: -1, type: "future" });
    }
  }

  return result;
}

function getStepType(index: number, current: number): "completed" | "current" | "next" | "future" {
  if (index < current) return "completed";
  if (index === current) return "current";
  if (index === current + 1) return "next";
  return "future";
}

export function SetupWizard() {
  const { currentStep, setStep } = useSetup();
  const StepComponent = steps[currentStep]?.component || WelcomeStep;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep) / (steps.length - 1)) * 100;
  const visibleSteps = getVisibleSteps(currentStep);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-2xl">
        {/* Smart Progress */}
        <div className="mb-8">
          {/* Progress bar */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="shrink-0 font-medium text-muted-foreground text-xs tabular-nums">
              {currentStep + 1}/{steps.length}
            </span>
          </div>

          {/* Adaptive step indicators */}
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {visibleSteps.map((step, i) => {
              const isEllipsis = step.index === -1;
              const isCurrent = step.type === "current";

              if (isEllipsis) {
                return (
                  <div key={`ellipsis-${step.type}-${i}`} className="flex items-center gap-1">
                    {step.type === "completed" && step.collapsedCount && step.collapsedCount > 0 && (
                      <div className="flex items-center gap-1.5 rounded-full border border-dashed border-primary/30 bg-primary/5 px-2.5 py-1">
                        <Check className="size-3 text-primary" />
                        <span className="font-medium text-primary text-xs">
                          {step.collapsedCount} {step.collapsedCount === 1 ? "etapa" : "etapas"}
                        </span>
                      </div>
                    )}
                    {step.type === "future" && (
                      <div className="flex items-center gap-1 text-muted-foreground/50">
                        <div className="size-1 rounded-full bg-current" />
                        <div className="size-1 rounded-full bg-current" />
                        <div className="size-1 rounded-full bg-current" />
                      </div>
                    )}
                  </div>
                );
              }

              const Icon = step.icon;

              return (
                <div key={`${step.title}-${step.index}`} className="flex items-center gap-1 sm:gap-2">
                  {/* Connector line */}
                  {i > 0 && visibleSteps[i - 1]?.index !== -1 && (
                    <div
                      className={cn(
                        "h-px w-3 transition-colors sm:w-6",
                        step.type === "completed" || step.type === "current" ? "bg-primary/40" : "bg-muted",
                      )}
                    />
                  )}

                  {/* Step pill */}
                  <button
                    type="button"
                    onClick={() => {
                      if (step.type === "completed" || step.type === "current") {
                        setStep(step.index);
                      }
                    }}
                    disabled={step.type === "next" || step.type === "future"}
                    className={cn(
                      "group flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all",
                      step.type === "completed" &&
                        "cursor-pointer bg-primary/10 text-primary hover:bg-primary/20",
                      step.type === "current" &&
                        "ring-primary/30 bg-primary text-primary-foreground shadow-sm ring-2",
                      step.type === "next" && "border border-dashed border-muted-foreground/30 bg-muted/50 text-muted-foreground",
                      step.type === "future" && "bg-muted/30 text-muted-foreground/50",
                    )}
                  >
                    {step.type === "completed" ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Icon className="size-3.5" />
                    )}
                    <span className={cn("hidden sm:inline", step.type === "future" && "hidden")}>
                      {step.title}
                    </span>
                    {step.type === "current" && step.required === true && (
                      <span className="ml-0.5 rounded-full bg-primary-foreground/20 px-1 py-0.5 text-[9px] leading-none">
                        Obrig.
                      </span>
                    )}
                    {step.type === "current" && step.required === false && (
                      <span className="ml-0.5 rounded-full bg-primary-foreground/20 px-1 py-0.5 text-[9px] leading-none">
                        Opcional
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Current step detail */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentStepData && (() => {
                const Icon = currentStepData.icon;
                return <Icon className="size-4 text-muted-foreground" />;
              })()}
              <span className="font-medium text-foreground text-sm">
                {currentStepData?.title}
              </span>
              {currentStepData?.required === true && (
                <span className="rounded bg-destructive/10 px-1.5 py-0.5 font-medium text-[10px] text-destructive">
                  Obrigatório
                </span>
              )}
              {currentStepData?.required === false && (
                <span className="rounded bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground">
                  Opcional
                </span>
              )}
            </div>
            <span className="text-muted-foreground text-xs">
              Etapa {currentStep + 1} de {steps.length}
            </span>
          </div>

          {/* Dot overview */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {steps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                onClick={() => {
                  if (i <= currentStep) setStep(i);
                }}
                disabled={i > currentStep}
                className={cn(
                  "size-1.5 rounded-full transition-all",
                  i < currentStep && "cursor-pointer bg-primary/40 hover:bg-primary/60",
                  i === currentStep && "size-2 bg-primary",
                  i > currentStep && "bg-muted",
                )}
                aria-label={step.title}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <StepComponent />
      </div>
    </div>
  );
}
