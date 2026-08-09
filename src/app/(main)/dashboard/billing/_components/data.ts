export type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  badge?: string;
  highlighted?: boolean;
  cta: string;
  baseFeatures: string[];
  extraFeatures: string[];
  featureHeader?: string;
  supabasePlan: string;
  allowedCompute: string[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Inicial",
    description: "Para pequenas equipes começando",
    monthlyPrice: 899.9,
    cta: "Começar Agora",
    supabasePlan: "Pro",
    allowedCompute: ["micro", "small", "medium", "large"],
    baseFeatures: [
      "Até 10 usuários",
      "5 módulos",
      "100 GB de armazenamento",
      "1 projeto ativo",
      "Banco Postgres dedicado",
      "Auth com 100K MAU",
      "Backups automáticos (7 dias)",
      "Suporte por e-mail",
      "Relatórios básicos",
    ],
    extraFeatures: [],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para equipes em crescimento",
    monthlyPrice: 2299.9,
    badge: "Popular",
    highlighted: true,
    cta: "Fazer Upgrade",
    supabasePlan: "Pro",
    allowedCompute: ["micro", "small", "medium", "large", "xlarge"],
    baseFeatures: [],
    featureHeader: "Tudo no Plano Inicial, mais:",
    extraFeatures: [
      "Até 50 usuários",
      "Todos os módulos",
      "3 projetos ativos",
      "SAML/SSO (50 usuários)",
      "Suporte prioritário",
      "Relatórios avançados",
      "API de integração",
      "Faturamento e Finanças",
    ],
  },
  {
    id: "team",
    name: "Equipe",
    description: "Para organizações grandes",
    monthlyPrice: 8999.9,
    cta: "Fazer Upgrade",
    supabasePlan: "Team",
    allowedCompute: ["micro", "small", "medium", "large", "xlarge", "2xlarge", "4xlarge", "8xlarge"],
    baseFeatures: [],
    featureHeader: "Tudo no Plano Pro, mais:",
    extraFeatures: [
      "Usuários ilimitados",
      "5 projetos ativos",
      "Backups automáticos (14 dias)",
      "SOC2 + ISO 27001",
      "SSO Dashboard + Audit Logs",
      "Suporte prioritário com SLA",
    ],
  },
];

export function getAllPlanFeatures(planId: string): string[] {
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return [];
  if (plan.id === "starter") {
    return [...plan.baseFeatures];
  }
  const prevPlan =
    plan.id === "pro"
      ? plans.find((p) => p.id === "starter")
      : plan.id === "team"
        ? plans.find((p) => p.id === "pro")
        : undefined;
  return [...(prevPlan ? getAllPlanFeatures(prevPlan.id) : []), ...plan.extraFeatures];
}

export type FeatureCategory = {
  category: string;
  features: {
    name: string;
    starter: string;
    pro: string;
    team: string;
  }[];
};

