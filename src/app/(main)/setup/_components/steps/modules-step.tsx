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
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "crm" as const,
    label: "CRM",
    description: "Gerencie o ciclo de vida dos seus clientes com pipeline de vendas e métricas.",
    icon: BarChart3,
    images: [{ src: "/modules/crm-pipeline.jpg", alt: "Pipeline de vendas" }],
  },
  {
    id: "finance" as const,
    label: "Finanças",
    description: "Controle financeiro completo com patrimônio, caixa e despesas.",
    icon: CreditCard,
    images: [{ src: "/modules/finance-overview.jpg", alt: "Painel financeiro" }],
  },
  {
    id: "analytics" as const,
    label: "Análises",
    description: "Dashboards interativos com visitantes, sessões e taxa de conversão.",
    icon: BrainCircuit,
    images: [{ src: "/modules/analytics-overview.jpg", alt: "Dashboard de analytics" }],
  },
  {
    id: "productivity" as const,
    label: "Produtividade",
    description: "Organize tarefas, projetos e atividades da equipe.",
    icon: CheckSquare,
    images: [{ src: "/modules/productivity-overview.jpg", alt: "Painel de produtividade" }],
  },
  {
    id: "ecommerce" as const,
    label: "E-commerce",
    description: "Vendas, pedidos, clientes e ticket médio da loja virtual.",
    icon: ShoppingBag,
    images: [{ src: "/modules/ecommerce-overview.jpg", alt: "Loja virtual" }],
  },
  {
    id: "academy" as const,
    label: "Academia",
    description: "Cursos, treinamentos e acompanhamento de alunos.",
    icon: BookOpen,
    images: [{ src: "/modules/academy-overview.jpg", alt: "Academia" }],
  },
  {
    id: "logistics" as const,
    label: "Logística",
    description: "Rastreamento de envios e gestão logística.",
    icon: Truck,
    images: [{ src: "/modules/logistics-overview.jpg", alt: "Logística" }],
  },
  {
    id: "infrastructure" as const,
    label: "Infraestrutura",
    description: "Monitore servidores, ambientes e uptime.",
    icon: Server,
    images: [{ src: "/modules/infrastructure-overview.jpg", alt: "Infraestrutura" }],
  },
  {
    id: "fileManager" as const,
    label: "Arquivos",
    description: "Organize documentos com pastas e busca inteligente.",
    icon: FileStack,
    images: [{ src: "/modules/file-manager-overview.jpg", alt: "Arquivos" }],
  },
  {
    id: "patientMonitoring" as const,
    label: "Pacientes",
    description: "Monitoramento de sinais vitais em tempo real.",
    icon: HeartPulse,
    images: [{ src: "/modules/patient-monitoring-overview.jpg", alt: "Pacientes" }],
  },
  {
    id: "email" as const,
    label: "E-mail",
    description: "Cliente de e-mail integrado com caixa de entrada.",
    icon: Inbox,
    images: [{ src: "/modules/crm-email.jpg", alt: "E-mail" }],
  },
  {
    id: "chat" as const,
    label: "Chat",
    description: "Chat da equipe com canais integrados.",
    icon: MessageSquare,
    images: [{ src: "/modules/crm-chat.jpg", alt: "Chat" }],
  },
  {
    id: "calendar" as const,
    label: "Calendário",
    description: "Calendário interativo com eventos e compromissos.",
    icon: Calendar,
    images: [{ src: "/modules/productivity-calendar.jpg", alt: "Calendário" }],
  },
  {
    id: "kanban" as const,
    label: "Kanban",
    description: "Quadro Kanban com colunas personalizáveis.",
    icon: FolderKanban,
    images: [{ src: "/modules/productivity-kanban.jpg", alt: "Kanban" }],
  },
  {
    id: "tasks" as const,
    label: "Tarefas",
    description: "Lista de tarefas com status, prioridades e tipos.",
    icon: CheckSquare,
    images: [{ src: "/modules/productivity-tasks.jpg", alt: "Tarefas" }],
  },
  {
    id: "invoice" as const,
    label: "Fatura",
    description: "Criação e gestão de faturas profissionais.",
    icon: CreditCard,
    images: [{ src: "/modules/finance-invoice.jpg", alt: "Fatura" }],
  },
  {
    id: "users" as const,
    label: "Usuários",
    description: "Gestão de usuários com funções e permissões.",
    icon: Users,
    images: [{ src: "/modules/crm-users.jpg", alt: "Usuários" }],
  },
  {
    id: "roles" as const,
    label: "Funções",
    description: "Funções e permissões com níveis de acesso.",
    icon: ShieldCheck,
    images: [{ src: "/modules/crm-roles.jpg", alt: "Funções" }],
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
    <div className="flex flex-1 flex-col">
      {/* Title */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Módulos</h1>
        <p className="text-base text-muted-foreground">
          Escolha os módulos que deseja habilitar.
          {enabledCount > 0 && <span className="ml-1 font-medium text-[#16a34a]"> {enabledCount} selecionado(s)</span>}
        </p>
      </div>

      {/* Modules grid */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {modules.map((module) => {
          const Icon = module.icon;
          const isEnabled = setupData.modules[module.id];
          return (
            <button
              key={module.id}
              type="button"
              onClick={() => toggleModule(module.id)}
              className={cn(
                "group flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all",
                isEnabled
                  ? "border-[#16a34a]/30 bg-[#16a34a]/5"
                  : "border-border/60 bg-background/80 hover:border-border hover:bg-background",
              )}
            >
              <Checkbox checked={isEnabled} onCheckedChange={() => toggleModule(module.id)} />
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                <Icon className={cn("size-4", isEnabled ? "text-[#16a34a]" : "text-muted-foreground")} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">{module.label}</span>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className="mt-6 w-full bg-[#16a34a] text-white hover:bg-[#15803d]"
        onClick={() => setStep(4)}
        disabled={!canProceed}
      >
        Continuar
      </Button>

      <Lightbox
        src={lightbox?.src ?? ""}
        alt={lightbox?.alt ?? ""}
        open={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
