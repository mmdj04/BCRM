"use client";

import { Building2, CheckCircle, CreditCard, Globe, LayoutDashboard, Mail, Users } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetup } from "@/contexts/setup-context";

const steps = [
  {
    icon: Building2,
    title: "Dados da Empresa",
    tag: "Obrigatório",
    tagColor: "text-red-600 bg-red-50",
    description: "Informações básicas da sua empresa ou organização.",
    details: [
      "Nome da empresa é obrigatório para identificação no sistema",
      "CNPJ é opcional, mas necessário para emissão de notas fiscais",
      "Website, logo e setor/indústria personalizam a experiência",
      "Cidade e Estado ajudam a personalizar configurações regionais",
      "Telefone e e-mail corporativo são usados para contato e notificações",
      "Fuso horário afeta relatórios e agendamentos",
      "Todos os dados podem ser alterados depois em Configurações da Conta",
    ],
  },
  {
    icon: Globe,
    title: "Configurações do Projeto",
    tag: "Obrigatório",
    tagColor: "text-red-600 bg-red-50",
    description: "Defina as informações do seu projeto BCRM.",
    details: [
      "Nome do projeto aparece no título do navegador e no menu lateral",
      "URL do projeto é usada para links internos e compartilhamento",
      "Domínio personalizado permite acesso via seu próprio domínio",
      "Logo personaliza a aparência do painel com a identidade visual da sua marca",
      "Idioma, tema e modo podem ser ajustados conforme a preferência da equipe",
      "Todos os dados podem ser alterados depois em Configurações da Conta",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Seleção de Módulos",
    tag: "Obrigatório",
    tagColor: "text-red-600 bg-red-50",
    description: "Escolha os módulos que deseja habilitar no seu painel.",
    details: [
      "Cada módulo adiciona funcionalidades específicas ao painel",
      "Você pode ativar ou desativar módulos a qualquer momento",
      "Módulos desativados não aparecem no menu lateral",
      "Comece com os módulos essenciais e expanda conforme a necessidade",
    ],
  },
  {
    icon: CreditCard,
    title: "Formas de Pagamento",
    tag: "Opcional",
    tagColor: "text-amber-600 bg-amber-50",
    description: "Configure os métodos de pagamento que sua empresa aceita.",
    details: [
      "Stripe para cartões internacionais (recomendado para vendas online)",
      "PIX para pagamentos instantâneos brasileiros (recomendado)",
      "Boleto bancário para pagamentos com vencimento",
      "Cartão de Crédito brasileiro para gateways nacionais",
      "Transferência Bancária para TED ou PIX manual",
    ],
  },
  {
    icon: Users,
    title: "Gestão de Usuários",
    tag: "Opcional",
    tagColor: "text-amber-600 bg-amber-50",
    description: "Convide membros da equipe, crie equipes e migre dados.",
    details: [
      "Adicione usuários com nome, e-mail, função e equipe",
      "Cada função determina o nível de acesso e permissões",
      "Crie equipes personalizadas para organizar os membros",
      "Importe dados de outros sistemas (CSV, Google, Azure AD, Okta)",
      "Faça merge ou preservação de dados durante a migração",
      "Envie convites personalizados com mensagem customizada",
    ],
  },
  {
    icon: Mail,
    title: "Configurações de Notificação",
    tag: "Opcional",
    tagColor: "text-amber-600 bg-amber-50",
    description: "Escolha como deseja receber alertas e atualizações do sistema.",
    details: [
      "Notificações por e-mail para alertas importantes e resumos",
      "Notificações por WhatsApp para alertas urgentes em tempo real",
      "Notificações Push no navegador para atualizações instantâneas",
      "Relatório semanal com resumo de atividades da equipe",
    ],
  },
];

export function WelcomeStep() {
  const { setStep } = useSetup();

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="size-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Bem-vindo ao BCRM!</CardTitle>
        <CardDescription className="text-base">
          Vamos configurar seu painel de administração em poucos passos.
          <br />
          Isso levará cerca de 3 minutos.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Accordion type="multiple" className="w-full">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AccordionItem key={index} value={`step-${index}`}>
                <AccordionTrigger className="py-3">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{step.title}</span>
                        <span className={`rounded px-1.5 py-0.5 font-medium text-xs ${step.tagColor}`}>{step.tag}</span>
                      </div>
                      <p className="mt-0.5 text-muted-foreground text-xs">{step.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3 pl-11">
                  <ul className="flex flex-col gap-1.5 text-muted-foreground text-xs">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-muted-foreground text-xs">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-500" />
              <span>Obrigatório</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" />
              <span>Opcional</span>
            </div>
          </div>
          <Button size="lg" onClick={() => setStep(1)}>
            Começar Configuração
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
