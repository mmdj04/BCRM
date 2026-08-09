"use client";

import {
  Banknote,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  Check,
  CheckSquare,
  CreditCard,
  FileStack,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Mail,
  MessageSquare,
  QrCode,
  Receipt,
  Server,
  Settings,
  ShoppingBag,
  Smartphone,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetup } from "@/contexts/setup-context";

const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  crm: BarChart3,
  finance: CreditCard,
  analytics: BrainCircuit,
  productivity: CheckSquare,
  ecommerce: ShoppingBag,
  academy: BookOpen,
  logistics: Truck,
  infrastructure: Server,
  fileManager: FileStack,
  patientMonitoring: HeartPulse,
};

const moduleLabels: Record<string, string> = {
  crm: "CRM",
  finance: "Finanças",
  analytics: "Análises",
  productivity: "Produtividade",
  ecommerce: "E-commerce",
  academy: "Academia",
  logistics: "Logística",
  infrastructure: "Infraestrutura",
  fileManager: "Arquivos",
  patientMonitoring: "Monitoramento",
};

const paymentLabels: Record<string, string> = {
  stripe: "Stripe",
  pix: "PIX",
  boleto: "Boleto",
  creditCard: "Cartão de Crédito",
  bankTransfer: "Transferência Bancária",
};

export function SummaryStep() {
  const { setupData, setStep, completeSetup } = useSetup();

  const enabledModules = Object.entries(setupData.modules)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const enabledPayments = Object.entries(setupData.payment)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const enabledNotifications = Object.entries(setupData.notifications)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const handleComplete = () => {
    completeSetup();
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
          <Check className="size-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Configuração Completa!</CardTitle>
        <CardDescription>Revise suas configurações antes de começar.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Empresa */}
        {setupData.company.name && (
          <div className="rounded-lg border p-3">
            <div className="mb-2 flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Empresa</span>
            </div>
            <p className="text-sm">{setupData.company.name}</p>
            {setupData.company.cnpj && (
              <p className="text-muted-foreground text-xs">CNPJ: {setupData.company.cnpj}</p>
            )}
          </div>
        )}

        {/* Projeto */}
        <div className="rounded-lg border p-3">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">Projeto</span>
          </div>
          <p className="text-sm">{setupData.project.name || "BCRM"}</p>
          {setupData.project.url && (
            <p className="text-muted-foreground text-xs">{setupData.project.url}</p>
          )}
        </div>

        {/* Módulos */}
        <div className="rounded-lg border p-3">
          <div className="mb-2 flex items-center gap-2">
            <LayoutDashboard className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">Módulos ({enabledModules.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {enabledModules.map((mod) => (
              <span key={mod} className="rounded bg-primary/10 px-2 py-0.5 text-primary text-xs">
                {moduleLabels[mod]}
              </span>
            ))}
          </div>
        </div>

        {/* Pagamento */}
        <div className="rounded-lg border p-3">
          <div className="mb-2 flex items-center gap-2">
            <Banknote className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">Pagamentos ({enabledPayments.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {enabledPayments.map((pay) => (
              <span key={pay} className="rounded bg-primary/10 px-2 py-0.5 text-primary text-xs">
                {paymentLabels[pay]}
              </span>
            ))}
          </div>
        </div>

        {/* Usuários */}
        {setupData.users.length > 0 && (
          <div className="rounded-lg border p-3">
            <div className="mb-2 flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Usuários ({setupData.users.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {setupData.users.map((user, i) => (
                <span key={`${user.email}-${i}`} className="rounded bg-muted px-2 py-0.5 text-xs">
                  {user.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(6)}>
            Voltar
          </Button>
          <Button onClick={handleComplete} size="lg">
            <Check className="mr-2 size-4" />
            Iniciar BCRM
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
