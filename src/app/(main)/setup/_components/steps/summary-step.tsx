"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Banknote,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  Building,
  Calendar,
  Check,
  CheckCircle2,
  CreditCard,
  FileStack,
  FolderKanban,
  Globe,
  HeartPulse,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  Receipt,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSetup } from "@/contexts/setup-context";

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
  stripe: "Stripe",
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
    features: ["Até 25 usuários", "Todos os módulos", "Suporte prioritário", "10 GB de armazenamento", "Relatórios avançados"],
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: "R$ 7.989,90",
    period: "/mês",
    description: "Para organizações grandes",
    features: ["Usuários ilimitados", "Todos os módulos", "Suporte 24/7", "Armazenamento ilimitado", "API completa", "SSO/SAML"],
  },
];

export function SummaryStep() {
  const { setupData, setStep, completeSetup } = useSetup();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const enabledModules = Object.entries(setupData.modules)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const disabledModules = Object.entries(setupData.modules)
    .filter(([_, enabled]) => !enabled)
    .map(([key]) => key);

  const enabledPayments = Object.entries(setupData.payment)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const enabledNotifications = Object.entries(setupData.notifications)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  const disabledNotifications = Object.entries(setupData.notifications)
    .filter(([_, enabled]) => !enabled)
    .map(([key]) => key);

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((f) => setTimeout(f, 2000));
    setProcessing(false);
    setPaymentComplete(true);
  };

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
        <CardDescription>Revise todas as configurações antes de começar.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Accordion type="multiple" className="w-full">
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
              <div className="flex flex-col gap-2 rounded-lg border p-3 text-sm">
                {setupData.company.name && <p><strong>Nome:</strong> {setupData.company.name}</p>}
                {setupData.company.cnpj && <p><strong>CNPJ:</strong> {setupData.company.cnpj}</p>}
                {setupData.company.description && <p><strong>Descrição:</strong> {setupData.company.description}</p>}
                {setupData.company.website && <p><strong>Website:</strong> {setupData.company.website}</p>}
                {setupData.company.industry && <p><strong>Setor:</strong> {setupData.company.industry}</p>}
                {setupData.company.size && <p><strong>Tamanho:</strong> {setupData.company.size}</p>}
                {setupData.company.city && <p><strong>Cidade:</strong> {setupData.company.city}{setupData.company.state && ` - ${setupData.company.state}`}</p>}
                {setupData.company.address && <p><strong>Endereço:</strong> {setupData.company.address}</p>}
                {setupData.company.phone && <p><strong>Telefone:</strong> {setupData.company.phone}</p>}
                {setupData.company.email && <p><strong>E-mail:</strong> {setupData.company.email}</p>}
                {setupData.company.timezone && <p><strong>Fuso horário:</strong> {setupData.company.timezone}</p>}
                {!setupData.company.name && <p className="text-muted-foreground">Nenhuma informação configurada.</p>}
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
              <div className="flex flex-col gap-2 rounded-lg border p-3 text-sm">
                <p><strong>Nome:</strong> {setupData.project.name || "BCRM"}</p>
                {setupData.project.url && <p><strong>URL:</strong> {setupData.project.url}</p>}
                {setupData.project.customDomain && <p><strong>Domínio:</strong> {setupData.project.customDomain}</p>}
                {setupData.project.description && <p><strong>Descrição:</strong> {setupData.project.description}</p>}
                <p><strong>Idioma:</strong> {setupData.project.language === "pt-BR" ? "Português (Brasil)" : setupData.project.language}</p>
                <p><strong>Tema:</strong> {setupData.project.theme === "light" ? "Claro" : setupData.project.theme === "dark" ? "Escuro" : "Sistema"}</p>
                <p><strong>Modo:</strong> {setupData.project.mode === "production" ? "Produção" : "Desenvolvimento"}</p>
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
                {enabledModules.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs text-green-700 dark:text-green-400">ATIVADOS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {enabledModules.map((mod) => (
                        <span key={mod} className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400">
                          {moduleLabels[mod]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {disabledModules.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs text-muted-foreground">DESATIVADOS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {disabledModules.map((mod) => (
                        <span key={mod} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                          {moduleLabels[mod]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pagamento */}
          <AccordionItem value="payment">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <Banknote className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Formas de Pagamento</span>
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
                {setupData.teams.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Equipes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {setupData.teams.map((team, i) => (
                        <span key={`${team.name}-${i}`} className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">
                          <span className={`size-2 rounded-full ${team.color || "bg-blue-500"}`} />
                          {team.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {setupData.users.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Usuários</p>
                    <div className="flex flex-col gap-1.5">
                      {setupData.users.map((user, i) => (
                        <div key={`${user.email}-${i}`} className="flex items-center justify-between text-sm">
                          <span>{user.name} ({user.email})</span>
                          <div className="flex items-center gap-1.5">
                            {user.team && <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">{user.team}</span>}
                            <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{user.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {setupData.customRoles.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs">Funções Personalizadas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {setupData.customRoles.map((role, i) => (
                        <span key={`${role.name}-${i}`} className="rounded bg-purple-50 px-2 py-0.5 text-purple-700 text-xs dark:bg-purple-950 dark:text-purple-300">
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                {enabledNotifications.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs text-green-700 dark:text-green-400">ATIVAS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {enabledNotifications.map((notif) => (
                        <span key={notif} className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400">
                          {notificationLabels[notif]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {disabledNotifications.length > 0 && (
                  <div>
                    <p className="mb-1.5 font-medium text-xs text-muted-foreground">INATIVAS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {disabledNotifications.map((notif) => (
                        <span key={notif} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                          {notificationLabels[notif]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Seleção de Plano + Pagamento Stripe */}
        <div className="mt-4">
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
                  <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 text-primary-foreground text-xs font-medium">
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
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="size-3 shrink-0 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Formulário de Pagamento Stripe */}
        {!paymentComplete ? (
          <div className="mt-4 rounded-xl border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Pagamento Seguro via Stripe</h3>
            </div>
            <div className="flex flex-col gap-4">
              <FieldGroup className="gap-3">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="card-name">
                    Nome no Cartão
                    <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                      Obrigatório
                    </span>
                  </FieldLabel>
                  <Input
                    id="card-name"
                    placeholder="Como está impresso no cartão"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="card-number">
                    Número do Cartão
                    <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                      Obrigatório
                    </span>
                  </FieldLabel>
                  <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").trim();
                      setCardNumber(v.substring(0, 19));
                    }}
                    maxLength={19}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="card-expiry">
                      Validade
                      <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                        Obrigatório
                      </span>
                    </FieldLabel>
                    <Input
                      id="card-expiry"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length >= 2) v = v.substring(0, 2) + "/" + v.substring(2, 4);
                        setCardExpiry(v.substring(0, 5));
                      }}
                      maxLength={5}
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="card-cvc">
                      CVC
                      <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                        Obrigatório
                      </span>
                    </FieldLabel>
                    <Input
                      id="card-cvc"
                      placeholder="000"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                      maxLength={4}
                    />
                  </Field>
                </div>
              </FieldGroup>

              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 text-xs dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <Shield className="size-4 shrink-0" />
                <p>Pagamento processado com segurança pela Stripe. Seus dados de cartão não são armazenados no nosso servidor.</p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={processing || !cardName || !cardNumber || !cardExpiry || !cardCvc}
                size="lg"
                className="w-full"
              >
                {processing ? (
                  <>Processando pagamento...</>
                ) : (
                  <>
                    <Wallet className="mr-2 size-4" />
                    Pagar {plans.find((p) => p.id === selectedPlan)?.price}{plans.find((p) => p.id === selectedPlan)?.period}
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
            <CheckCircle2 className="size-12 text-green-600" />
            <div className="text-center">
              <p className="font-semibold text-green-800 text-lg dark:text-green-200">Pagamento Aprovado!</p>
              <p className="text-green-700 text-sm dark:text-green-300">
                Plano {plans.find((p) => p.id === selectedPlan)?.name} ativado com sucesso.
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
  );
}
