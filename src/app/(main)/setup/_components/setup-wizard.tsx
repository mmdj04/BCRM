"use client";

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
  { title: "Boas-vindas", component: WelcomeStep },
  { title: "Empresa", component: CompanyStep },
  { title: "Projeto", component: ProjectStep },
  { title: "Módulos", component: ModulesStep },
  { title: "Pagamento", component: PaymentStep },
  { title: "Usuários", component: UsersStep },
  { title: "Notificações", component: NotificationsStep },
  { title: "Resumo", component: SummaryStep },
];

export function SetupWizard() {
  const { currentStep } = useSetup();
  const StepComponent = steps[currentStep]?.component || WelcomeStep;

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
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                    index <= currentStep && "bg-primary text-primary-foreground",
                    index > currentStep && "bg-muted text-muted-foreground",
                  )}
                >
                  {index < currentStep ? "✓" : index + 1}
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
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span className="hidden sm:inline">{steps[currentStep]?.title}</span>
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
