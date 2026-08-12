"use client";

import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const notificationOptions = [
  {
    id: "email" as const,
    label: "E-mail",
    description: "Receba alertas importantes por e-mail",
    icon: Mail,
  },
  {
    id: "whatsapp" as const,
    label: "WhatsApp",
    description: "Receba alertas via WhatsApp",
    icon: MessageSquare,
  },
  {
    id: "push" as const,
    label: "Push",
    description: "Notificações no navegador em tempo real",
    icon: Smartphone,
  },
  {
    id: "weeklyReport" as const,
    label: "Relatório Semanal",
    description: "Resumo semanal de atividades por e-mail",
    icon: Bell,
  },
];

export function NotificationsStep() {
  const { setupData, updateSetupData, setStep } = useSetup();

  const toggleNotification = (notifId: keyof typeof setupData.notifications) => {
    updateSetupData({
      notifications: {
        ...setupData.notifications,
        [notifId]: !setupData.notifications[notifId],
      },
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Title */}
      <div className="mb-6">
        <h1 className="mb-2 font-bold text-3xl text-foreground tracking-tight">Notificações</h1>
        <p className="text-base text-muted-foreground">Escolha como deseja receber notificações do sistema.</p>
      </div>

      {/* Options */}
      <div className="flex flex-1 flex-col gap-3">
        {notificationOptions.map((notif) => {
          const Icon = notif.icon;
          const isEnabled = setupData.notifications[notif.id];
          return (
            <label
              key={notif.id}
              htmlFor={`notif-${notif.id}`}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 transition-all",
                isEnabled ? "border-primary/30 bg-primary/5" : "border-border/60 bg-background/80 hover:border-border",
              )}
            >
              <Checkbox
                id={`notif-${notif.id}`}
                checked={isEnabled}
                onCheckedChange={() => toggleNotification(notif.id)}
              />
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                <Icon className={cn("size-4", isEnabled ? "text-primary" : "text-muted-foreground")} />
              </div>
              <div className="flex-1">
                <span className="font-medium text-foreground text-sm">{notif.label}</span>
                <p className="text-muted-foreground text-xs">{notif.description}</p>
              </div>
            </label>
          );
        })}
      </div>

      {/* CTA */}
      <Button size="lg" className="mt-6 w-full bg-primary text-white hover:bg-primary/90" onClick={() => setStep(6)}>
        Continuar
      </Button>
    </div>
  );
}
