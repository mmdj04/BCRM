export const EXCHANGE_RATE = 6.2;
export const MARKUP = 2.5;
export const STRIPE_FEE_RATE = 0.05;

export function supabaseToBrl(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100) / 100;
}

export function overageWithStripe(basePrice: number): number {
  return Math.round(basePrice * (1 + STRIPE_FEE_RATE) * 100) / 100;
}

export type PlanLimit = {
  diskGB: number;
  egressGB: number;
  cachedEgressGB: number;
  storageGB: number;
  mau: number;
  edgeInvocations: number;
  realtimeConnections: number;
  realtimeMessages: number;
  imageTransformations: number;
  samlUsers: number;
};

export type OverageRate = {
  diskPerGB: number;
  egressPerGB: number;
  cachedEgressPerGB: number;
  storagePerGB: number;
  perMAU: number;
  perMillionEdge: number;
  per1000RealtimeConn: number;
  perMillionRealtimeMsg: number;
  per1000ImageTransform: number;
  perSAMLMau: number;
};

export const planLimits: Record<string, PlanLimit> = {
  starter: {
    diskGB: 8,
    egressGB: 250,
    cachedEgressGB: 250,
    storageGB: 100,
    mau: 10_000,
    edgeInvocations: 500_000,
    realtimeConnections: 100,
    realtimeMessages: 1_000_000,
    imageTransformations: 100,
    samlUsers: 0,
  },
  pro: {
    diskGB: 50,
    egressGB: 1024,
    cachedEgressGB: 512,
    storageGB: 512,
    mau: 100_000,
    edgeInvocations: 5_000_000,
    realtimeConnections: 500,
    realtimeMessages: 5_000_000,
    imageTransformations: 1000,
    samlUsers: 50,
  },
  team: {
    diskGB: 200,
    egressGB: 5120,
    cachedEgressGB: 2048,
    storageGB: 2048,
    mau: 500_000,
    edgeInvocations: 20_000_000,
    realtimeConnections: 2000,
    realtimeMessages: 25_000_000,
    imageTransformations: 5000,
    samlUsers: 200,
  },
};

