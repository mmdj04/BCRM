import type { ChartConfig } from "@/components/ui/chart";

export const leadsChartData = [
  { date: "1-5", newLeads: 120, disqualified: 40 },
  { date: "6-10", newLeads: 95, disqualified: 30 },
  { date: "11-15", newLeads: 60, disqualified: 22 },
  { date: "16-20", newLeads: 100, disqualified: 35 },
  { date: "21-25", newLeads: 150, disqualified: 70 },
  { date: "26-30", newLeads: 110, disqualified: 60 },
];

export const leadsChartConfig = {
  newLeads: {
    label: "Novos Leads",
    color: "var(--chart-1)",
  },
  disqualified: {
    label: "Desqualificado",
    color: "var(--chart-3)",
  },
  background: {
    color: "var(--primary)",
  },
} as ChartConfig;

export const proposalsChartData = [
  { date: "1-5", proposalsSent: 9 },
  { date: "6-10", proposalsSent: 16 },
  { date: "11-15", proposalsSent: 6 },
  { date: "16-20", proposalsSent: 18 },
  { date: "21-25", proposalsSent: 11 },
  { date: "26-30", proposalsSent: 14 },
];

export const proposalsChartConfig = {
  proposalsSent: {
    label: "Propostas Enviadas",
    color: "var(--chart-1)",
  },
} as ChartConfig;

export const revenueChartData = [
  { month: "Jul 2024", revenue: 6700 },
  { month: "Aug 2024", revenue: 7100 },
  { month: "Sep 2024", revenue: 6850 },
  { month: "Oct 2024", revenue: 7500 },
  { month: "Nov 2024", revenue: 8000 },
  { month: "Dec 2024", revenue: 8300 },
  { month: "Jan 2025", revenue: 7900 },
  { month: "Feb 2025", revenue: 8400 },
  { month: "Mar 2025", revenue: 8950 },
  { month: "Apr 2025", revenue: 9700 },
  { month: "May 2025", revenue: 11200 },
  { month: "Jun 2025", revenue: 9500 },
];

export const revenueChartConfig = {
  revenue: {
    label: "Receita",
    color: "var(--chart-1)",
  },
} as ChartConfig;

export const leadsBySourceChartData = [
  { source: "website", leads: 170, fill: "var(--color-website)" },
  { source: "referral", leads: 105, fill: "var(--color-referral)" },
  { source: "social", leads: 90, fill: "var(--color-social)" },
  { source: "cold", leads: 62, fill: "var(--color-cold)" },
  { source: "other", leads: 48, fill: "var(--color-other)" },
];

export const leadsBySourceChartConfig = {
  leads: {
    label: "Leads",
  },
  website: {
    label: "Site",
    color: "var(--chart-1)",
  },
  referral: {
    label: "Indicação",
    color: "var(--chart-2)",
  },
  social: {
    label: "Redes Sociais",
    color: "var(--chart-3)",
  },
  cold: {
    label: "Prospecção Fria",
    color: "var(--chart-4)",
  },
  other: {
    label: "Outros",
    color: "var(--chart-5)",
  },
} as ChartConfig;

export const projectRevenueChartData = [
  { name: "MVP Development", actual: 82000, target: 90000 },
  { name: "Consultation", actual: 48000, target: 65000 },
  { name: "Framer Sites", actual: 34000, target: 45000 },
  { name: "DevOps Support", actual: 77000, target: 90000 },
  { name: "LLM Training", actual: 68000, target: 80000 },
  { name: "Product Launch", actual: 52000, target: 70000 },
].map((row) => ({
  ...row,
  remaining: Math.max(0, row.target - row.actual),
}));

export const projectRevenueChartConfig = {
  actual: {
    label: "Real",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Restante",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--primary-foreground)",
  },
} as ChartConfig;

export const salesPipelineChartData = [
  { stage: "Leads", value: 680, fill: "var(--chart-1)" },
  { stage: "Qualificado", value: 480, fill: "var(--chart-2)" },
  { stage: "Proposta Enviada", value: 210, fill: "var(--chart-3)" },
  { stage: "Negociação", value: 120, fill: "var(--chart-4)" },
  { stage: "Ganho", value: 45, fill: "var(--chart-5)" },
];

export const salesPipelineChartConfig = {
  value: {
    label: "Leads",
    color: "var(--chart-1)",
  },
  stage: {
    label: "Estágio",
  },
} as ChartConfig;

