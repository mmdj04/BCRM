"use client";

import { useState } from "react";

import Image from "next/image";

import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckSquare,
  CreditCard,
  FileStack,
  FolderKanban,
  HeartPulse,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Server,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";

import { Lightbox } from "@/components/lightbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "crm" as const,
    label: "CRM",
    description:
      "Gerencie todo o ciclo de vida dos seus clientes. Pipeline de vendas com métricas em tempo real, leads qualificados, oportunidades abertas e taxas de conversão. Acompanhe o valor do pipeline e o fluxo de leads qualificados ao longo do tempo.",
    icon: BarChart3,
    images: [{ src: "/modules/crm-pipeline.jpg", alt: "Pipeline de vendas com métricas de leads e oportunidades" }],
  },
  {
    id: "finance" as const,
    label: "Finanças",
    description:
      "Controle financeiro completo com patrimônio líquido, caixa disponível, gastos mensais e taxa de poupança. Dashboards de receita e despesas com visão consolidada da saúde financeira do negócio.",
    icon: CreditCard,
    images: [{ src: "/modules/finance-overview.jpg", alt: "Painel financeiro com patrimônio líquido e despesas" }],
  },
  {
    id: "analytics" as const,
    label: "Análises",
    description:
      "Dashboards interativos com visitantes únicos, sessões, pageviews, taxa de engajamento e conversão. Gráficos de qualidade de tráfego e análise de performance por período para decisões baseadas em dados.",
    icon: BrainCircuit,
    images: [
      {
        src: "/modules/analytics-overview.jpg",
        alt: "Dashboard de analytics com visitantes, sessões e taxa de conversão",
      },
    ],
  },
  {
    id: "productivity" as const,
    label: "Produtividade",
    description:
      "Organize seu trabalho com visão geral de tarefas, projetos e atividades. Acompanhe o progresso da equipe, prioridades do dia e métricas de produtividade em tempo real.",
    icon: CheckSquare,
    images: [{ src: "/modules/productivity-overview.jpg", alt: "Painel de produtividade com tarefas e projetos" }],
  },
  {
    id: "ecommerce" as const,
    label: "Comércio Eletrônico",
    description:
      "Visão geral da loja virtual com vendas totais, pedidos processados, crescimento de clientes e ticket médio. Controle de devoluções, precisão de estoque e métricas de performance da loja.",
    icon: ShoppingBag,
    images: [{ src: "/modules/ecommerce-overview.jpg", alt: "Visão geral da loja com vendas, pedidos e crescimento" }],
  },
  {
    id: "academy" as const,
    label: "Academia",
    description:
      "Plataforma de cursos e treinamentos com painel de alunos atendidos, taxa de presença média, atividades pendentes e cronograma de aulas. Acompanhe o desempenho e progresso dos alunos.",
    icon: BookOpen,
    images: [{ src: "/modules/academy-overview.jpg", alt: "Painel da academia com alunos, presença e atividades" }],
  },
  {
    id: "logistics" as const,
    label: "Logística",
    description:
      "Rastreamento de envios em tempo real com mapa interativo, detalhes de entrega, informações de carga e visualização de rotas. Gestão completa da operação logística.",
    icon: Truck,
    images: [{ src: "/modules/logistics-overview.jpg", alt: "Rastreamento de envios com mapa e detalhes de entrega" }],
  },
  {
    id: "infrastructure" as const,
    label: "Infraestrutura",
    description:
      "Monitore servidores, ambientes de deploy e projetos de TI. Acompanhe uptime, saúde dos servidores, número de ambientes e status geral da infraestrutura com alertas automáticos.",
    icon: Server,
    images: [
      { src: "/modules/infrastructure-overview.jpg", alt: "Visão geral da infraestrutura com servidores e uptime" },
    ],
  },
  {
    id: "fileManager" as const,
    label: "Gerenciador de Arquivos",
    description:
      "Organize documentos em pastas hierárquicas com busca inteligente, upload de arquivos e gerenciamento de versões. Controle de permissões e compartilhamento seguro com a equipe.",
    icon: FileStack,
    images: [{ src: "/modules/file-manager-overview.jpg", alt: "Gerenciador de arquivos com pastas e documentos" }],
  },
  {
    id: "patientMonitoring" as const,
    label: "Monitoramento de Pacientes",
    description:
      "Sistema central de monitoramento com sinais vitais em tempo real: ECG, SpO2, frequência cardíaca e alertas automáticos. Visão de múltiplos pacientes com histórico de medições e notificações de emergência.",
    icon: HeartPulse,
    images: [
      { src: "/modules/patient-monitoring-overview.jpg", alt: "Monitoramento central de pacientes com sinais vitais" },
    ],
  },
  {
    id: "email" as const,
    label: "E-mail",
    description:
      "Cliente de e-mail integrado com caixa de entrada organizada, mensagens fixadas, preview de e-mails com anexos e gestão de conversas. Interface limpa para produtividade no dia a dia.",
    icon: Inbox,
    images: [{ src: "/modules/crm-email.jpg", alt: "Caixa de entrada de e-mails integrados" }],
  },
  {
    id: "chat" as const,
    label: "Chat",
    description:
      "Chat da equipe com canais integrados (E-mail, Chat, WhatsApp, Instagram). Conversas organizadas, mensagens em tempo real e interface de comunicação unificada para a equipe.",
    icon: MessageSquare,
    images: [{ src: "/modules/crm-chat.jpg", alt: "Chat da equipe com canais integrados" }],
  },
  {
    id: "calendar" as const,
    label: "Calendário",
    description:
      "Calendário interativo com eventos, standups, review de design, check-ins de cliente e planejamento. Visão mensal com organização visual de compromissos e tarefas recorrentes.",
    icon: Calendar,
    images: [{ src: "/modules/productivity-calendar.jpg", alt: "Calendário com eventos e compromissos" }],
  },
  {
    id: "kanban" as const,
    label: "Kanban",
    description:
      "Quadro Kanban com colunas personalizáveis: Ideias, Planejado, Em construção, QA. Arraste cartões entre colunas para acompanhar o fluxo de trabalho dos projetos da equipe.",
    icon: FolderKanban,
    images: [{ src: "/modules/productivity-kanban.jpg", alt: "Quadro Kanban com colunas de status" }],
  },
  {
    id: "tasks" as const,
    label: "Tarefas",
    description:
      "Lista de tarefas com IDs, status (Em Andamento, Backlog, Concluído), prioridades e tipos (Bug, Funcionalidade). Gerencie o backlog da equipe com filtros e organização por categorias.",
    icon: CheckSquare,
    images: [{ src: "/modules/productivity-tasks.jpg", alt: "Lista de tarefas com prioridades e status" }],
  },
  {
    id: "invoice" as const,
    label: "Fatura",
    description:
      "Criação e gestão de faturas com seleção de cliente, itens com descrição e valores. Faturamento profissional com cálculos automáticos e acompanhamento de pagamentos.",
    icon: CreditCard,
    images: [{ src: "/modules/finance-invoice.jpg", alt: "Criação de faturas com itens e valores" }],
  },
  {
    id: "users" as const,
    label: "Usuários",
    description:
      "Gestão de usuários com tabela completa mostrando funções, times, workspace e status (Ativo, Bloqueado, Convite pendente). Controle de acesso e permissões por perfil.",
    icon: Users,
    images: [{ src: "/modules/crm-users.jpg", alt: "Gestão de usuários com funções e status" }],
  },
  {
    id: "roles" as const,
    label: "Funções",
    description:
      "Gestão de funções e permissões com níveis de acesso (Proprietário, Administrador, Gerente). Conjuntos de permissões granulares para controle seguro do acesso a cada funcionalidade do sistema.",
    icon: ShieldCheck,
    images: [{ src: "/modules/crm-roles.jpg", alt: "Funções e permissões com níveis de acesso" }],
  },
];

