"use client";

import { AlertTriangle, CreditCard, Wifi } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccessBlockedProps {
  reason: "no-internet" | "expired" | "grace-period" | "pending";
  onRetry: () => void;
  daysLeft?: number;
}

export function AccessBlocked({ reason, onRetry, daysLeft }: AccessBlockedProps) {
  const configs = {
    "no-internet": {
      icon: <Wifi className="size-12 text-orange-500" />,
      title: "Sem Conexão",
      description: "Você precisa de internet para usar o BCRM. Conecte-se à internet e tente novamente.",
      action: "Tentar Novamente",
    },
    expired: {
      icon: <AlertTriangle className="size-12 text-red-500" />,
      title: "Conta Expirada",
      description: "Sua assinatura expirou e a conta foi removida. Crie uma nova conta para continuar.",
      action: "Criar Nova Conta",
    },
    "grace-period": {
      icon: <CreditCard className="size-12 text-yellow-500" />,
      title: "Assinatura Expirada",
      description: `Sua assinatura expirou. Você tem ${daysLeft ?? 0} dias para renovar antes que a conta seja removida.`,
      action: "Renovar Assinatura",
    },
    pending: {
      icon: <CreditCard className="size-12 text-blue-500" />,
      title: "Conta Não Ativada",
      description: "Sua conta está pendente de ativação. Digite sua chave de licença para ativar.",
      action: "Ativar Conta",
    },
  };

  const config = configs[reason];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-background">
            {config.icon}
          </div>
          <CardTitle className="text-2xl">{config.title}</CardTitle>
          <CardDescription className="text-base">{config.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={onRetry} size="lg" className="w-full">
            {config.action}
          </Button>

          {reason === "pending" && (
            <Button variant="outline" size="lg" className="w-full" onClick={() => (window.location.href = "/activate")}>
              Digitar Chave de Licença
            </Button>
          )}

          {reason === "grace-period" && (
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => (window.location.href = "/dashboard/billing")}
            >
              Ver Planos
            </Button>
          )}

          <p className="text-center text-muted-foreground text-xs">
            O BCRM requer conexão com a internet para verificar sua assinatura.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
