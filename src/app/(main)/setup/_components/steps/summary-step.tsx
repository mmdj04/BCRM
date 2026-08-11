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

import type { BillingInterval } from "@/app/(main)/dashboard/billing/_components/data";
import {
  addOns,
  billingIntervals,
  computeOptions,
  intervalPrice,
  intervalPricePerMonth,
  planPrice,
} from "@/app/(main)/dashboard/billing/_components/data";
import { PaymentForm } from "@/components/payment-form";
import { StripeElementsProvider } from "@/components/stripe-provider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const notificationLabels: Record<string, string> = {
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
    if (isDemo) {
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
    } finally {
      setLoadingPaymentIntent(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentDialogOpen(false);
    setPaymentComplete(true);
    setClientSecret(null);
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
      } catch {}
    }
  };

  const handlePaymentCancel = () => {
    setPaymentDialogOpen(false);
    setClientSecret(null);
  };

  const handleComplete = () => {
    completeSetup();
    if (isDemo) window.location.href = "/activate";
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
      <div className="flex flex-1 flex-col">
        {/* Title */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Configuração Completa</h1>
          <p className="text-base text-muted-foreground">Revise todas as configurações e escolha seu plano.</p>
        </div>

        {/* Review Accordion */}
        <Accordion type="multiple" className="flex flex-col gap-2">
          <AccordionItem value="company" className="rounded-xl border border-border/60 bg-background/80 px-4">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <Building2 className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Empresa</span>
                {setupData.company.name ? (
                  <CheckCircle2 className="size-3.5 text-[#16a34a]" />
                ) : (
                  <X className="size-3.5 text-muted-foreground" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
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

          <AccordionItem value="project" className="rounded-xl border border-border/60 bg-background/80 px-4">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <Globe className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Projeto</span>
                <CheckCircle2 className="size-3.5 text-[#16a34a]" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                <p>
                  <strong>Nome:</strong> {setupData.project.name || "BCRM"}
                </p>
                <p>
                  <strong>URL:</strong> {fmt(setupData.project.url, "Não configurada")}
                </p>
                <p>
                  <strong>Idioma:</strong>{" "}
                  {setupData.project.language === "pt-BR"
                    ? "Português (Brasil)"
                    : fmt(setupData.project.language, "Não selecionado")}
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

          <AccordionItem value="modules" className="rounded-xl border border-border/60 bg-background/80 px-4">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <LayoutDashboard className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Módulos</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {enabledModules.length} ativados
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                <div>
                  <p className="mb-1.5 font-medium text-[#16a34a] text-xs">ATIVADOS ({enabledModules.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {enabledModules.map((mod) => (
                      <span key={mod} className="rounded-md bg-[#16a34a]/10 px-2 py-0.5 text-[#16a34a] text-xs">
                        {moduleLabels[mod]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 font-medium text-muted-foreground text-xs">
                    DESATIVADOS ({disabledModules.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {disabledModules.map((mod) => (
                      <span key={mod} className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                        {moduleLabels[mod]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payment" className="rounded-xl border border-border/60 bg-background/80 px-4">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <Banknote className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Pagamento</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {enabledPayments.length} métodos
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-2 rounded-lg border border-border/60 bg-muted/20 p-3">
                {enabledPayments.length > 0 ? (
                  enabledPayments.map((pay) => (
                    <div key={pay} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-3.5 text-[#16a34a]" />
                      <span>{paymentLabels[pay]}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Nenhum método configurado.</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="users" className="rounded-xl border border-border/60 bg-background/80 px-4">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <Users className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Usuários</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {setupData.users.length} usuários
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
                {setupData.users.length > 0 ? (
                  setupData.users.map((u, i) => (
                    <div key={`${u.email}-${i}`} className="flex items-center justify-between py-1">
                      <span>
                        {u.name} ({u.email})
                      </span>
                      <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs">{u.role}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Nenhum usuário adicionado.</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notifications" className="rounded-xl border border-border/60 bg-background/80 px-4">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <Smartphone className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Notificações</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {enabledNotifications.length} ativas
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-wrap gap-1.5">
                {enabledNotifications.map((n) => (
                  <span key={n} className="rounded-md bg-[#16a34a]/10 px-2 py-0.5 text-[#16a34a] text-xs">
                    {notificationLabels[n]}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Plan Selection */}
        <div className="mt-6">
          <div className="mb-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CreditCard className="size-4" />
              <span>Forma de pagamento</span>
            </div>
            <ToggleGroup
              type="single"
              value={selectedInterval}
              onValueChange={(v) => {
                if (v) setSelectedInterval(v as BillingInterval);
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
                    <Badge variant="default" className="ml-1 bg-[#16a34a] text-white text-[10px] px-1.5 py-0">
                      -{Math.round(interval.discount * 100)}%
                    </Badge>
                  )}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {monthsLabel && <p className="text-muted-foreground text-xs">Paga de uma vez — {monthsLabel} adiantado</p>}
          </div>

          <h3 className="mb-3 font-semibold text-base">Selecione seu Plano</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {summaryPlans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex flex-col rounded-xl border-2 p-4 text-left transition-all ${selectedPlan === plan.id ? "border-[#16a34a] bg-[#16a34a]/5 shadow-sm" : "border-border/60 hover:border-border"} ${plan.popular ? "ring-2 ring-[#16a34a]/20" : ""}`}
              >
                {plan.popular && (
                  <span className="mb-2 w-fit rounded-md bg-[#16a34a] px-2 py-0.5 font-medium text-white text-xs">
                    Mais Popular
                  </span>
                )}
                <span className="font-semibold text-base">{plan.name}</span>
                <div className="mt-1 flex items-baseline gap-0.5">
                  <span className="font-bold text-xl">
                    R${" "}
                    {intervalPricePerMonth(plan.price, selectedInterval).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-muted-foreground text-sm">/mês</span>
                </div>
                {selectedInterval !== "monthly" && (
                  <p className="text-muted-foreground text-xs">
                    Total: R${" "}
                    {intervalPrice(plan.price, selectedInterval).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
                    ({monthsLabel} adiantado)
                  </p>
                )}
                <p className="mt-1 text-muted-foreground text-xs">{plan.description}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {plan.baseFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="size-3 shrink-0 text-[#16a34a]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.extraFeatures.length > 0 && (
                  <>
                    <p className="mt-2 font-medium text-[#16a34a] text-xs">Tudo no Pro, mais:</p>
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {plan.extraFeatures.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs">
                          <CheckCircle2 className="size-3 shrink-0 text-[#16a34a]" />
                          <span className="font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Compute */}
          {selectedPlan && (
            <div className="mt-4">
              <h3 className="mb-3 font-semibold text-base">Compute</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8" />
                      <TableHead>Tamanho</TableHead>
                      <TableHead className="text-right">R$/mês</TableHead>
                      <TableHead>CPU</TableHead>
                      <TableHead>RAM</TableHead>
                      <TableHead className="text-right">Conexões</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {computeOptions.map((option) => {
                      const isSelected = selectedCompute === option.id;
                      return (
                        <TableRow
                          key={option.id}
                          className={`cursor-pointer transition-colors ${isSelected ? "bg-[#16a34a]/5 hover:bg-[#16a34a]/10" : "hover:bg-muted/50"}`}
                          onClick={() => setSelectedCompute(option.id)}
                        >
                          <TableCell className="w-8 pr-0">
                            <div
                              className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? "border-[#16a34a] bg-[#16a34a] text-white" : "border-muted-foreground/30"}`}
                            >
                              {isSelected && <Check className="size-3" />}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{option.size}</TableCell>
                          <TableCell className="text-right font-medium">
                            R$ {option.price.toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell>{option.cpu}</TableCell>
                          <TableCell>{option.ram}</TableCell>
                          <TableCell className="text-right">{option.directConnections}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
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

          {/* PITR */}
          {selectedPlan && (
            <div className="mt-4">
              <h3 className="mb-3 font-semibold text-base">Backup PITR (Opcional)</h3>
              <div className="grid gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setSelectedAddOn("none")}
                  className={`flex flex-col rounded-lg border p-3 text-left transition-all ${selectedAddOn === "none" ? "border-[#16a34a] bg-[#16a34a]/5" : "border-border/60 hover:border-border"}`}
                >
                  <span className="font-medium text-sm">Sem PITR</span>
                  <span className="text-muted-foreground text-xs">Backups diários (7 dias)</span>
                </button>
                {addOns.map((addon) => (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => setSelectedAddOn(addon.id)}
                    className={`flex flex-col rounded-lg border p-3 text-left transition-all ${selectedAddOn === addon.id ? "border-[#16a34a] bg-[#16a34a]/5" : "border-border/60 hover:border-border"}`}
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

          {/* Total */}
          {selectedPlan && (
            <div className="mt-4 rounded-xl border border-[#16a34a]/20 bg-[#16a34a]/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Total Mensal</p>
                  <p className="text-muted-foreground text-xs">
                    Plano {selectedPlanData?.name} + Compute{selectedAddOnData ? ` + ${selectedAddOnData.name}` : ""}
                  </p>
                </div>
                <span className="font-bold text-2xl">
                  R$ {totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  <span className="font-normal text-muted-foreground text-sm">/mês</span>
                </span>
              </div>
              {selectedInterval !== "monthly" && (
                <p className="mt-1 text-muted-foreground text-xs">
                  Total {intervalConfig.label}: R${" "}
                  {intervalPrice(totalMonthly, selectedInterval).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
                  ({monthsLabel} adiantado)
                </p>
              )}
            </div>
          )}
        </div>

        {/* Payment Button */}
        {!paymentComplete ? (
          <Button
            onClick={openPaymentDialog}
            size="lg"
            className="mt-6 w-full bg-[#16a34a] text-white hover:bg-[#15803d]"
            disabled={loadingPaymentIntent}
          >
            <CreditCard className="mr-2 size-4" />
            {isDemo
              ? `Selecionar Plano ${selectedPlanData?.name} (Demo)`
              : loadingPaymentIntent
                ? "Preparando pagamento..."
                : `Confirmar Plano ${selectedPlanData?.name} (R$ ${totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês)`}
          </Button>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-[#16a34a]/20 bg-[#16a34a]/5 p-6">
            <CheckCircle2 className="size-12 text-[#16a34a]" />
            <div className="text-center">
              <p className="font-semibold text-lg text-[#16a34a]">
                {isDemo ? "Plano Selecionado!" : "Pagamento Aprovado!"}
              </p>
              <p className="text-sm text-muted-foreground">
                Plano {selectedPlanData?.name} {isDemo ? "selecionado" : "ativado com sucesso"}.
              </p>
            </div>
          </div>
        )}

        <Button
          size="lg"
          className="mt-4 w-full bg-[#16a34a] text-white hover:bg-[#15803d]"
          onClick={handleComplete}
          disabled={!paymentComplete}
        >
          <Check className="mr-2 size-4" /> {isDemo ? "Ativar Conta Demo" : "Iniciar BCRM"}
        </Button>
      </div>

      {/* Payment Dialog */}
      {isDesktop ? (
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="size-5" /> Pagamento Seguro
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
                <h4 className="font-medium text-sm">Resumo do Pedido</h4>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Plano</span>
                  <span className="font-medium text-sm">{selectedPlanData?.name}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="font-medium text-sm">Total</span>
                  <span className="font-bold text-lg">
                    R$ {totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    <span className="font-normal text-muted-foreground text-sm">/mês</span>
                  </span>
                </div>
              </div>
              <div>{paymentDialogContent}</div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <SheetContent side="bottom" className="h-[95vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <CreditCard className="size-5" /> Pagamento Seguro
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
              <div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Plano</span>
                  <span className="font-medium text-sm">{selectedPlanData?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Total</span>
                  <span className="font-bold text-lg">
                    R$ {totalMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                  </span>
                </div>
              </div>
              <div>{paymentDialogContent}</div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