export const regionSalesData = [
  {
    region: "América do Norte",
    sales: 37800,
    percentage: 31,
    growth: "-3.2%",
    isPositive: false,
  },
  {
    region: "Europa",
    sales: 40100,
    percentage: 34,
    growth: "+9.4%",
    isPositive: true,
  },
  {
    region: "Ásia-Pacífico",
    sales: 30950,
    percentage: 26,
    growth: "+12.8%",
    isPositive: true,
  },
  {
    region: "América Latina",
    sales: 12200,
    percentage: 7,
    growth: "-1.7%",
    isPositive: false,
  },
  {
    region: "Oriente Médio e África",
    sales: 2450,
    percentage: 2,
    growth: "+6.0%",
    isPositive: true,
  },
];

export const actionItems = [
  {
    id: 1,
    title: "Enviar documentos de kickoff",
    desc: "Enviar documentos de integração e cronograma",
    due: "Vence hoje",
    priority: "High",
    priorityColor: "bg-red-100 text-red-700",
    checked: false,
  },
  {
    id: 2,
    title: "Chamada de demo para SaaS MVP",
    desc: "Agendar chamada Zoom com o cliente",
    due: "Vence amanhã",
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-700",
    checked: true,
  },
  {
    id: 3,
    title: "Atualizar estudo de caso",
    desc: "Adicionar projeto de LLM mais recente",
    due: "Vence esta semana",
    priority: "Low",
    priorityColor: "bg-green-100 text-green-700",
    checked: false,
  },
];

export const recentLeadsData = [
  {
    id: "L-1012",
    name: "Guillermo Rauch",
    company: "Vercel",
    status: "Qualificado",
    source: "Site",
    lastActivity: "há 30 minutos",
  },
  {
    id: "L-1018",
    name: "Nizzy",
    company: "Mail0",
    status: "Qualificado",
    source: "Site",
    lastActivity: "há 35 minutos",
  },
  {
    id: "L-1005",
    name: "Sahaj",
    company: "Tweakcn",
    status: "Negociação",
    source: "Site",
    lastActivity: "há 1 hora",
  },
  {
    id: "L-1001",
    name: "Shadcn",
    company: "Shadcn/ui",
    status: "Qualificado",
    source: "Site",
    lastActivity: "há 2 horas",
  },
  {
    id: "L-1003",
    name: "Sam Altman",
    company: "OpenAI",
    status: "Proposta Enviada",
    source: "Redes Sociais",
    lastActivity: "há 4 horas",
  },
  {
    id: "L-1008",
    name: "Michael Andreuzza",
    company: "Lexington Themes",
    status: "Contatado",
    source: "Redes Sociais",
    lastActivity: "há 5 horas",
  },
  {
    id: "L-1016",
    name: "Skyleen",
    company: "Animate UI",
    status: "Proposta Enviada",
    source: "Indicação",
    lastActivity: "há 7 horas",
  },
  {
    id: "L-1007",
    name: "Matheus Moraes",
    company: "Weblabs Studio",
    status: "Ganho",
    source: "Site",
    lastActivity: "há 6 horas",
  },
  {
    id: "L-1011",
    name: "Sebastian Rindom",
    company: "Medusa",
    status: "Proposta Enviada",
    source: "Indicação",
    lastActivity: "há 10 horas",
  },
  {
    id: "L-1014",
    name: "Fred K. Schott",
    company: "Astro",
    status: "Contatado",
    source: "Redes Sociais",
    lastActivity: "há 12 horas",
  },
  {
    id: "L-1010",
    name: "Peer Richelsen",
    company: "Cal.com",
    status: "Novo",
    source: "Outros",
    lastActivity: "há 8 horas",
  },
  {
    id: "L-1002",
    name: "Ammar Khnz",
    company: "BE",
    status: "Contatado",
    source: "Indicação",
    lastActivity: "há 1 dia",
  },
  {
    id: "L-1015",
    name: "Toby",
    company: "Shadcn UI Kit ",
    status: "Negociação",
    source: "Outros",
    lastActivity: "há 2 dias",
  },
  {
    id: "L-1006",
    name: "David Haz",
    company: "React Bits",
    status: "Qualificado",
    source: "Indicação",
    lastActivity: "há 2 dias",
  },
  {
    id: "L-1004",
    name: "Erşad",
    company: "Align UI",
    status: "Novo",
    source: "Prospecção Fria",
    lastActivity: "há 3 dias",
  },
];
