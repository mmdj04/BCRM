"use client";

import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const notificationOptions = [
  {
    id: "email" as const,
    label: "Notificações por E-mail",
    description: "Receba alertas importantes por e-mail",
    icon: Mail,
  },
  {
    id: "whatsapp" as const,
    label: "Notificações por WhatsApp",
    description: "Receba alertas via WhatsApp",
    icon: MessageSquare,
  },
  {
    id: "push" as const,
    label: "Notificações Push",
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
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="size-5" />
          Configurações de Notificação
        </CardTitle>
        <CardDescription>Escolha como deseja receber notificações do sistema.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {notificationOptions.map((notif) => {
            const Icon = notif.icon;
            const isEnabled = setupData.notifications[notif.id];
            return (
              <label
                key={notif.id}
                htmlFor={`notif-${notif.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                  isEnabled ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50",
                )}
              >
                <Checkbox
                  id={`notif-${notif.id}`}
                  checked={isEnabled}
                  onCheckedChange={() => toggleNotification(notif.id)}
                />
                <Icon className="size-4 shrink-0" />
                <div className="flex-1">
                  <span className="font-medium text-sm">{notif.label}</span>
                  <p className="text-muted-foreground text-xs">{notif.description}</p>
                </div>
              </label>
            );
          })}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(4)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(6)}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