export const overageRates: OverageRate = {
  diskPerGB: overageWithStripe(supabaseToBrl(0.125)),
  egressPerGB: overageWithStripe(supabaseToBrl(0.09)),
  cachedEgressPerGB: overageWithStripe(supabaseToBrl(0.03)),
  storagePerGB: overageWithStripe(supabaseToBrl(0.0213)),
  perMAU: overageWithStripe(supabaseToBrl(0.00325)),
  perMillionEdge: overageWithStripe(supabaseToBrl(2)),
  per1000RealtimeConn: overageWithStripe(supabaseToBrl(10)),
  perMillionRealtimeMsg: overageWithStripe(supabaseToBrl(2.5)),
  per1000ImageTransform: overageWithStripe(supabaseToBrl(5)),
  perSAMLMau: overageWithStripe(supabaseToBrl(0.015)),
};

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
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Inicial",
    description: "Para pequenas equipes começando",
    monthlyPrice: 944.9,
    cta: "Começar Agora",
    supabasePlan: "Pro",
    baseFeatures: [
      "Até 10 usuários",
      "5 módulos",
      "100 GB de armazenamento",
      "1 projeto ativo",
      "Banco Postgres dedicado",
      "Auth com 10K MAU",
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
    monthlyPrice: 2414.9,
    badge: "Popular",
    highlighted: true,
    cta: "Fazer Upgrade",
    supabasePlan: "Pro",
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
    monthlyPrice: 9449.9,
    cta: "Fazer Upgrade",
    supabasePlan: "Team",
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
  let prevPlan: Plan | undefined;
  if (plan.id === "pro") {
    prevPlan = plans.find((p) => p.id === "starter");
  } else if (plan.id === "team") {
    prevPlan = plans.find((p) => p.id === "pro");
  }
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
      { name: "Disco por projeto", starter: "8 GB", pro: "50 GB", team: "200 GB" },
      { name: "Egress mensal", starter: "250 GB", pro: "1 TB", team: "5 TB" },
      { name: "Egress em cache", starter: "250 GB", pro: "512 GB", team: "2 TB" },
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
      { name: "Créditos compute", starter: "R$ 62/mês", pro: "R$ 62/mês", team: "R$ 62/mês" },
    ],
  },
  {
    category: "Autenticação",
    features: [
      { name: "Usuários ativos mensais (MAU)", starter: "10.000", pro: "100.000", team: "500.000" },
      { name: "Propriedade dos dados do usuário", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Login anônimo", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Provedores OAuth sociais", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "SMTP personalizado", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "MFA básico", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "MFA avançado (Telefone)", starter: "-", pro: "Adicional", team: "Adicional" },
      { name: "Single Sign-On (SAML 2.0)", starter: "-", pro: "50 incluídos", team: "200 incluídos" },
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
      { name: "Armazenamento de arquivos", starter: "100 GB", pro: "512 GB", team: "2 TB" },
      { name: "Egress em cache", starter: "250 GB", pro: "512 GB", team: "2 TB" },
      { name: "Controles de acesso personalizados", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Tamanho máximo de upload", starter: "500 GB", pro: "500 GB", team: "500 GB" },
      { name: "CDN", starter: "Smart CDN", pro: "Smart CDN", team: "Smart CDN" },
      { name: "Transformações de imagem", starter: "100 grátis", pro: "1.000 grátis", team: "5.000 grátis" },
    ],
  },
  {
    category: "Funções Edge",
    features: [{ name: "Invocações mensais", starter: "500K", pro: "5 Milhões", team: "20 Milhões" }],
  },
  {
    category: "Tempo Real",
    features: [
      { name: "Mudanças no Postgres", starter: "Incluso", pro: "Incluso", team: "Incluso" },
      { name: "Conexões simultâneas no pico", starter: "100", pro: "500", team: "2.000" },
      { name: "Mensagens por mês", starter: "1 Milhão", pro: "5 Milhões", team: "25 Milhões" },
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
  { id: "inv_001", date: "Ago 1, 2026", description: "Plano Pro - Mensal", amount: 2414.9, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Plano Pro - Mensal", amount: 2414.9, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Plano Inicial - Mensal", amount: 944.9, status: "paid" },
  { id: "inv_004", date: "Mai 1, 2026", description: "Plano Inicial - Mensal", amount: 944.9, status: "paid" },
];

export type ComputeOption = {
  id: string;
  size: string;
  supabaseCostUSD: number;
  supabaseCostBRL: number;
  markupBRL: number;
  price: number;
  cpu: string;
  dedicated: boolean;
  ram: string;
  directConnections: number;
  poolerConnections: number;
  benefits: string[];
};

export const computeOptions: ComputeOption[] = [
  {
    id: "micro",
    size: "Micro",
    supabaseCostUSD: 10,
    supabaseCostBRL: 62,
    markupBRL: 155,
    price: 155,
    cpu: "2 núcleos ARM",
    dedicated: false,
    ram: "1 GB",
    directConnections: 60,
    poolerConnections: 200,
    benefits: [
      "Ideal para projetos em fase de desenvolvimento",
      "Banco de dados com 1 GB de RAM",
      "60 conexões diretas ao banco",
      "200 conexões via pooler",
      "Compartilhado — custo-benefício para começar",
    ],
  },
  {
    id: "small",
    size: "Pequeno",
    supabaseCostUSD: 15,
    supabaseCostBRL: 93,
    markupBRL: 232.5,
    price: 232.5,
    cpu: "2 núcleos ARM",
    dedicated: false,
    ram: "2 GB",
    directConnections: 90,
    poolerConnections: 400,
    benefits: [
      "Banco de dados com 2 GB de RAM",
      "90 conexões diretas ao banco",
      "400 conexões via pooler",
      "Compartilhado — para apps com tráfego leve",
    ],
  },
  {
    id: "medium",
    size: "Médio",
    supabaseCostUSD: 60,
    supabaseCostBRL: 372,
    markupBRL: 930,
    price: 930,
    cpu: "2 núcleos ARM",
    dedicated: false,
    ram: "4 GB",
    directConnections: 120,
    poolerConnections: 600,
    benefits: [
      "Banco de dados com 4 GB de RAM",
      "120 conexões diretas ao banco",
      "600 conexões via pooler",
      "Compartilhado — para apps em produção com tráfego moderado",
    ],
  },
  {
    id: "large",
    size: "Grande",
    supabaseCostUSD: 110,
    supabaseCostBRL: 682,
    markupBRL: 1705,
    price: 1705,
    cpu: "2 núcleos ARM",
    dedicated: true,
    ram: "8 GB",
    directConnections: 160,
    poolerConnections: 800,
    benefits: [
      "CPU dedicado — performance consistente",
      "Banco de dados com 8 GB de RAM",
      "160 conexões diretas ao banco",
      "800 conexões via pooler",
      "Ideal para apps de produção com tráfego alto",
    ],
  },
  {
    id: "xlarge",
    size: "XL",
    supabaseCostUSD: 210,
    supabaseCostBRL: 1302,
    markupBRL: 3255,
    price: 3255,
    cpu: "4 núcleos ARM",
    dedicated: true,
    ram: "16 GB",
    directConnections: 240,
    poolerConnections: 1000,
    benefits: [
      "4 núcleos ARM dedicados",
      "Banco de dados com 16 GB de RAM",
      "240 conexões diretas ao banco",
      "1.000 conexões via pooler",
      "Para apps com alta concorrência e consultas complexas",
    ],
  },
  {
    id: "2xlarge",
    size: "2XL",
    supabaseCostUSD: 410,
    supabaseCostBRL: 2542,
    markupBRL: 6355,
    price: 6355,
    cpu: "8 núcleos ARM",
    dedicated: true,
    ram: "32 GB",
    directConnections: 380,
    poolerConnections: 1500,
    benefits: [
      "8 núcleos ARM dedicados",
      "Banco de dados com 32 GB de RAM",
      "380 conexões diretas ao banco",
      "1.500 conexões via pooler",
      "Para escalar horizontalmente com múltiplos projetos",
    ],
  },
  {
    id: "4xlarge",
    size: "4XL",
    supabaseCostUSD: 960,
    supabaseCostBRL: 5952,
    markupBRL: 14880,
    price: 14880,
    cpu: "16 núcleos ARM",
    dedicated: true,
    ram: "64 GB",
    directConnections: 480,
    poolerConnections: 3000,
    benefits: [
      "16 núcleos ARM dedicados",
      "Banco de dados com 64 GB de RAM",
      "480 conexões diretas ao banco",
      "3.000 conexões via pooler",
      "Para organizações com múltiplos projetos e alto volume",
    ],
  },
  {
    id: "8xlarge",
    size: "8XL",
    supabaseCostUSD: 1870,
    supabaseCostBRL: 11594,
    markupBRL: 28985,
    price: 28985,
    cpu: "32 núcleos ARM",
    dedicated: true,
    ram: "128 GB",
    directConnections: 490,
    poolerConnections: 6000,
    benefits: [
      "32 núcleos ARM dedicados",
      "Banco de dados com 128 GB de RAM",
      "490 conexões diretas ao banco",
      "6.000 conexões via pooler",
      "Para workloads pesados e analytics em tempo real",
    ],
  },
  {
    id: "12xlarge",
    size: "12XL",
    supabaseCostUSD: 2800,
    supabaseCostBRL: 17360,
    markupBRL: 43400,
    price: 43400,
    cpu: "48 núcleos ARM",
    dedicated: true,
    ram: "192 GB",
    directConnections: 500,
    poolerConnections: 9000,
    benefits: [
      "48 núcleos ARM dedicados",
      "Banco de dados com 192 GB de RAM",
      "500 conexões diretas ao banco",
      "9.000 conexões via pooler",
      "Para infraestrutura enterprise com alta demanda",
    ],
  },
  {
    id: "16xlarge",
    size: "16XL",
    supabaseCostUSD: 3730,
    supabaseCostBRL: 23126,
    markupBRL: 57815,
    price: 57815,
    cpu: "64 núcleos ARM",
    dedicated: true,
    ram: "256 GB",
    directConnections: 500,
    poolerConnections: 12000,
    benefits: [
      "64 núcleos ARM dedicados",
      "Banco de dados com 256 GB de RAM",
      "500 conexões diretas ao banco",
      "12.000 conexões via pooler",
      "Máxima performance para operações de grande escala",
    ],
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