export function ModulesStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const toggleModule = (moduleId: keyof typeof setupData.modules) => {
    updateSetupData({
      modules: {
        ...setupData.modules,
        [moduleId]: !setupData.modules[moduleId],
      },
    });
  };

  const enabledCount = Object.values(setupData.modules).filter(Boolean).length;
  const canProceed = enabledCount > 0;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutDashboard className="size-5" />
          Seleção de Módulos
        </CardTitle>
        <CardDescription>
          Escolha os módulos que deseja habilitar. Cada módulo inclui funcionalidades completas para sua área de
          atuação. Clique nas imagens para visualizar em tela cheia.
          {enabledCount > 0 && (
            <span className="ml-1 font-medium text-primary"> {enabledCount} módulo(s) selecionado(s)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {modules.map((module) => {
            const Icon = module.icon;
            const isEnabled = setupData.modules[module.id];
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "group flex flex-col rounded-xl border-2 text-left transition-all",
                  isEnabled
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-muted-foreground/50 hover:shadow-sm",
                )}
              >
                <div className="flex items-start gap-3 p-4 pb-2">
                  <Checkbox checked={isEnabled} className="mt-1" onCheckedChange={() => toggleModule(module.id)} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="size-5 text-primary" />
                      <span className="font-semibold text-base">{module.label}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{module.description}</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${Math.min(module.images.length, 3)}, 1fr)` }}
                  >
                    {module.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        className="cursor-pointer overflow-hidden rounded-lg border bg-muted/30"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox(img);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            setLightbox(img);
                          }
                        }}
                      >
                        <div className="relative aspect-video w-full">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(4)} disabled={!canProceed}>
            Próximo
          </Button>
        </div>
      </CardContent>

      <Lightbox
        src={lightbox?.src ?? ""}
        alt={lightbox?.alt ?? ""}
        open={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </Card>
  );
}
