"use client";

import { useState } from "react";

import {
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  Shield,
  Smartphone,
  Users,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSetup } from "@/contexts/setup-context";
import { useAuth } from "@/lib/auth/auth-context";

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
    price: 930,
    period: "/mês",
    description: "Para equipes em crescimento que precisam de uma solução completa e local-first",
    features: [
      "Até 20 usuários ativos",
      "Todos os módulos inclusos (CRM, Finanças, Analytics, etc.)",
      "Projetos ilimitados",
      "Banco de dados SQLite local (sem custo de servidor)",
      "Sync automático com nuvem via Supabase",
      "Modo offline completo — funcional sem internet",
      "Armazenamento local ilimitado no dispositivo",
      "Exportação de dados (CSV, PDF, Excel)",
      "Integração com WhatsApp e E-mail",
      "Relatórios avançados e dashboards customizáveis",
      "Suporte prioritário por e-mail",
      "Atualizações gratuitas por 12 meses",
      "Backup automático diário na nuvem",
      "Controle de acesso por função (RBAC)",
      "API de integração completa (REST + Webhooks)",
      "Temas personalizáveis (claro/escuro/sistema)",
      "100% open-source — sem lock-in de fornecedor",
      " Código-fonte disponível no GitHub",
      "Comunidade ativa de desenvolvedores",
      "Documentação completa e exemplos",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 3970,
    period: "/mês",
    description: "Para organizações que precisam de compliance, escala máxima e suporte dedicado",
    features: [
      "Tudo do plano Pro, sem limite de usuários",
      "Banco de dados dedicado (PostgreSQL na nuvem)",
      "Sync bidirecional SQLite ↔ PostgreSQL em tempo real",
      "Compliance: SOC2 + ISO 27001 + LGPD completo",
      "Auditoria completa de ações (audit logs por 90 dias)",
      "SSO/SAML 2.0 para login corporativo",
      "MFA avançado com hardware tokens (YubiKey)",
      "SLA de uptime 99.9% garantido por contrato",
      "Suporte dedicado 24/7 com gerente de conta",
      "Onboarding e treinamento da equipe incluso",
      "Customização de módulos sob demanda",
      "Integração com ERP/SAP/Oracle",
      "Multi-tenant (várias organizações na mesma instância)",
      "Recuperação de desastres (DR) regional",
      "Relatórios de conformidade automáticos",
      "100% open-source — auditoria de segurança permitida",
      "Deploy on-premise ou em qualquer cloud",
      "Migração assistida de sistemas legados",
      "Consultoria mensal de arquitetura (4h/mês)",
      "Acesso antecipado a features beta",
    ],
  },
];

export function SummaryStep() {
  const { setupData, completeSetup } = useSetup();
  const { isDemo } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

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

  const selectedPlanData = summaryPlans.find((p) => p.id === selectedPlan);

  const handleComplete = () => {
    localStorage.setItem(
      "bcrm_demo_plan",
      JSON.stringify({
        plan: selectedPlan,
        plan_interval: "monthly",
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }),
    );
    completeSetup();
    if (isDemo) window.location.href = "/activate";
  };

  const fmt = (value: string, fallback = "Não preenchido") => value || fallback;

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Configuração Completa</h1>
        <p className="text-base text-muted-foreground">Revise suas configurações e escolha o plano ideal.</p>
      </div>

      {/* Review Accordion */}
      <Accordion type="multiple" className="flex flex-col gap-2">
        <AccordionItem value="company" className="rounded-xl border border-border/60 bg-background/80 px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Empresa</span>
              {setupData.company.name ? (
                <CheckCircle2 className="size-3.5 text-green-600" />
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
                <strong>Setor:</strong> {fmt(setupData.company.industry, "Não selecionado")}
              </p>
              <p>
                <strong>Cidade:</strong> {fmt(setupData.company.city, "Não informada")}
                {setupData.company.state ? ` - ${setupData.company.state}` : ""}
              </p>
              <p>
                <strong>Telefone:</strong> {fmt(setupData.company.phone, "Não informado")}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="project" className="rounded-xl border border-border/60 bg-background/80 px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <Globe className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Projeto</span>
              <CheckCircle2 className="size-3.5 text-green-600" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm">
              <p>
                <strong>Nome:</strong> {setupData.project.name || "BCRM"}
              </p>
              <p>
                <strong>Idioma:</strong>{" "}
                {setupData.project.language === "pt-BR"
                  ? "Português (Brasil)"
                  : fmt(setupData.project.language, "Não selecionado")}
              </p>
              <p>
                <strong>Tema:</strong>{" "}
                {setupData.project.theme === "light" && "Claro"}
                {setupData.project.theme === "dark" && "Escuro"}
                {setupData.project.theme === "system" && "Sistema"}
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
                <p className="mb-1.5 font-medium text-green-700 text-xs dark:text-green-400">
                  ATIVADOS ({enabledModules.length})
                </p>
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
              </div>
              {disabledModules.length > 0 && (
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
              )}
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
                    <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{u.role}</span>
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
                <span
                  key={n}
                  className="rounded bg-green-50 px-2 py-0.5 text-green-700 text-xs dark:bg-green-950 dark:text-green-400"
                >
                  {notificationLabels[n]}
                </span>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Plan Selection */}
      <div className="mt-6">
        <h3 className="mb-3 font-semibold text-base">Escolha seu Plano</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {summaryPlans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan.id)}
              className={`flex flex-col rounded-xl border-2 p-5 text-left transition-all ${
                selectedPlan === plan.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/60 hover:border-border"
              } ${plan.popular ? "ring-2 ring-primary/20" : ""}`}
            >
              {plan.popular && (
                <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
                  Mais Popular
                </span>
              )}
              <span className="font-semibold text-lg">{plan.name}</span>
              <div className="mt-1 flex items-baseline gap-0.5">
                <span className="font-bold text-2xl">R$ {plan.price.toLocaleString("pt-BR")}</span>
                <span className="text-muted-foreground text-sm">/mês</span>
              </div>
              <p className="mt-1 text-muted-foreground text-xs">{plan.description}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-green-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      {/* Free & Open Source Info */}
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-sm">100% Gratuito & Open Source</p>
            <p className="text-muted-foreground text-xs">
              O BCRM é um projeto open-source. Você não paga nada para usar, independently do plano escolhido. Todo o
              código-fonte está disponível no GitHub para auditoria e contribuição.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button size="lg" className="mt-6 w-full" onClick={handleComplete}>
        <Check className="mr-2 size-4" />
        {isDemo ? "Ativar Conta Demo" : "Iniciar BCRM"} — Plano {selectedPlanData?.name}
      </Button>
    </div>
  );
}
