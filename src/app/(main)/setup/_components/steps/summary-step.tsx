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

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentForm } from "@/components/payment-form";
import { StripeElementsProvider } from "@/components/stripe-provider";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSetup } from "@/contexts/setup-context";
import { useAuth } from "@/lib/supabase/auth-context";

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

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 789,90",
    period: "/mês",
    description: "Para pequenas equipes começando",
    features: ["Até 5 usuários", "3 módulos", "Suporte por e-mail", "1 GB de armazenamento"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 1.889,90",
    period: "/mês",
    description: "Para equipes em crescimento",
    features: [
      "Até 25 usuários",
      "Todos os módulos",
      "Suporte prioritário",
      "10 GB de armazenamento",
      "Relatórios avançados",
    ],
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: "R$ 7.989,90",
    period: "/mês",
    description: "Para organizações grandes",
    features: [
      "Usuários ilimitados",
      "Todos os módulos",
      "Suporte 24/7",
      "Armazenamento ilimitado",
      "API completa",
      "SSO/SAML",
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
  const { user } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");

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

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const openPaymentDialog = async () => {
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
          interval: "monthly",
          userId: user.id,
          email: user.email,
          isBusiness,
          companyName: isBusiness ? companyName : undefined,
          cnpj: isBusiness ? cnpj : undefined,
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

  const handlePaymentSuccess = () => {
    setPaymentDialogOpen(false);
    setPaymentComplete(true);
    setClientSecret(null);
  };

  const handlePaymentCancel = () => {
    setPaymentDialogOpen(false);
    setClientSecret(null);
  };

  const handleComplete = () => completeSetup();

  const fmt = (value: string, fallback = "Não preenchido") => value || fallback;

  const paymentDialogContent = clientSecret ? (
    <StripeElementsProvider clientSecret={clientSecret}>
      <PaymentForm
        planName={selectedPlanData?.name ?? ""}
        planPrice={selectedPlanData?.price ?? ""}
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
            <h3 className="mb-3 font-semibold text-base">Selecione seu Plano</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
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
                    <span className="font-bold text-xl">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs">{plan.description}</p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="size-3 shrink-0 text-green-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle empresa */}
          <div className="rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="is-business"
                checked={isBusiness}
                onCheckedChange={(checked) => setIsBusiness(checked === true)}
              />
              <Label htmlFor="is-business" className="cursor-pointer font-medium text-sm">
                Estou comprando como empresa
              </Label>
            </div>
            {isBusiness && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="company-name" className="text-xs">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="company-name"
                    placeholder="Ex: Moraes Tecnologia LTDA"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cnpj" className="text-xs">
                    CNPJ
                  </Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0001-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    maxLength={18}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Botão de Pagamento */}
          {!paymentComplete ? (
            <div className="mt-2">
              <Button onClick={openPaymentDialog} size="lg" className="w-full" disabled={loadingPaymentIntent}>
                <CreditCard className="mr-2 size-4" />
                {loadingPaymentIntent
                  ? "Preparando pagamento..."
                  : `Confirmar Plano ${selectedPlanData?.name} (${selectedPlanData?.price}${selectedPlanData?.period})`}
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
              <CheckCircle2 className="size-12 text-green-600" />
              <div className="text-center">
                <p className="font-semibold text-green-800 text-lg dark:text-green-200">Pagamento Aprovado!</p>
                <p className="text-green-700 text-sm dark:text-green-300">
                  Plano {selectedPlanData?.name} ativado com sucesso.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(6)}>
              Voltar
            </Button>
            <Button onClick={handleComplete} size="lg" disabled={!paymentComplete}>
              <Check className="mr-2 size-4" />
              Iniciar BCRM
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
                  <span className="font-bold text-lg">{selectedPlanData?.price}<span className="font-normal text-muted-foreground text-sm">/mês</span></span>
                </div>
                {isBusiness && companyName && (
                  <div className="border-t pt-2">
                    <p className="text-muted-foreground text-xs">Empresa</p>
                    <p className="font-medium text-sm">{companyName}</p>
                    {cnpj && <p className="text-muted-foreground text-xs">{cnpj}</p>}
                  </div>
                )}
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
                  <span className="font-bold text-lg">{selectedPlanData?.price}/mês</span>
                </div>
                {isBusiness && companyName && (
                  <div className="border-t pt-2">
                    <p className="text-muted-foreground text-xs">Empresa: {companyName}</p>
                  </div>
                )}
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