export const featureComparison: FeatureCategory[] = [
  {
    category: "Banco de Dados",
    features: [
      { name: "Banco Postgres Dedicado", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Requisições API ilimitadas", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Disco por projeto", starter: "8 GB", pro: "8 GB", team: "8 GB" },
      { name: "Egress mensal", starter: "250 GB", pro: "250 GB", team: "250 GB" },
      { name: "Backups automáticos", starter: "7 dias", pro: "7 dias", team: "14 dias" },
      { name: "Recuperação ponto a ponto", starter: "-", pro: "Adicional", team: "Adicional" },
      { name: "Branching", starter: "-", pro: "Adicional", team: "Adicional" },
      { name: "Pipelines", starter: "-", pro: "Adicional", team: "Adicional" },
    ],
  },
  {
    category: "Compute",
    features: [
      { name: "CPU", starter: "2 núcleos ARM", pro: "2 núcleos ARM", team: "2 núcleos ARM" },
      { name: "RAM", starter: "2 GB", pro: "4 GB", team: "8 GB (dedicado)" },
      { name: "Conexões diretas", starter: "90", pro: "120", team: "160" },
      { name: "Pooler connections", starter: "400", pro: "600", team: "800" },
      { name: "Compute dedicado", starter: "-", pro: "-", team: "Incluso" },
      { name: "Créditos compute", starter: "R$ 50/mês", pro: "R$ 50/mês", team: "R$ 50/mês" },
    ],
  },
  {
    category: "Autenticação",
    features: [
      { name: "Usuários ativos mensais (MAU)", starter: "100.000", pro: "100.000", team: "100.000" },
      { name: "Propriedade dos dados do usuário", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Login anônimo", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Provedores OAuth sociais", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "SMTP personalizado", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "MFA básico", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "MFA avançado (Telefone)", starter: "-", pro: "Adicional", team: "Adicional" },
      { name: "Single Sign-On (SAML 2.0)", starter: "-", pro: "50 incluídos", team: "50 incluídos" },
      { name: "Proteção contra senhas vazadas", starter: "-", pro: "Incluso", team: "Incluso" },
      { name: "Sessão única por usuário", starter: "-", pro: "Incluso", team: "Incluso" },
      { name: "Timeouts de sessão", starter: "-", pro: "Incluso", team: "Incluso" },
      { name: "Logs de auditoria de auth", starter: "7 dias", pro: "7 dias", team: "28 dias" },
      { name: "Auth Hooks", starter: "JWT + Email/SMS", pro: "JWT + Email/SMS", team: "Todos" },
    ],
  },
  {
    category: "Armazenamento",
    features: [
      { name: "Armazenamento de arquivos", starter: "100 GB", pro: "100 GB", team: "100 GB" },
      { name: "Egress em cache", starter: "250 GB", pro: "250 GB", team: "250 GB" },
      { name: "Controles de acesso personalizados", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Tamanho máximo de upload", starter: "500 GB", pro: "500 GB", team: "500 GB" },
      { name: "CDN", starter: "Smart CDN", pro: "Smart CDN", team: "Smart CDN" },
      { name: "Transformações de imagem", starter: "100 grátis", pro: "100 grátis", team: "100 grátis" },
    ],
  },
  {
    category: "Funções Edge",
    features: [{ name: "Invocações mensais", starter: "2 Milhões", pro: "2 Milhões", team: "2 Milhões" }],
  },
  {
    category: "Tempo Real",
    features: [
      { name: "Mudanças no Postgres", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Conexões simultâneas no pico", starter: "500", pro: "500", team: "500" },
      { name: "Mensagens por mês", starter: "5 Milhões", pro: "5 Milhões", team: "5 Milhões" },
      { name: "Tamanho máximo da mensagem", starter: "3 MB", pro: "3 MB", team: "3 MB" },
    ],
  },
  {
    category: "Plataforma e Segurança",
    features: [
      { name: "Retenção de logs (API e Banco)", starter: "7 dias", pro: "7 dias", team: "28 dias" },
      { name: "Endpoint de métricas", starter: "-", pro: "Incluso", team: "Incluso" },
      { name: "Logs de auditoria da plataforma", starter: "-", pro: "-", team: "Incluso" },
      { name: "SOC2", starter: "-", pro: "-", team: "Incluso" },
      { name: "ISO 27001", starter: "-", pro: "-", team: "Incluso" },
      { name: "HIPAA", starter: "-", pro: "-", team: "Adicional" },
      { name: "AWS PrivateLink", starter: "-", pro: "-", team: "Incluso" },
      { name: "SSO para Dashboard", starter: "-", pro: "-", team: "Incluso" },
      { name: "SLAs de uptime", starter: "-", pro: "-", team: "Incluso" },
      {
        name: "Funções de acesso",
        starter: "Proprietário, Admin, Dev",
        pro: "Proprietário, Admin, Dev",
        team: "Proprietário, Admin, Dev, Somente Leitura",
      },
    ],
  },
  {
    category: "Suporte",
    features: [
      { name: "Suporte por e-mail", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "SLA de suporte", starter: "-", pro: "-", team: "Incluso" },
      { name: "Suporte designado", starter: "-", pro: "-", team: "Fale Conosco" },
    ],
  },
];

export type BillingHistoryEntry = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
};

export const billingHistory: BillingHistoryEntry[] = [
  { id: "inv_001", date: "Ago 1, 2026", description: "Plano Pro - Mensal", amount: 2299.9, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Plano Pro - Mensal", amount: 2299.9, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Plano Inicial - Mensal", amount: 899.9, status: "paid" },
  { id: "inv_004", date: "Mai 1, 2026", description: "Plano Inicial - Mensal", amount: 899.9, status: "paid" },
];

export type ComputeOption = {
  id: string;
  size: string;
  supabaseCost: number;
  markupPercent: number;
  price: number;
  cpu: string;
  dedicated: boolean;
  ram: string;
  directConnections: number;
  poolerConnections: number;
};

export const computeOptions: ComputeOption[] = [
  {
    id: "micro",
    size: "Micro",
    supabaseCost: 50,
    markupPercent: 90,
    price: 95,
    cpu: "2 núcleos ARM",
    dedicated: false,
    ram: "1 GB",
    directConnections: 60,
    poolerConnections: 200,
  },
  {
    id: "small",
    size: "Pequeno",
    supabaseCost: 75,
    markupPercent: 80,
    price: 135,
    cpu: "2 núcleos ARM",
    dedicated: false,
    ram: "2 GB",
    directConnections: 90,
    poolerConnections: 400,
  },
  {
    id: "medium",
    size: "Médio",
    supabaseCost: 300,
    markupPercent: 65,
    price: 495,
    cpu: "2 núcleos ARM",
    dedicated: false,
    ram: "4 GB",
    directConnections: 120,
    poolerConnections: 600,
  },
  {
    id: "large",
    size: "Grande",
    supabaseCost: 550,
    markupPercent: 55,
    price: 853,
    cpu: "2 núcleos ARM",
    dedicated: true,
    ram: "8 GB",
    directConnections: 160,
    poolerConnections: 800,
  },
  {
    id: "xlarge",
    size: "XL",
    supabaseCost: 1050,
    markupPercent: 40,
    price: 1470,
    cpu: "4 núcleos ARM",
    dedicated: true,
    ram: "16 GB",
    directConnections: 240,
    poolerConnections: 1000,
  },
  {
    id: "2xlarge",
    size: "2XL",
    supabaseCost: 2100,
    markupPercent: 30,
    price: 2730,
    cpu: "8 núcleos ARM",
    dedicated: true,
    ram: "32 GB",
    directConnections: 380,
    poolerConnections: 1500,
  },
  {
    id: "4xlarge",
    size: "4XL",
    supabaseCost: 4200,
    markupPercent: 25,
    price: 5250,
    cpu: "16 núcleos ARM",
    dedicated: true,
    ram: "64 GB",
    directConnections: 480,
    poolerConnections: 3000,
  },
  {
    id: "8xlarge",
    size: "8XL",
    supabaseCost: 8400,
    markupPercent: 20,
    price: 10080,
    cpu: "32 núcleos ARM",
    dedicated: true,
    ram: "128 GB",
    directConnections: 490,
    poolerConnections: 6000,
  },
  {
    id: "12xlarge",
    size: "12XL",
    supabaseCost: 12600,
    markupPercent: 20,
    price: 15120,
    cpu: "48 núcleos ARM",
    dedicated: true,
    ram: "192 GB",
    directConnections: 500,
    poolerConnections: 9000,
  },
  {
    id: "16xlarge",
    size: "16XL",
    supabaseCost: 16800,
    markupPercent: 20,
    price: 20160,
    cpu: "64 núcleos ARM",
    dedicated: true,
    ram: "256 GB",
    directConnections: 500,
    poolerConnections: 12000,
  },
];

export function getComputePrice(computeId: string): number {
  return computeOptions.find((c) => c.id === computeId)?.price ?? 0;
}

export function getPlanTotal(planId: string, computeId: string): number {
  const plan = plans.find((p) => p.id === planId);
  const compute = getComputePrice(computeId);
  return (plan?.monthlyPrice ?? 0) + compute;
}

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Posso limitar meu uso para que minha conta não cresça demais?",
    answer:
      "Sim. Os limites de gastos estão ativos por padrão no plano Pro. Você pode desativar os limites para usar além dos limites do plano e pagar só pelo que usar.",
  },
  {
    question: "Estou preocupado que minha conta possa ficar muito alta no final do mês.",
    answer:
      "Os limites de gastos estão ativos por padrão e você precisa desativá-los no painel para ativar preços por uso.",
  },
  {
    question: "Quando serei cobrado?",
    answer:
      "Nosso plano Pro é cobrado antecipadamente, com faturamento mensal. Custos adicionais de uso também são cobrados no final do mês.",
  },
  {
    question: "O BCRM cobra impostos como ICMS, ISS ou PIS?",
    answer: "O BCRM aplicará impostos onde exigido por lei, com base no seu endereço de faturamento.",
  },
  {
    question: "Vocês vão mudar os preços no futuro?",
    answer:
      "Os preços podem mudar no futuro, mas como equipe de desenvolvedores, estamos comprometidos em manter preços acessíveis para desenvolvedores.",
  },
  {
    question: "O que acontece se eu cancelar minha assinatura?",
    answer:
      "A organização recebe créditos pelo tempo não utilizado durante o mês de faturamento. Esses créditos podem ser usados em outros projetos.",
  },
  {
    question: "Receberei uma notificação se estiver perto dos limites de uso?",
    answer: "Sim, enviaremos um e-mail quando você estiver a 20% dos limites do seu plano.",
  },
  {
    question: "E se eu precisar de um projeto para desenvolvimento e outro para produção?",
    answer:
      "Você pode criar um projeto separado para seu backend de desenvolvimento e produção. Nosso plano Inicial oferece 1 projeto ativo.",
  },
  {
    question: "Posso auto-hospedar o BCRM grátis?",
    answer:
      "Sim, você pode usar a configuração Docker ou o CLI do BCRM. O BCRM Studio também está disponível no Docker.",
  },
  {
    question: "Posso pausar um projeto gratuito?",
    answer:
      "Sim, você pode pausar um projeto a qualquer momento. Nosso plano Inicial oferece 1 projeto, mas você pode ter quantos projetos pausados quiser.",
  },
];
