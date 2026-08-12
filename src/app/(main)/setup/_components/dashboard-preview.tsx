"use client";

import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  Command,
  DollarSign,
  Download,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Mail,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  ShoppingCart,
  UserPlus,
  Users,
  Waves,
} from "lucide-react";

import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Principal", active: true },
  { icon: PieChart, label: "Finanças" },
  { icon: Users, label: "CRM" },
  { icon: BarChart3, label: "Análises" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Calendar, label: "Calendário" },
  { icon: Mail, label: "E-mail" },
  { icon: MessageSquare, label: "Chat" },
  { icon: FileText, label: "Tarefas" },
  { icon: FolderOpen, label: "Arquivos" },
  { icon: Settings, label: "Configurações" },
];

const metricCards = [
  {
    title: "Receita Total",
    value: "R$ 1.250,00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "Visitantes nos últimos 6 meses",
  },
  {
    title: "Novos Clientes",
    value: "1,234",
    change: "-20%",
    trend: "down",
    icon: UserPlus,
    description: "Aquisição precisa de atenção",
  },
  {
    title: "Contas Ativas",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "Engajamento supera metas",
  },
  {
    title: "Taxa de Crescimento",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    icon: Waves,
    description: "Atende projeções de crescimento",
  },
];

const chartBars = [40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100, 45, 70, 55, 85, 60, 95, 75, 100];

const tableRows = [
  { name: "João Silva", plan: "Pro", status: "Ativo", date: "12/08/2026" },
  { name: "Maria Santos", plan: "Enterprise", status: "Ativo", date: "11/08/2026" },
  { name: "Pedro Costa", plan: "Pro", status: "Pendente", date: "10/08/2026" },
  { name: "Ana Oliveira", plan: "Free", status: "Ativo", date: "09/08/2026" },
];

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl",
        className,
      )}
    >
      <div className="flex h-[520px]">
        {/* Sidebar */}
        <div className="flex w-44 flex-col border-border/50 border-r bg-muted/30 p-2.5">
          {/* Logo */}
          <div className="mb-4 flex items-center gap-2 px-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Command className="size-3.5" />
            </div>
            <span className="font-semibold text-sm">BCRM</span>
          </div>

          {/* Nav items */}
          <nav className="flex flex-1 flex-col gap-0.5">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                  item.active ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted/50",
                )}
              >
                <item.icon className="size-3.5" />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-border/50 border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="font-medium text-xs">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-muted">
                <Search className="size-3 text-muted-foreground" />
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-muted">
                <Bell className="size-3 text-muted-foreground" />
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-semibold text-[10px]">M</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden p-3">
            {/* Metric cards */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              {metricCards.map((card) => (
                <div key={card.title} className="rounded-xl border border-border/50 bg-background p-2.5">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex size-5 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                      <card.icon className="size-2.5" />
                    </div>
                  </div>
                  <p className="mb-0.5 text-[9px] text-muted-foreground">{card.title}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm">{card.value}</span>
                    <span
                      className={cn(
                        "font-medium text-[8px]",
                        card.trend === "up" ? "text-emerald-600" : "text-red-600",
                      )}
                    >
                      {card.change}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[8px] text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mb-3 rounded-xl border border-border/50 bg-background p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[10px]">Atividade dos Clientes</p>
                  <p className="text-[8px] text-muted-foreground">Últimos 3 meses</p>
                </div>
                <div className="flex gap-1.5">
                  <div className="rounded-md border bg-background px-1.5 py-0.5 text-[8px]">3 meses</div>
                  <div className="rounded-md border bg-background px-1.5 py-0.5 text-[8px]">Todos</div>
                </div>
              </div>
              <div className="flex items-end gap-px" style={{ height: 50 }}>
                {chartBars.map((h, i) => (
                  <div key={`bar-${i}`} className="flex-1 rounded-t-sm bg-primary/20" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-1.5 flex items-center justify-end gap-3">
                <div className="flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-primary/60" />
                  <span className="text-[7px] text-muted-foreground">Novos</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-chart-2" />
                  <span className="text-[7px] text-muted-foreground">Ativos</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-chart-3" />
                  <span className="text-[7px] text-muted-foreground">Recorrentes</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border/50 bg-background p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[10px]">18,426 Clientes</p>
                  <p className="text-[8px] text-muted-foreground">Registros recentes</p>
                </div>
                <div className="flex size-4 items-center justify-center rounded-md border">
                  <Download className="size-2 text-muted-foreground" />
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-2 py-1 text-left font-medium text-[7px] text-muted-foreground">Nome</th>
                      <th className="px-2 py-1 text-left font-medium text-[7px] text-muted-foreground">Plano</th>
                      <th className="px-2 py-1 text-left font-medium text-[7px] text-muted-foreground">Status</th>
                      <th className="px-2 py-1 text-left font-medium text-[7px] text-muted-foreground">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.name} className="border-b last:border-0">
                        <td className="px-2 py-1 font-medium text-[8px]">{row.name}</td>
                        <td className="px-2 py-1 text-[8px] text-muted-foreground">{row.plan}</td>
                        <td className="px-2 py-1">
                          <span
                            className={cn(
                              "rounded-full px-1.5 py-0.5 font-medium text-[7px]",
                              row.status === "Ativo"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-amber-500/10 text-amber-600",
                            )}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-2 py-1 text-[8px] text-muted-foreground">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
