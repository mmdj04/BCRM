"use client";

import { CreditCard, QrCode, Receipt, Building2, Banknote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "stripe" as const,
    label: "Stripe",
    description: "Cartão de crédito e débito internacional",
    icon: CreditCard,
    recommended: true,
  },
  {
    id: "pix" as const,
    label: "PIX",
    description: "Pagamento instantâneo brasileiro",
    icon: QrCode,
    recommended: true,
  },
  {
    id: "boleto" as const,
    label: "Boleto Bancário",
    description: "Pagamento com vencimento",
    icon: Receipt,
    recommended: false,
  },
  {
    id: "creditCard" as const,
    label: "Cartão de Crédito (Brasil)",
    description: "Gateway brasileiro de cartão",
    icon: CreditCard,
    recommended: true,
  },
  {
    id: "bankTransfer" as const,
    label: "Transferência Bancária",
    description: "TED/Pix manual",
    icon: Building2,
    recommended: false,
  },
];

export function PaymentStep() {
  const { setupData, updateSetupData, setStep } = useSetup();

  const togglePayment = (methodId: keyof typeof setupData.payment) => {
    updateSetupData({
      payment: {
        ...setupData.payment,
        [methodId]: !setupData.payment[methodId],
      },
    });
  };

  const enabledCount = Object.values(setupData.payment).filter(Boolean).length;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Banknote className="size-5" />
          Formas de Pagamento
        </CardTitle>
        <CardDescription>
          Configure os métodos de pagamento aceitos.
          {enabledCount > 0 && (
            <span className="ml-1 font-medium text-primary">{enabledCount} método(s) selecionado(s)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isEnabled = setupData.payment[method.id];
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => togglePayment(method.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                  isEnabled
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50",
                )}
              >
                <Checkbox
                  checked={isEnabled}
                  onCheckedChange={() => togglePayment(method.id)}
                />
                <Icon className="size-4 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{method.label}</span>
                    {method.recommended && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">Recomendado</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">{method.description}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(3)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(5)}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
