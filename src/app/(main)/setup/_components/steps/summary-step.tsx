"use client";

import { useEffect, useState } from "react";

import {
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  Globe,
  LayoutDashboard,
  Smartphone,
  Users,
  X,
} from "lucide-react";

import { addOns, billingIntervals, computeOptions, intervalPrice, intervalPricePerMonth, planPrice } from "@/app/(main)/dashboard/billing/_components/data";
import type { BillingInterval } from "@/app/(main)/dashboard/billing/_components/data";
import { PaymentForm } from "@/components/payment-form";
import { StripeElementsProvider } from "@/components/stripe-provider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSetup } from "@/contexts/setup-context";
import { useAuth } from "@/lib/auth/auth-context";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

const moduleLabels: Record<string, string> = {
  crm: "CRM",
  finance: "Finanças",
  analytics: "Análises",
  productivity: "Produtividade",
  ecommerce: "Comércio Eletrônico",
  academy: "Academia",
  logistics: "Logística",
  infrastructure: "Infraestrutura",
  fileManager: "Gerenciador de Arquivos",
  patientMonitoring: "Monitoramento de Pacientes",
  email: "E-mail",
  chat: "Chat",
  calendar: "Calendário",
  kanban: "Kanban",
  tasks: "Tarefas",
  invoice: "Fatura",
  users: "Usuários",
  roles: "Funções",
};

const paymentLabels: Record<string, string> = {
  stripe: "Stripe (Cartão, PIX, Google Pay)",
  pix: "PIX",
  boleto: "Boleto Bancário",
  creditCard: "Cartão de Crédito (Brasil)",
  bankTransfer: "Transferência Bancária",
};

const _notificationLabels: Record<string, string> = {
  email: "Notificações por E-mail",
  whatsapp: "Notificações por WhatsApp",
  push: "Notificações Push",
  weeklyReport: "Relatório Semanal",
};

const summaryPlans = [
  {
    id: "pro",
    name: "Pro",
    price: planPrice(25),
    period: "/mês",
    description: "Para equipes em crescimento",
    baseFeatures: [
      "Até 20 usuários",
      "Todos os módulos",
      "1 projeto ativo",
      "Banco Postgres dedicado",
      "8 GB de disco por projeto",
      "250 GB de egress mensal",
      "100 GB de armazenamento",
      "Auth com 100K MAUs",
      "2M Edge Functions",
      "500 conexões Realtime",
      "5M mensagens Realtime",
      "100 transformações de imagem",
      "SAML/SSO (50 usuários)",
      "Backups automáticos (7 dias)",
      "Suporte prioritário",
      "Relatórios avançados",
      "API de integração",
    ],
    extraFeatures: [],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: planPrice(599),
    period: "/mês",
    description: "Para organizações compliance e escala",
    baseFeatures: [],
    extraFeatures: [
      "SOC2 + ISO 27001",
      "HIPAA (aditivo)",
      "SSO para Dashboard",
      "Platform Audit Logs",
      "AWS PrivateLink",
      "Backups automáticos (14 dias)",
      "Retenção de logs (28 dias)",
      "Suporte prioritário com SLA",
      "Access Roles: Read-only + Predefined",
    ],
  },
];

const notificationLabels: Record<string, string> = {
  email: "Notificações por E-mail",
  whatsapp: "Notificações por WhatsApp",
  push: "Notificações Push",
  weeklyReport: "Relatório Semanal",
};

