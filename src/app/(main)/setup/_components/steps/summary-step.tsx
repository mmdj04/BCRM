"use client";

import { useEffect, useState } from "react";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  Globe,
  LayoutDashboard,
  Shield,
  Smartphone,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSetup } from "@/contexts/setup-context";

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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

function PaymentForm({
  planPrice,
  planPeriod,
  onCancel,
}: {
  planPrice: string;
  planPeriod: string;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/billing?success=true`,
      },
    });

    if (error) {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 text-xs dark:border-green-800 dark:bg-green-950 dark:text-green-200">
        <Shield className="size-4 shrink-0" />
        <p>
          Pagamento processado com segurança pela Stripe. Seus dados de cartão não são armazenados no nosso servidor.
        </p>
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" disabled={!stripe || processing} className="flex-1">
          {processing ? (
            <>Processando...</>
          ) : (
            <>
              <Wallet className="mr-2 size-4" />
              Pagar {planPrice}
              {planPeriod}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function SummaryStep() {
  const { setupData, setStep, completeSetup } = useSetup();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [paymentComplete, _setPaymentComplete] = useState(false);
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

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const openPaymentDialog = async () => {
    setPaymentDialogOpen(true);
    if (!clientSecret) {
      setLoadingPaymentIntent(true);
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: selectedPlan, interval: "monthly" }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      } catch {
        // Silent fail - dialog stays open, user can retry
      } finally {
        setLoadingPaymentIntent(false);
      }
    }
  };

  const handleComplete = () => completeSetup();

  const fmt = (value: string, fallback = "Não preenchido") => value || fallback;

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

      {/* Pagamento - Dialog (Desktop) ou Sheet (Mobile/Tablet) */}
      {isDesktop ? (
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:w-[95vw] sm:max-w-[95vw]">
            <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
              <DialogTitle className="text-xl">Dados de Pagamento</DialogTitle>
              <DialogDescription>
                Preencha os dados do pagamento para ativar o plano {selectedPlanData?.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="flex min-h-0 flex-1 flex-row gap-0 overflow-hidden">
              {/* Lado Esquerdo: Formulário de Pagamento */}
              <div className="min-w-0 flex-1 overflow-y-auto px-6 pb-6">
                {loadingPaymentIntent ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="mb-3 inline-block size-8 animate-spin rounded-full border-4 border-current border-t-transparent text-primary" />
                      <p className="text-muted-foreground text-sm">Preparando formulário de pagamento...</p>
                    </div>
                  </div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                    <PaymentForm
                      planPrice={selectedPlanData?.price ?? ""}
                      planPeriod={selectedPlanData?.period ?? ""}
                      onCancel={() => setPaymentDialogOpen(false)}
                    />
                  </Elements>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Não foi possível carregar o formulário de pagamento.
                    </p>
                    <Button variant="outline" size="sm" onClick={openPaymentDialog}>
                      Tentar novamente
                    </Button>
                  </div>
                )}
              </div>

              {/* Lado Direito: Resumo do Plano */}
              <div className="flex w-[380px] shrink-0 flex-col gap-4 overflow-y-auto border-l bg-muted/30 px-6 py-6">
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">Plano Selecionado</p>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg">{selectedPlanData?.name}</h4>
                    {selectedPlanData?.popular && <Badge className="text-xs">Mais Popular</Badge>}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-bold text-2xl">{selectedPlanData?.price}</span>
                    <span className="text-muted-foreground text-sm">{selectedPlanData?.period}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs">{selectedPlanData?.description}</p>
                </div>

                <Separator />

                <div>
                  <p className="mb-2 text-muted-foreground text-xs">Recursos Inclusos</p>
                  <ul className="flex flex-col gap-2">
                    {selectedPlanData?.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-3.5 shrink-0 text-green-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <p className="mb-2 text-muted-foreground text-xs">Configuração</p>
                  <div className="flex flex-col gap-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Módulos ativos</span>
                      <span className="font-medium">{enabledModules.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usuários</span>
                      <span className="font-medium">{setupData.users.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equipes</span>
                      <span className="font-medium">{setupData.teams.length}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                  <div className="flex items-center gap-2 text-green-800 text-xs dark:text-green-200">
                    <Shield className="size-4 shrink-0" />
                    <p>
                      Pagamento processado com segurança pela Stripe. Seus dados de cartão não são armazenados no nosso
                      servidor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <SheetContent
            side="bottom"
            className="flex h-full w-full max-w-full flex-col overflow-hidden rounded-none border-0 p-0"
          >
            <SheetHeader className="shrink-0 px-6 pt-6 pb-4">
              <SheetTitle className="text-xl">Dados de Pagamento</SheetTitle>
              <SheetDescription>
                Preencha os dados do pagamento para ativar o plano {selectedPlanData?.name}.
              </SheetDescription>
            </SheetHeader>

            <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
              {/* Resumo do Plano (topo no mobile) */}
              <div className="flex shrink-0 flex-col gap-3 bg-muted/30 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base">{selectedPlanData?.name}</h4>
                    {selectedPlanData?.popular && <Badge className="text-xs">Mais Popular</Badge>}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-lg">{selectedPlanData?.price}</span>
                    <span className="text-muted-foreground text-xs">{selectedPlanData?.period}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlanData?.features.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400"
                    >
                      <CheckCircle2 className="size-3 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Formulário de Pagamento (scrollável no mobile) */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {loadingPaymentIntent ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="mb-3 inline-block size-8 animate-spin rounded-full border-4 border-current border-t-transparent text-primary" />
                      <p className="text-muted-foreground text-sm">Preparando formulário de pagamento...</p>
                    </div>
                  </div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                    <PaymentForm
                      planPrice={selectedPlanData?.price ?? ""}
                      planPeriod={selectedPlanData?.period ?? ""}
                      onCancel={() => setPaymentDialogOpen(false)}
                    />
                  </Elements>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Não foi possível carregar o formulário de pagamento.
                    </p>
                    <Button variant="outline" size="sm" onClick={openPaymentDialog}>
                      Tentar novamente
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
