"use client";

import { Check } from "lucide-react";

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
  { title: "Boas-vindas", component: WelcomeStep, required: null },
  { title: "Empresa", component: CompanyStep, required: true },
  { title: "Projeto", component: ProjectStep, required: true },
  { title: "Módulos", component: ModulesStep, required: true },
  { title: "Pagamento", component: PaymentStep, required: false },
  { title: "Usuários", component: UsersStep, required: false },
  { title: "Notificações", component: NotificationsStep, required: false },
  { title: "Resumo", component: SummaryStep, required: null },
];

export function SetupWizard() {
  const { currentStep } = useSetup();
  const StepComponent = steps[currentStep]?.component || WelcomeStep;
  const currentStepData = steps[currentStep];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-1 items-center">
                <div
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full font-medium text-xs transition-colors",
                    index <= currentStep && "bg-primary text-primary-foreground",
                    index > currentStep && "bg-muted text-muted-foreground",
                  )}
                >
                  {index < currentStep ? <Check className="size-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      index < currentStep ? "bg-primary" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
            <span className="hidden sm:inline">
              {currentStepData?.title}
              {currentStepData?.required === true && (
                <span className="ml-2 rounded bg-destructive/10 px-1.5 py-0.5 font-medium text-[10px] text-destructive">
                  Obrigatório
                </span>
              )}
              {currentStepData?.required === false && (
                <span className="ml-2 rounded bg-muted px-1.5 py-0.5 font-medium text-[10px]">
                  Opcional
                </span>
              )}
            </span>
            <span>
              Etapa {currentStep + 1} de {steps.length}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <StepComponent />
      </div>
    </div>
  );
}
