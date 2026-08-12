"use client";

import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  FolderOpen,
  Globe,
  LayoutDashboard,
  LayoutList,
  Mail,
  MessageSquare,
  PieChart,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
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

const cards = [
  {
    title: "Receita Total",
    value: "R$ 12.450",
    change: "+18%",
    icon: CreditCard,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  { title: "Clientes Ativos", value: "1.842", change: "+12%", icon: Users, color: "bg-blue-500/10 text-blue-600" },
  { title: "Projetos", value: "34", change: "+5%", icon: FolderOpen, color: "bg-violet-500/10 text-violet-600" },
  { title: "Tarefas", value: "128", change: "+22%", icon: LayoutList, color: "bg-amber-500/10 text-amber-600" },
];

const notifications = [
  { text: "Novo cliente cadastrado", time: "há 2min" },
  { text: "Pagamento recebido", time: "há 15min" },
  { text: "Reunião agendada", time: "há 1h" },
];

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-2xl backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="flex w-48 flex-col border-r border-border/50 bg-muted/30 p-3">
          {/* Logo */}
          <div className="mb-4 flex items-center gap-2 px-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </div>
            <span className="text-sm font-semibold">BCRM</span>
          </div>

          {/* Nav items */}
          <nav className="flex flex-1 flex-col gap-0.5">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs",
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
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-muted">
                <Bell className="size-3 text-muted-foreground" />
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-[10px] font-semibold">M</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden p-3">
            {/* Metric cards */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              {cards.map((card) => (
                <div key={card.title} className="rounded-xl border border-border/50 bg-background p-2.5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{card.title}</span>
                    <div className={cn("flex size-5 items-center justify-center rounded-md", card.color)}>
                      <card.icon className="size-2.5" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold">{card.value}</span>
                    <span className="text-[9px] font-medium text-emerald-600">{card.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="mb-3 rounded-xl border border-border/50 bg-background p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium">Atividade Recente</span>
                <Globe className="size-3 text-muted-foreground" />
              </div>
              <div className="flex items-end gap-1" style={{ height: 60 }}>
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                  <div
                    key={`bar-${h}-${i}`}
                    className="flex-1 rounded-t-sm bg-primary/20 transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl border border-border/50 bg-background p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium">Atividade</span>
                <CheckCircle2 className="size-3 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                {notifications.map((n) => (
                  <div key={n.text} className="flex items-center justify-between rounded-lg bg-muted/30 px-2 py-1">
                    <span className="text-[10px] text-muted-foreground">{n.text}</span>
                    <span className="text-[9px] text-muted-foreground/60">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
