"use client";

import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building,
  CheckSquare,
  CreditCard,
  FileStack,
  HeartPulse,
  LayoutDashboard,
  Server,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "crm" as const,
    label: "CRM",
    shortDescription: "Gestão de relacionamento com clientes",
    description:
      "Gerencie todo o ciclo de vida dos seus clientes em um só lugar. Acompanhe leads do primeiro contato até o fechamento do negócio, visualize seu pipeline de vendas com métricas em tempo real, gerencie e-mails, chats e interações da equipe. Inclui controle de funis, automação de follow-up e relatórios de performance comercial.",
    icon: BarChart3,
    images: [
      { src: "/modules/crm-pipeline.jpg", alt: "Pipeline de vendas com métricas de leads e oportunidades" },
      { src: "/modules/crm-email.jpg", alt: "Caixa de entrada de e-mails integrados" },
      { src: "/modules/crm-chat.jpg", alt: "Chat da equipe com canais integrados" },
      { src: "/modules/crm-users.jpg", alt: "Gestão de usuários e permissões" },
    ],
  },
  {
    id: "finance" as const,
    label: "Finanças",
    shortDescription: "Controle financeiro completo",
    description:
      "Tenha visão total das suas finanças com dashboards de receita, despesas e fluxo de caixa. Crie e gerencie faturas, acompanhe pagamentos pendentes, projete receitas futuras e gere relatórios financeiros detalhados. Integração com Stripe para cobranças automáticas e reconciliation bancária.",
    icon: CreditCard,
    images: [
      { src: "/modules/finance-overview.jpg", alt: "Painel financeiro com patrimônio líquido e despesas" },
      { src: "/modules/finance-invoice.jpg", alt: "Criação de faturas com itens e valores" },
    ],
  },
  {
    id: "analytics" as const,
    label: "Análises",
    shortDescription: "Dashboards e relatórios",
    description:
      "Transforme dados em decisões com dashboards interativos e relatórios personalizáveis. Acompanhe visitantes únicos, sessões, taxa de engajamento, conversões e qualidade de tráfego. Gráficos dinâmicos com filtros por período, segmento e fonte de tráfego para análise profunda.",
    icon: BrainCircuit,
    images: [
      { src: "/modules/analytics-overview.jpg", alt: "Dashboard de analytics com visitantes, sessões e taxa de conversão" },
    ],
  },
  {
    id: "productivity" as const,
    label: "Produtividade",
    shortDescription: "Tarefas e projetos",
    description:
      "Organize seu trabalho com quadros Kanban, listas de tarefas, calendário integrado e timer de foco. Crie projetos, atribua responsáveis, defina prazos e acompanhe o progresso em tempo real. Inclui notas rápidas, templates de tarefas e integração com o fluxo de trabalho da equipe.",
    icon: CheckSquare,
    images: [
      { src: "/modules/productivity-overview.jpg", alt: "Painel de produtividade com tarefas e projetos" },
      { src: "/modules/productivity-kanban.jpg", alt: "Quadro Kanban com colunas de status" },
      { src: "/modules/productivity-calendar.jpg", alt: "Calendário com eventos e compromissos" },
      { src: "/modules/productivity-tasks.jpg", alt: "Lista de tarefas com prioridades e status" },
    ],
  },
  {
    id: "ecommerce" as const,
    label: "Comércio Eletrônico",
    shortDescription: "Loja virtual e pedidos",
    description:
      "Gerencie sua loja virtual com painel completo de vendas, pedidos e estoque. Acompanhe receita total, pedidos processados, crescimento de clientes e ticket médio. Controle de devoluções, precisão de estoque e métricas de performance da loja em tempo real.",
    icon: ShoppingBag,
    images: [
      { src: "/modules/ecommerce-overview.jpg", alt: "Visão geral da loja com vendas, pedidos e crescimento" },
    ],
  },
  {
    id: "academy" as const,
    label: "Academia",
    shortDescription: "Cursos e treinamentos",
    description:
      "Plataforma completa para gerenciar cursos, treinamentos e alunos. Acompanhe taxa de presença, atividades pendentes, cronograma de aulas e desempenho dos alunos. Crie materiais didáticos, acompanhe progresso e gere relatórios de aproveitamento.",
    icon: BookOpen,
    images: [
      { src: "/modules/academy-overview.jpg", alt: "Painel da academia com alunos, presença e atividades" },
    ],
  },
  {
    id: "logistics" as const,
    label: "Logística",
    shortDescription: "Entregas e rastreamento",
    description:
      "Controle toda a operação logística com rastreamento de entregas em tempo real. Visualize rotas no mapa, acompanhe status de envios, gerencie transportadoras e otimize entregas. Inclui gestão de fretes, estoque e histórico de movimentações.",
    icon: Truck,
    images: [
      { src: "/modules/logistics-overview.jpg", alt: "Rastreamento de envios com mapa e detalhes de entrega" },
    ],
  },
  {
    id: "infrastructure" as const,
    label: "Infraestrutura",
    shortDescription: "Servidores e deploy",
    description:
      "Monitore e gerencie toda a infraestrutura de TI em um painel centralizado. Acompanhe status de servidores, uptime, ambientes de deploy, projetos ativos e saúde do sistema. Alertas automáticos, métricas de performance e gestão de recursos em tempo real.",
    icon: Server,
    images: [
      { src: "/modules/infrastructure-overview.jpg", alt: "Visão geral da infraestrutura com servidores e uptime" },
    ],
  },
  {
    id: "fileManager" as const,
    label: "Gerenciador de Arquivos",
    shortDescription: "Gerenciamento de documentos",
    description:
      "Organize e gerencie todos os seus arquivos e documentos em um local seguro. Crie pastas, faça upload de arquivos, compartilhe com a equipe e controle versões. Busca inteligente, preview de documentos e controle de permissões por pasta e arquivo.",
    icon: FileStack,
    images: [
      { src: "/modules/file-manager-overview.jpg", alt: "Gerenciador de arquivos com pastas e documentos" },
    ],
  },
  {
    id: "patientMonitoring" as const,
    label: "Monitoramento de Pacientes",
    shortDescription: "Acompanhamento de pacientes",
    description:
      "Sistema completo de monitoramento de pacientes com sinais vitais em tempo real. Acompanhe ECG, SpO2, frequência cardíaca e alertas automáticos. Painel centralizado com visão de múltiplos pacientes, histórico de medições e notificações de emergência.",
    icon: HeartPulse,
    images: [
      { src: "/modules/patient-monitoring-overview.jpg", alt: "Monitoramento central de pacientes com sinais vitais" },
    ],
  },
];

export function ModulesStep() {
  const { setupData, updateSetupData, setStep } = useSetup();

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
          Escolha os módulos que deseja habilitar. Cada módulo inclui funcionalidades completas para
          sua área de atuação. Você pode alterar isso depois.
          {enabledCount > 0 && (
            <span className="ml-1 font-medium text-primary">{enabledCount} módulo(s) selecionado(s)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
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
                <div className="flex items-start gap-4 p-4 pb-3">
                  <Checkbox
                    checked={isEnabled}
                    className="mt-1"
                    onCheckedChange={() => toggleModule(module.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="size-5 text-primary" />
                      <span className="font-semibold text-base">{module.label}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="overflow-hidden rounded-lg border bg-muted/30">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={module.images[0].src}
                        alt={module.images[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {module.images.length > 1 && (
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {module.images.slice(1, 4).map((img, i) => (
                        <div key={i} className="overflow-hidden rounded-lg border bg-muted/30">
                          <div className="relative aspect-video w-full">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="(max-width: 768px) 33vw, 250px"
                              className="object-cover object-top"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
    </Card>
  );
}