export function SummaryStep() {
  const { setupData, setStep, completeSetup } = useSetup();
  const { user, isDemo } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [selectedCompute, setSelectedCompute] = useState<string>("medium");
  const [selectedAddOn, setSelectedAddOn] = useState<string>("none");
  const [selectedInterval, setSelectedInterval] = useState<BillingInterval>("monthly");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);

  const enabledModules = Object.entries(setupData.modules)
    .filter(([_, v]) => v)
    .map(([k]) => k);
  const disabledModules = Object.entries(setupData.modules)
    .filter(([_, v]) => !v)
    .map(([k]) => k);
  const enabledPayments = Object.entries(setupData.payment)
    .filter(([_, v]) => v)
    .map(([k]) => k);
  const enabledNotifications = Object.entries(setupData.notifications)
    .filter(([_, v]) => v)
    .map(([k]) => k);
  const disabledNotifications = Object.entries(setupData.notifications)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  const selectedPlanData = summaryPlans.find((p) => p.id === selectedPlan);
  const selectedAddOnData = selectedAddOn !== "none" ? addOns.find((a) => a.id === selectedAddOn) : null;
  const addOnPrice = selectedAddOnData?.priceBRL ?? 0;
  const computePrice = computeOptions.find((c) => c.id === selectedCompute)?.price ?? 0;
  const planPricePerMonth = intervalPricePerMonth(selectedPlanData?.price ?? 0, selectedInterval);
  const totalMonthly = planPricePerMonth + computePrice + addOnPrice;

  const intervalConfig = billingIntervals.find((i) => i.id === selectedInterval)!;
  const monthsLabel = selectedInterval === "quarterly" ? "3 meses" : selectedInterval === "annual" ? "1 ano" : null;

  const openPaymentDialog = async () => {
    // Demo mode: skip Stripe entirely, mark payment as complete
    if (isDemo) {
      // Save plan to localStorage for demo mode
      localStorage.setItem(
        "bcrm_demo_plan",
        JSON.stringify({
          plan: selectedPlan,
          compute: selectedCompute,
          pitr: selectedAddOn,
          plan_interval: selectedInterval,
          status: "active",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      );
      setPaymentComplete(true);
      return;
    }

    if (!user?.id || !user?.email) {
      window.location.href = "/auth/v1/login";
      return;
    }

    setLoadingPaymentIntent(true);
    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          compute: selectedCompute,
          interval: selectedInterval,
          userId: user.id,
          email: user.email,
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentDialogOpen(true);
      }
    } catch {
      // User can retry
    } finally {
      setLoadingPaymentIntent(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentDialogOpen(false);
    setPaymentComplete(true);
    setClientSecret(null);

    // Save plan to database directly (backup to webhook)
    if (user?.id) {
      try {
        const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            plan: selectedPlan,
            planInterval: selectedInterval,
            subscriptionStatus: "active",
            currentPeriodEnd: periodEnd,
          }),
        });
      } catch {
        // Webhook will handle it as backup
      }
    }
  };

  const handlePaymentCancel = () => {
    setPaymentDialogOpen(false);
    setClientSecret(null);
  };

  const handleComplete = () => {
    completeSetup();
    if (isDemo) {
      window.location.href = "/activate";
    }
  };

  const fmt = (value: string, fallback = "Não preenchido") => value || fallback;

  const paymentDialogContent = clientSecret ? (
    <StripeElementsProvider clientSecret={clientSecret}>
      <PaymentForm
        planName={selectedPlanData?.name ?? ""}
        planPrice={`R$ ${totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        onSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    </StripeElementsProvider>
  ) : (
    <div className="flex items-center justify-center py-8">
      <div className="size-8 animate-spin rounded-full border-4 border-current border-t-transparent text-primary" />
    </div>
  );

  return (
    <>
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <Check className="size-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Configuração Completa!</CardTitle>
          <CardDescription>Revise todas as configurações antes de começar.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Accordion type="multiple" className="w-full" defaultValue={[]}>
            {/* Empresa */}
            <AccordionItem value="company">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Dados da Empresa</span>
                  {setupData.company.name ? (
                    <CheckCircle2 className="size-3.5 text-green-600" />
                  ) : (
                    <X className="size-3.5 text-muted-foreground" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-sm">
                  <p>
                    <strong>Nome:</strong> {fmt(setupData.company.name, "Não informado")}
                  </p>
                  <p>
                    <strong>CNPJ:</strong> {fmt(setupData.company.cnpj, "Não informado")}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {fmt(setupData.company.description, "Não informada")}
                  </p>
                  <p>
                    <strong>Website:</strong> {fmt(setupData.company.website, "Não informado")}
                  </p>
                  <p>
                    <strong>Setor:</strong> {fmt(setupData.company.industry, "Não selecionado")}
                  </p>
                  <p>
                    <strong>Tamanho:</strong> {fmt(setupData.company.size, "Não selecionado")}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {fmt(setupData.company.city, "Não informada")}
                    {setupData.company.state ? ` - ${setupData.company.state}` : ""}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {fmt(setupData.company.address, "Não informado")}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {fmt(setupData.company.phone, "Não informado")}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {fmt(setupData.company.email, "Não informado")}
                  </p>
                  <p>
                    <strong>Fuso horário:</strong>{" "}
                    {setupData.company.timezone === "America/Sao_Paulo"
                      ? "Horário de Brasília"
                      : fmt(setupData.company.timezone, "Não selecionado")}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Projeto */}
            <AccordionItem value="project">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Globe className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Configurações do Projeto</span>
                  <CheckCircle2 className="size-3.5 text-green-600" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-sm">
                  <p>
                    <strong>Nome:</strong> {setupData.project.name || "BCRM"}
                  </p>
                  <p>
                    <strong>URL:</strong> {fmt(setupData.project.url, "Não configurada")}
                  </p>
                  <p>
                    <strong>Domínio personalizado:</strong> {fmt(setupData.project.customDomain, "Não configurado")}
                  </p>
                  <p>
                    <strong>Logo:</strong> {fmt(setupData.project.logo, "Não configurada")}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {fmt(setupData.project.description, "Não informada")}
                  </p>
                  <p>
                    <strong>Idioma:</strong>{" "}
                    {setupData.project.language === "pt-BR"
                      ? "Português (Brasil)"
                      : setupData.project.language || "Não selecionado"}
                  </p>
                  <p>
                    <strong>Tema:</strong>{" "}
                    {setupData.project.theme === "light"
                      ? "Claro"
                      : setupData.project.theme === "dark"
                        ? "Escuro"
                        : "Sistema"}
                  </p>
                  <p>
                    <strong>Modo:</strong> {setupData.project.mode === "production" ? "Produção" : "Desenvolvimento"}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Módulos */}
            <AccordionItem value="modules">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Módulos</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {enabledModules.length} ativados
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <div>
                    <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">
                      ATIVADOS ({enabledModules.length})
                    </p>
                    {enabledModules.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {enabledModules.map((mod) => (
                          <span
                            key={mod}
                            className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400"
                          >
                            {moduleLabels[mod]}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-xs">Nenhum módulo ativado.</p>
                    )}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-muted-foreground text-xs">
                      DESATIVADOS ({disabledModules.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {disabledModules.map((mod) => (
                        <span key={mod} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                          {moduleLabels[mod]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Pagamento */}
            <AccordionItem value="payment-methods">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Banknote className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Formas de Pagamento Aceitas</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {enabledPayments.length} métodos
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-2 rounded-lg border p-3">
                  {enabledPayments.length > 0 ? (
                    enabledPayments.map((pay) => (
                      <div key={pay} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-3.5 text-green-600" />
                        <span>{paymentLabels[pay]}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Nenhum método configurado.</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Usuários e Equipes */}
            <AccordionItem value="users">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Users className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Usuários e Equipes</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {setupData.users.length} usuários, {setupData.teams.length} equipes
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Equipes ({setupData.teams.length})</p>
                    {setupData.teams.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {setupData.teams.map((team, i) => (
                          <span
                            key={`${team.name}-${i}`}
                            className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300"
                          >
                            <span className={`size-2 rounded-full ${team.color || "bg-blue-500"}`} />
                            {team.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-xs">Nenhuma equipe criada.</p>
                    )}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Usuários ({setupData.users.length})</p>
                    {setupData.users.length > 0 ? (
                      <div className="flex flex-col gap-1.5">
                        {setupData.users.map((user, i) => (
                          <div key={`${user.email}-${i}`} className="flex items-center justify-between text-sm">
                            <span>
                              {user.name} ({user.email})
                            </span>
                            <div className="flex items-center gap-1.5">
                              {user.team && (
                                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">
                                  {user.team}
                                </span>
                              )}
                              <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{user.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-xs">Nenhum usuário adicionado.</p>
                    )}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-xs">
                      Funções Personalizadas ({setupData.customRoles.length})
                    </p>
                    {setupData.customRoles.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {setupData.customRoles.map((role, i) => (
                          <span
                            key={`${role.name}-${i}`}
                            className="rounded bg-purple-50 px-2 py-0.5 text-purple-700 text-xs dark:bg-purple-950 dark:text-purple-300"
                          >
                            {role.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-xs">Nenhuma função personalizada criada.</p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Notificações */}
            <AccordionItem value="notifications">
              <AccordionTrigger className="py-3">
                <div className="flex items-center gap-2 text-left">
                  <Smartphone className="size-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Notificações</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {enabledNotifications.length} ativas
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <div>
                    <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">
                      ATIVAS ({enabledNotifications.length})
                    </p>
                    {enabledNotifications.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {enabledNotifications.map((notif) => (
                          <span
                            key={notif}
                            className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400"
                          >
                            {notificationLabels[notif]}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-xs">Nenhuma notificação ativada.</p>
                    )}
                  </div>
                  <div>
                    <p className="mb-1.5 font-medium text-muted-foreground text-xs">
                      INATIVAS ({disabledNotifications.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {disabledNotifications.map((notif) => (
                        <span key={notif} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                          {notificationLabels[notif]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Seleção de Plano */}
          <div className="mt-2">
            {/* Billing Interval Selector */}
            <div className="mb-4 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <CreditCard className="size-4" />
                <span>Forma de pagamento</span>
              </div>
              <ToggleGroup
                type="single"
                value={selectedInterval}
                onValueChange={(value) => {
                  if (value) setSelectedInterval(value as BillingInterval);
                }}
                className="rounded-lg border bg-muted p-1"
              >
                {billingIntervals.map((interval) => (
                  <ToggleGroupItem
                    key={interval.id}
                    value={interval.id}
                    className="relative gap-1.5 px-4 text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm"
                  >
                    {interval.label}
                    {interval.discount > 0 && (
                      <Badge variant="default" className="ml-1 bg-green-600 text-white text-[10px] px-1.5 py-0">
                        -{Math.round(interval.discount * 100)}%
                      </Badge>
                    )}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {monthsLabel && (
                <p className="text-muted-foreground text-xs">
                  Paga de uma vez — {monthsLabel} adiantado, sem mensalidade
                </p>
              )}
            </div>

            <h3 className="mb-3 font-semibold text-base">Selecione seu Plano</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {summaryPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    setSelectedPlan(plan.id);
                  }}
                  className={`flex flex-col rounded-xl border-2 p-4 text-left transition-all ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-muted-foreground/50"
                  } ${plan.popular ? "ring-2 ring-primary/20" : ""}`}
                >
                  {plan.popular && (
                    <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
                      Mais Popular
                    </span>
                  )}
                  <span className="font-semibold text-base">{plan.name}</span>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="font-bold text-xl">
                      R$ {intervalPricePerMonth(plan.price, selectedInterval).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                  {selectedInterval !== "monthly" && (
                    <p className="text-muted-foreground text-xs">
                      Total: R$ {intervalPrice(plan.price, selectedInterval).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} ({monthsLabel} adiantado)
                    </p>
                  )}
                  <p className="mt-1 text-muted-foreground text-xs">{plan.description}</p>

                  {/* Base Features */}
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {plan.baseFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="size-3 shrink-0 text-green-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Extra Features */}
                  {plan.extraFeatures.length > 0 && (
                    <>
                      <p className="mt-2 font-medium text-primary text-xs">Tudo no Plano Pro, mais:</p>
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {plan.extraFeatures.map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-xs">
                            <CheckCircle2 className="size-3 shrink-0 text-green-600" />
                            <span className="font-medium">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Compute Tier Selection */}
            {selectedPlan && (
              <div className="mt-4">
                <h3 className="mb-3 font-semibold text-base">Escolha o Compute</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-8" />
                        <TableHead>Tamanho</TableHead>
                        <TableHead className="text-right">R$/mês</TableHead>
                        <TableHead>CPU</TableHead>
                        <TableHead>Dedicado</TableHead>
                        <TableHead>RAM</TableHead>
                        <TableHead className="text-right">Conex. Diretas</TableHead>
                        <TableHead className="text-right">Conex. Pooler</TableHead>
                        <TableHead className="hidden min-w-[280px] lg:table-cell">Benefícios</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {computeOptions.map((option) => {
                        const isSelected = selectedCompute === option.id;
                        return (
                          <TableRow
                            key={option.id}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                            }`}
                            onClick={() => setSelectedCompute(option.id)}
                          >
                            <TableCell className="w-8 pr-0">
                              <div
                                className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-muted-foreground/30"
                                }`}
                              >
                                {isSelected && <Check className="size-3" />}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{option.size}</TableCell>
                            <TableCell className="text-right font-medium">
                              R$ {option.price.toLocaleString("pt-BR")}
                            </TableCell>
                            <TableCell>{option.cpu}</TableCell>
                            <TableCell>{option.dedicated ? "Sim" : "Não"}</TableCell>
                            <TableCell>{option.ram}</TableCell>
                            <TableCell className="text-right">{option.directConnections}</TableCell>
                            <TableCell className="text-right">{option.poolerConnections.toLocaleString()}</TableCell>
                            <TableCell className="hidden min-w-[280px] lg:table-cell">
                              <ul className="flex flex-col gap-0.5">
                                {option.benefits.map((benefit) => (
                                  <li key={benefit} className="flex items-start gap-1 text-muted-foreground text-xs">
                                    <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {selectedCompute && (
                  <div className="mt-4 lg:hidden">
                    {computeOptions
                      .filter((o) => o.id === selectedCompute)
                      .map((option) => (
                        <div key={option.id} className="rounded-lg border bg-muted/30 p-3">
                          <p className="mb-2 font-medium text-sm">Benefícios — {option.size}</p>
                          <ul className="flex flex-col gap-1">
                            {option.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                                <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                )}

                <div className="mt-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Plano {selectedPlanData?.name} + Compute</span>
                    <span className="font-bold text-lg">
                      R${" "}
                      {(
                        (selectedPlanData?.price ?? 0) +
                        (computeOptions.find((c) => c.id === selectedCompute)?.price ?? 0)
                      ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      <span className="font-normal text-muted-foreground text-sm">/mês</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* PITR Backup Add-on */}
            {selectedPlan && (
              <div className="mt-4">
                <h3 className="mb-3 font-semibold text-base">Backup PITR (Opcional)</h3>
                <p className="mb-3 text-muted-foreground text-sm">
                  Recuperação ponto a ponto — restaure seu banco para qualquer momento nos últimos N dias.
                </p>
                <div className="grid gap-2 sm:grid-cols-4">
                  <button
                    type="button"
                    onClick={() => setSelectedAddOn("none")}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all ${
                      selectedAddOn === "none"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <span className="font-medium text-sm">Sem PITR</span>
                    <span className="text-muted-foreground text-xs">Backups diários (7 dias)</span>
                  </button>
                  {addOns.map((addon) => (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => setSelectedAddOn(addon.id)}
                      className={`flex flex-col rounded-lg border p-3 text-left transition-all ${
                        selectedAddOn === addon.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <span className="font-medium text-sm">{addon.name}</span>
                      <span className="text-muted-foreground text-xs">
                        R$ {addon.priceBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Total Geral */}
            {selectedPlan && (
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Total Mensal</p>
                    <p className="text-muted-foreground text-xs">
                      Plano {selectedPlanData?.name} + Compute
                      {selectedAddOnData ? ` + ${selectedAddOnData.name}` : ""}
                    </p>
                  </div>
                  <span className="font-bold text-2xl">
                    R${" "}
                    {totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    <span className="font-normal text-muted-foreground text-sm">/mês</span>
                  </span>
                </div>
                {selectedInterval !== "monthly" && (
                  <p className="mt-1 text-muted-foreground text-xs">
                    Total {intervalConfig.label}: R$ {intervalPrice(totalMonthly, selectedInterval).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} ({monthsLabel} adiantado)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Botão de Pagamento */}
          {!paymentComplete ? (
            <div className="mt-2">
              <Button onClick={openPaymentDialog} size="lg" className="w-full" disabled={loadingPaymentIntent}>
                <CreditCard className="mr-2 size-4" />
                {isDemo
                  ? `Selecionar Plano ${selectedPlanData?.name} (Demo)`
                  : loadingPaymentIntent
                    ? "Preparando pagamento..."
                    : `Confirmar Plano ${selectedPlanData?.name} (R$ ${totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês)`}
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
              <CheckCircle2 className="size-12 text-green-600" />
              <div className="text-center">
                <p className="font-semibold text-green-800 text-lg dark:text-green-200">
                  {isDemo ? "Plano Selecionado!" : "Pagamento Aprovado!"}
                </p>
                <p className="text-green-700 text-sm dark:text-green-300">
                  Plano {selectedPlanData?.name} {isDemo ? "selecionado" : "ativado com sucesso"}.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(5)}>
              Voltar
            </Button>
            <Button onClick={handleComplete} size="lg" disabled={!paymentComplete}>
              <Check className="mr-2 size-4" />
              {isDemo ? "Ativar Conta Demo" : "Iniciar BCRM"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Desktop: Dialog horizontal */}
      {isDesktop ? (
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="size-5" />
                Pagamento Seguro
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr]">
              {/* Resumo do plano */}
              <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
                <h4 className="font-medium text-sm">Resumo do Pedido</h4>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Plano</span>
                  <span className="font-medium text-sm">{selectedPlanData?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Cobrança</span>
                  <span className="text-sm">Mensal</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="font-medium text-sm">Total</span>
                  <span className="font-bold text-lg">
                    R${" "}
                    {totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    <span className="font-normal text-muted-foreground text-sm">/mês</span>
                  </span>
                </div>
              </div>

              {/* Formulário de pagamento */}
              <div>{paymentDialogContent}</div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        /* Mobile: Sheet tela cheia */
        <Sheet open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <SheetContent side="bottom" className="h-[95vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <CreditCard className="size-5" />
                Pagamento Seguro
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
              {/* Resumo do plano */}
              <div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Plano</span>
                  <span className="font-medium text-sm">{selectedPlanData?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Total</span>
                  <span className="font-bold text-lg">
                    R${" "}
                    {totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    /mês
                  </span>
                </div>
              </div>

              {/* Formulário de pagamento */}
              <div>{paymentDialogContent}</div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
