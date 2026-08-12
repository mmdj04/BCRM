"use client";

import { Building2, CreditCard, Globe, LayoutDashboard, Mail, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Building2,
    title: "Dados da Empresa",
    tag: "Obrigatório",
    tagColor: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
  },
  {
    icon: Globe,
    title: "Projeto",
    tag: "Obrigatório",
    tagColor: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
  },
  {
    icon: LayoutDashboard,
    title: "Módulos",
    tag: "Obrigatório",
    tagColor: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
  },
  {
    icon: Users,
    title: "Equipe",
    tag: "Opcional",
    tagColor: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    icon: Mail,
    title: "Notificações",
    tag: "Opcional",
    tagColor: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    icon: CreditCard,
    title: "Plano & Pagamento",
    tag: "Finalizar",
    tagColor: "text-primary bg-primary/10",
  },
];

export function WelcomeStep() {
  const { setStep } = useSetup();

  return (
    <div className="flex flex-1 flex-col">
      {/* Title */}
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl text-foreground tracking-tight">Vamos configurar seu BCRM</h1>
        <p className="text-base text-muted-foreground">Configurar seu painel leva menos de 5 minutos.</p>
      </div>

      {/* Steps list */}
      <div className="mb-8 flex flex-1 flex-col gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/80 px-5 py-4 transition-colors hover:bg-background"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted/50">
                <Icon className="size-5 text-muted-foreground" />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="font-medium text-foreground">{step.title}</span>
                <span className={cn("rounded-full px-2.5 py-1 font-medium text-xs", step.tagColor)}>{step.tag}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90" onClick={() => setStep(1)}>
        Continuar
      </Button>

      <p className="mt-4 text-center text-muted-foreground text-sm">
        Já tem uma conta?{" "}
        <a href="/auth/v1/login" className="font-medium text-primary hover:underline">
          Entrar
        </a>
      </p>
    </div>
  );
}
