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

const countries = [
  "Brasil", "Estados Unidos", "Canadá", "Reino Unido", "Alemanha", "França", "Espanha",
  "Itália", "Portugal", "Argentina", "México", "Colômbia", "Chile", "Peru", "Uruguai",
  "Paraguai", "Bolívia", "Equador", "Venezuela", "Costa Rica", "Panamá", "República Dominicana",
  "Japão", "China", "Índia", "Austrália", "Nova Zelândia", "Coreia do Sul", "Singapura",
  "África do Sul", "Nigéria", "Quênia", "Emirados Árabes Unidos", "Arábia Saudita", "Israel",
  "Turquia", "Rússia", "Polônia", "Holanda", "Bélgica", "Suíça", "Áustria", "Suécia",
  "Noruega", "Dinamarca", "Finlândia", "Irlanda", "Grécia", "República Tcheca",
];

export function SummaryStep() {
  const { setupData, setStep, completeSetup } = useSetup();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const enabledModules = Object.entries(setupData.modules).filter(([_, v]) => v).map(([k]) => k);
  const disabledModules = Object.entries(setupData.modules).filter(([_, v]) => !v).map(([k]) => k);
  const enabledPayments = Object.entries(setupData.payment).filter(([_, v]) => v).map(([k]) => k);
  const enabledNotifications = Object.entries(setupData.notifications).filter(([_, v]) => v).map(([k]) => k);
  const disabledNotifications = Object.entries(setupData.notifications).filter(([_, v]) => !v).map(([k]) => k);

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((f) => setTimeout(f, 2000));
    setProcessing(false);
    setPaymentComplete(true);
  };

  const handleComplete = () => completeSetup();

  const fmt = (value: string, fallback = "Não preenchido") => value || fallback;
  const _fmtList = (items: string[], fallback = "Nenhum") => items.length > 0 ? items : [fallback];

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
        <Accordion type="multiple" className="w-full" defaultValue={["company", "project", "modules", "payment", "users", "notifications"]}>
          {/* Empresa */}
          <AccordionItem value="company">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <Building2 className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Dados da Empresa</span>
                {setupData.company.name ? <CheckCircle2 className="size-3.5 text-green-600" /> : <X className="size-3.5 text-muted-foreground" />}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-1.5 rounded-lg border p-3 text-sm">
                <p><strong>Nome:</strong> {fmt(setupData.company.name, "Não informado")}</p>
                <p><strong>CNPJ:</strong> {fmt(setupData.company.cnpj, "Não informado")}</p>
                <p><strong>Descrição:</strong> {fmt(setupData.company.description, "Não informada")}</p>
                <p><strong>Website:</strong> {fmt(setupData.company.website, "Não informado")}</p>
                <p><strong>Setor:</strong> {fmt(setupData.company.industry, "Não selecionado")}</p>
                <p><strong>Tamanho:</strong> {fmt(setupData.company.size, "Não selecionado")}</p>
                <p><strong>Cidade:</strong> {fmt(setupData.company.city, "Não informada")}{setupData.company.state ? ` - ${setupData.company.state}` : ""}</p>
                <p><strong>Endereço:</strong> {fmt(setupData.company.address, "Não informado")}</p>
                <p><strong>Telefone:</strong> {fmt(setupData.company.phone, "Não informado")}</p>
                <p><strong>E-mail:</strong> {fmt(setupData.company.email, "Não informado")}</p>
                <p><strong>Fuso horário:</strong> {setupData.company.timezone === "America/Sao_Paulo" ? "Horário de Brasília" : fmt(setupData.company.timezone, "Não selecionado")}</p>
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
                <p><strong>Nome:</strong> {setupData.project.name || "BCRM"}</p>
                <p><strong>URL:</strong> {fmt(setupData.project.url, "Não configurada")}</p>
                <p><strong>Domínio personalizado:</strong> {fmt(setupData.project.customDomain, "Não configurado")}</p>
                <p><strong>Logo:</strong> {fmt(setupData.project.logo, "Não configurada")}</p>
                <p><strong>Descrição:</strong> {fmt(setupData.project.description, "Não informada")}</p>
                <p><strong>Idioma:</strong> {setupData.project.language === "pt-BR" ? "Português (Brasil)" : setupData.project.language || "Não selecionado"}</p>
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
                <Badge variant="secondary" className="ml-1 text-xs">{enabledModules.length} ativados</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3 rounded-lg border p-3">
                <div>
                  <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">ATIVADOS ({enabledModules.length})</p>
                  {enabledModules.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {enabledModules.map((mod) => (
                        <span key={mod} className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400">{moduleLabels[mod]}</span>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground text-xs">Nenhum módulo ativado.</p>}
                </div>
                <div>
                  <p className="mb-1.5 font-medium text-muted-foreground text-xs">DESATIVADOS ({disabledModules.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {disabledModules.map((mod) => (
                      <span key={mod} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">{moduleLabels[mod]}</span>
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
                <Badge variant="secondary" className="ml-1 text-xs">{enabledPayments.length} métodos</Badge>
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
                        <span key={`${team.name}-${i}`} className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">
                          <span className={`size-2 rounded-full ${team.color || "bg-blue-500"}`} />
                          {team.name}
                        </span>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground text-xs">Nenhuma equipe criada.</p>}
                </div>
                <div>
                  <p className="mb-1.5 font-medium text-xs">Usuários ({setupData.users.length})</p>
                  {setupData.users.length > 0 ? (
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
                  ) : <p className="text-muted-foreground text-xs">Nenhum usuário adicionado.</p>}
                </div>
                <div>
                  <p className="mb-1.5 font-medium text-xs">Funções Personalizadas ({setupData.customRoles.length})</p>
                  {setupData.customRoles.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {setupData.customRoles.map((role, i) => (
                        <span key={`${role.name}-${i}`} className="rounded bg-purple-50 px-2 py-0.5 text-purple-700 text-xs dark:bg-purple-950 dark:text-purple-300">{role.name}</span>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground text-xs">Nenhuma função personalizada criada.</p>}
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
                <Badge variant="secondary" className="ml-1 text-xs">{enabledNotifications.length} ativas</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3 rounded-lg border p-3">
                <div>
                  <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">ATIVAS ({enabledNotifications.length})</p>
                  {enabledNotifications.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {enabledNotifications.map((notif) => (
                        <span key={notif} className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400">{notificationLabels[notif]}</span>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground text-xs">Nenhuma notificação ativada.</p>}
                </div>
                <div>
                  <p className="mb-1.5 font-medium text-muted-foreground text-xs">INATIVAS ({disabledNotifications.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {disabledNotifications.map((notif) => (
                      <span key={notif} className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">{notificationLabels[notif]}</span>
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
                  selectedPlan === plan.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-muted-foreground/50"
                } ${plan.popular ? "ring-2 ring-primary/20" : ""}`}
              >
                {plan.popular && <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">Mais Popular</span>}
                <span className="font-semibold text-base">{plan.name}</span>
                <div className="mt-1 flex items-baseline gap-0.5">
                  <span className="font-bold text-xl">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <p className="mt-1 text-muted-foreground text-xs">{plan.description}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="size-3 shrink-0 text-green-600" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Pagamento */}
        {!paymentComplete ? (
          <div className="mt-2 rounded-xl border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Dados de Pagamento</h3>
            </div>

            {/* Método de pagamento */}
            <div className="mb-4 flex flex-col gap-2">
              <p className="font-medium text-sm">Método de Pagamento</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: "card", label: "Crédito/Débito", icon: "💳" },
                  { id: "pix", label: "PIX", icon: "📱" },
                  { id: "boleto", label: "Boleto", icon: "📄" },
                  { id: "transfer", label: "Transferência", icon: "🏦" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-xs transition-all ${
                      paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <span className="text-lg">{m.icon}</span>
                    <span className="font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod === "card" && (
                <p className="text-muted-foreground text-xs">Visa, Mastercard, Elo, Amex, Google Pay, Apple Pay</p>
              )}
            </div>

            {paymentMethod === "card" && (
              <div className="flex flex-col gap-4">
                <FieldGroup className="gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="card-name">
                      Nome Completo
                      <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                    </FieldLabel>
                    <Input id="card-name" placeholder="Nome como impresso no cartão" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="card-number">
                      Número do Cartão
                      <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                    </FieldLabel>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").trim();
                      setCardNumber(v.substring(0, 19));
                    }} maxLength={19} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="card-expiry">
                        Validade
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <Input id="card-expiry" placeholder="MM/AA" value={cardExpiry} onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length >= 2) v = `${v.substring(0, 2)}/${v.substring(2, 4)}`;
                        setCardExpiry(v.substring(0, 5));
                      }} maxLength={5} />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="card-cvc">
                        CVC
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <Input id="card-cvc" placeholder="000" value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").substring(0, 4))} maxLength={4} />
                    </Field>
                  </div>
                </FieldGroup>

                <div className="flex flex-col gap-3 rounded-lg border p-3">
                  <p className="font-medium text-sm">Endereço de Cobrança</p>
                  <FieldGroup className="gap-3">
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="pay-country">
                        País ou Região
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <select id="pay-country" value={country} onChange={(e) => setCountry(e.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="pay-address">
                        Endereço
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                      </FieldLabel>
                      <Input id="pay-address" placeholder="Rua, número, complemento" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor="pay-city">
                          Cidade
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                        </FieldLabel>
                        <Input id="pay-city" placeholder="Sua cidade" value={city} onChange={(e) => setCity(e.target.value)} />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel htmlFor="pay-zip">
                          CEP
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">Obrigatório</span>
                        </FieldLabel>
                        <Input id="pay-zip" placeholder="00000-000" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                      </Field>
                    </div>
                  </FieldGroup>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-800 text-xs dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                  <Shield className="size-4 shrink-0" />
                  <p>Pagamento processado com segurança pela Stripe. Seus dados de cartão não são armazenados no nosso servidor.</p>
                </div>

                <Button onClick={handlePayment} disabled={processing || !cardName || !cardNumber || !cardExpiry || !cardCvc || !address || !city || !zipCode} size="lg" className="w-full">
                  {processing ? <>Processando pagamento...</> : <><Wallet className="mr-2 size-4" />Pagar {plans.find((p) => p.id === selectedPlan)?.price}{plans.find((p) => p.id === selectedPlan)?.period}</>}
                </Button>
              </div>
            )}

            {paymentMethod === "pix" && (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex size-40 items-center justify-center rounded-lg border bg-white p-2">
                  <div className="size-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0id2hpdGUiLz48dGV4dCB4PSI2MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UVIgQ09ERSA8L3RleHQ+PC9zdmc+')] bg-center bg-contain bg-no-repeat" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">PIX - Pagamento Instantâneo</p>
                  <p className="mt-1 text-muted-foreground text-xs">Escaneie o QR Code ou copie o código abaixo</p>
                  <p className="mt-2 max-w-xs break-all rounded bg-muted p-2 font-mono text-xs">00020126580014BR.GOV.BCB.PIX0136bcrm-replace-with-real-key52040000530398654040.015802BR5913BCRM TECNOLOGIA6009SAO PAULO62070503***6304ABCD</p>
                </div>
                <Button onClick={handlePayment} disabled={processing} size="lg" className="w-full">
                  {processing ? <>Verificando pagamento...</> : <>Já realizei o pagamento</>}
                </Button>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="text-center">
                  <p className="font-medium text-sm">Boleto Bancário</p>
                  <p className="mt-1 text-muted-foreground text-xs">O boleto será gerado após a confirmação. Prazo de até 3 dias úteis para compensação.</p>
                </div>
                <Button onClick={handlePayment} disabled={processing} size="lg" className="w-full">
                  {processing ? <>Gerando boleto...</> : <>Gerar Boleto</>}
                </Button>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="flex flex-col gap-4 py-6">
                <div className="text-center">
                  <p className="font-medium text-sm">Transferência Bancária (TED/DOC)</p>
                  <p className="mt-1 text-muted-foreground text-xs">Os dados bancários serão exibidos após a confirmação.</p>
                </div>
                <div className="rounded-lg border p-3 text-sm">
                  <p><strong>Banco:</strong> 001 - Banco do Brasil</p>
                  <p><strong>Agência:</strong> 0000-0</p>
                  <p><strong>Conta:</strong> 00000-0</p>
                  <p><strong>CNPJ:</strong> 00.000.000/0001-00</p>
                  <p><strong>Favorecido:</strong> BCRM Tecnologia Ltda</p>
                </div>
                <Button onClick={handlePayment} disabled={processing} size="lg" className="w-full">
                  {processing ? <>Verificando pagamento...</> : <>Já realizei a transferência</>}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950">
            <CheckCircle2 className="size-12 text-green-600" />
            <div className="text-center">
              <p className="font-semibold text-green-800 text-lg dark:text-green-200">Pagamento Aprovado!</p>
              <p className="text-green-700 text-sm dark:text-green-300">Plano {plans.find((p) => p.id === selectedPlan)?.name} ativado com sucesso.</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(6)}>Voltar</Button>
          <Button onClick={handleComplete} size="lg" disabled={!paymentComplete}>
            <Check className="mr-2 size-4" />
            Iniciar BCRM
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
