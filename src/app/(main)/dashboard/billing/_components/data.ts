export const EXCHANGE_RATE = 6.2;
export const STRIPE_FEE_RATE = 0.05;
export const COMPUTE_CREDIT_USD = 10;

export const PLAN_MULTIPLIER = 6;
export const COMPUTE_MULTIPLIER = 3;

export function planPrice(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * PLAN_MULTIPLIER * 100) / 100;
}

export function computePrice(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * COMPUTE_MULTIPLIER * 100) / 100;
}

export function overagePrice(usd: number): number {
  return Math.round(((usd * EXCHANGE_RATE * COMPUTE_MULTIPLIER) / (1 - STRIPE_FEE_RATE)) * 100) / 100;
}

export function supabaseToBrl(usd: number): number {
  return Math.round(((usd * EXCHANGE_RATE * COMPUTE_MULTIPLIER) / (1 - STRIPE_FEE_RATE)) * 100) / 100;
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
  pro: {
    diskGB: 8,
    egressGB: 250,
    cachedEgressGB: 250,
    storageGB: 100,
    mau: 100_000,
    edgeInvocations: 2_000_000,
    realtimeConnections: 500,
    realtimeMessages: 5_000_000,
    imageTransformations: 100,
    samlUsers: 50,
  },
  enterprise: {
    diskGB: 8,
    egressGB: 250,
    cachedEgressGB: 250,
    storageGB: 100,
    mau: 100_000,
    edgeInvocations: 2_000_000,
    realtimeConnections: 500,
    realtimeMessages: 5_000_000,
    imageTransformations: 100,
    samlUsers: 50,
  },
};

export const overageRates: OverageRate = {
  diskPerGB: overagePrice(0.125),
  egressPerGB: overagePrice(0.09),
  cachedEgressPerGB: overagePrice(0.03),
  storagePerGB: overagePrice(0.0213),
  perMAU: overagePrice(0.00325),
  perMillionEdge: overagePrice(2),
  per1000RealtimeConn: overagePrice(10),
  perMillionRealtimeMsg: overagePrice(2.5),
  per1000ImageTransform: overagePrice(5),
  perSAMLMau: overagePrice(0.015),
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
    id: "pro",
    name: "Pro",
    description: "Para equipes em crescimento",
    monthlyPrice: planPrice(25),
    badge: "Popular",
    highlighted: true,
    cta: "Comecar Agora",
    supabasePlan: "Pro",
    baseFeatures: [
      "Até 20 usuários",
      "Todos os módulos",
      "1 projeto ativo",
      "Banco Postgres dedicado",
      "8 GB de disco por projeto",
      "250 GB de egress mensal",
      "100 GB de armazenamento",
      "Auth com 100K MAU",
      "2M Edge Functions",
      "500 conexoes Realtime",
      "5M mensagens Realtime",
      "100 transformacoes de imagem",
      "SAML/SSO (50 usuários)",
      "Backups automáticos (7 dias)",
      "Suporte prioritário",
      "Relatórios avançados",
      "API de integração",
    ],
    extraFeatures: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Para organizacoes compliance e escala",
    monthlyPrice: planPrice(599),
    cta: "Falar com Vendas",
    supabasePlan: "Team",
    baseFeatures: [],
    featureHeader: "Tudo no Plano Pro, mais:",
    extraFeatures: [
      "SOC2 + ISO 27001",
      "HIPAA (adicionais)",
      "SSO para Dashboard",
      "Platform Audit Logs",
      "AWS PrivateLink",
      "Backups (14 dias)",
      "Logs retidos (28 dias)",
      "Suporte prioritário com SLA",
      "Access Roles: Read-only + Predefined",
    ],
  },
];

export function getAllPlanFeatures(planId: string): string[] {
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return [];
  if (plan.id === "pro") {
    return [...plan.baseFeatures];
  }
  if (plan.id === "enterprise") {
    const prevPlan = plans.find((p) => p.id === "pro");
    return [...(prevPlan ? getAllPlanFeatures(prevPlan.id) : []), ...plan.extraFeatures];
  }
  return [...plan.baseFeatures, ...plan.extraFeatures];
}

export type FeatureCategory = {
  category: string;
  features: {
    name: string;
    pro: string;
    enterprise: string;
  }[];
};

export const featureComparison: FeatureCategory[] = [
  {
    category: "Banco de Dados",
    features: [
      { name: "Banco Postgres Dedicado", pro: "Incluso", enterprise: "Incluso" },
      { name: "Requisicoes API ilimitadas", pro: "Incluso", enterprise: "Incluso" },
      { name: "Disco por projeto", pro: "8 GB", enterprise: "8 GB" },
      { name: "Egress mensal", pro: "250 GB", enterprise: "250 GB" },
      { name: "Egress em cache", pro: "250 GB", enterprise: "250 GB" },
      { name: "Backups automáticos", pro: "7 dias", enterprise: "14 dias" },
      { name: "Recuperacao ponto a ponto", pro: "Adicional ($100/mes)", enterprise: "Adicional ($100/mes)" },
      { name: "Branching", pro: "Adicional ($0,013/branch/h)", enterprise: "Adicional ($0,013/branch/h)" },
      { name: "Pipelines", pro: "Adicional", enterprise: "Adicional" },
    ],
  },
  {
    category: "Compute",
    features: [
      { name: "CPU", pro: "2 nucleos ARM (Micro)", enterprise: "2 nucleos ARM (Micro)" },
      { name: "RAM", pro: "1 GB", enterprise: "1 GB" },
      { name: "Conexoes diretas", pro: "60", enterprise: "60" },
      { name: "Pooler connections", pro: "200", enterprise: "200" },
      { name: "Compute dedicado", pro: "A partir de Large ($110)", enterprise: "A partir de Large ($110)" },
      { name: "Creditos compute", pro: "$10/mes inclusos", enterprise: "$10/mes inclusos" },
    ],
  },
  {
    category: "Autenticacao",
    features: [
      { name: "Usuários ativos mensais (MAU)", pro: "100.000", enterprise: "100.000" },
      { name: "Propriedade dos dados do usuário", pro: "Incluso", enterprise: "Incluso" },
      { name: "Login anonimo", pro: "Incluso", enterprise: "Incluso" },
      { name: "Provedores OAuth sociais", pro: "Incluso", enterprise: "Incluso" },
      { name: "SMTP personalizado", pro: "Incluso", enterprise: "Incluso" },
      { name: "Remove branding de emails", pro: "Incluso", enterprise: "Incluso" },
      { name: "MFA basico", pro: "Incluso", enterprise: "Incluso" },
      { name: "MFA avançado (Telefone)", pro: "$75/mês primeiro projeto", enterprise: "$75/mês primeiro projeto" },
      { name: "Single Sign-On (SAML 2.0)", pro: "50 incluidos", enterprise: "50 incluidos" },
      { name: "Protecao contra senhas vazadas", pro: "Incluso", enterprise: "Incluso" },
      { name: "Sessão única por usuário", pro: "Incluso", enterprise: "Incluso" },
      { name: "Timeouts de sessao", pro: "Incluso", enterprise: "Incluso" },
      { name: "Logs de auditoria de auth", pro: "7 dias", enterprise: "28 dias" },
      { name: "Auth Hooks", pro: "JWT + Email/SMS", enterprise: "Todos" },
    ],
  },
  {
    category: "Armazenamento",
    features: [
      { name: "Armazenamento de arquivos", pro: "100 GB", enterprise: "100 GB" },
      { name: "Egress em cache", pro: "250 GB", enterprise: "250 GB" },
      { name: "Controles de acesso personalizados", pro: "Incluso", enterprise: "Incluso" },
      { name: "Tamanho maximo de upload", pro: "500 GB", enterprise: "500 GB" },
      { name: "CDN", pro: "Smart CDN", enterprise: "Smart CDN" },
      { name: "Transformacoes de imagem", pro: "100 gratis", enterprise: "100 gratis" },
    ],
  },
  {
    category: "Funcoes Edge",
    features: [{ name: "Invocacoes mensais", pro: "2 Milhoes", enterprise: "2 Milhoes" }],
  },
  {
    category: "Tempo Real",
    features: [
      { name: "Mudancas no Postgres", pro: "Incluso", enterprise: "Incluso" },
      { name: "Conexoes simultaneas no pico", pro: "500", enterprise: "500" },
      { name: "Mensagens por mes", pro: "5 Milhoes", enterprise: "5 Milhoes" },
      { name: "Tamanho maximo da mensagem", pro: "3 MB", enterprise: "3 MB" },
    ],
  },
  {
    category: "Plataforma e Seguranca",
    features: [
      { name: "Retencao de logs (API e Banco)", pro: "7 dias", enterprise: "28 dias" },
      { name: "Endpoint de metricas", pro: "Incluso", enterprise: "Incluso" },
      { name: "Logs de auditoria da plataforma", pro: "-", enterprise: "Incluso" },
      { name: "SOC2", pro: "-", enterprise: "Incluso" },
      { name: "ISO 27001", pro: "-", enterprise: "Incluso" },
      { name: "HIPAA", pro: "-", enterprise: "Adicional pago" },
      { name: "AWS PrivateLink", pro: "-", enterprise: "Incluso" },
      { name: "SSO para Dashboard", pro: "-", enterprise: "Contato" },
      { name: "SLAs de uptime", pro: "-", enterprise: "Contato" },
      {
        name: "Funcoes de acesso",
        pro: "Proprietario, Admin, Dev",
        enterprise: "Proprietario, Admin, Dev, Read-only, Predefined",
      },
    ],
  },
  {
    category: "Suporte",
    features: [
      { name: "Suporte por e-mail", pro: "Incluso", enterprise: "Incluso" },
      { name: "SLA de suporte", pro: "-", enterprise: "Incluso" },
      { name: "Suporte designado", pro: "-", enterprise: "Contato" },
      { name: "Onboarding", pro: "-", enterprise: "Contato" },
      { name: "Security Questionnaire Help", pro: "-", enterprise: "Incluso" },
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
  { id: "inv_001", date: "Ago 1, 2026", description: "Plano Pro - Mensal", amount: 522, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Plano Pro - Mensal", amount: 522, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Plano Pro - Mensal", amount: 522, status: "paid" },
  { id: "inv_004", date: "Mai 1, 2026", description: "Plano Pro - Mensal", amount: 522, status: "paid" },
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
    markupBRL: computePrice(10),
    price: computePrice(10),
    cpu: "2 nucleos ARM",
    dedicated: false,
    ram: "1 GB",
    directConnections: 60,
    poolerConnections: 200,
    benefits: [
      "Ideal para projetos em fase de desenvolvimento",
      "Banco de dados com 1 GB de RAM",
      "60 conexoes diretas ao banco",
      "200 conexoes via pooler",
      "Compartilhado - custo-benefício para começar",
    ],
  },
  {
    id: "small",
    size: "Pequeno",
    supabaseCostUSD: 15,
    supabaseCostBRL: 93,
    markupBRL: computePrice(15),
    price: computePrice(15),
    cpu: "2 nucleos ARM",
    dedicated: false,
    ram: "2 GB",
    directConnections: 90,
    poolerConnections: 400,
    benefits: [
      "Banco de dados com 2 GB de RAM",
      "90 conexoes diretas ao banco",
      "400 conexoes via pooler",
      "Compartilhado - para apps com tráfego leve",
    ],
  },
  {
    id: "medium",
    size: "Medio",
    supabaseCostUSD: 60,
    supabaseCostBRL: 372,
    markupBRL: computePrice(60),
    price: computePrice(60),
    cpu: "2 nucleos ARM",
    dedicated: false,
    ram: "4 GB",
    directConnections: 120,
    poolerConnections: 600,
    benefits: [
      "Banco de dados com 4 GB de RAM",
      "120 conexoes diretas ao banco",
      "600 conexoes via pooler",
      "Compartilhado - para apps em produção com tráfego moderado",
    ],
  },
  {
    id: "large",
    size: "Grande",
    supabaseCostUSD: 110,
    supabaseCostBRL: 682,
    markupBRL: computePrice(110),
    price: computePrice(110),
    cpu: "2 nucleos ARM",
    dedicated: true,
    ram: "8 GB",
    directConnections: 160,
    poolerConnections: 800,
    benefits: [
      "CPU dedicado - performance consistente",
      "Banco de dados com 8 GB de RAM",
      "160 conexoes diretas ao banco",
      "800 conexoes via pooler",
      "Ideal para apps de produção com tráfego alto",
    ],
  },
  {
    id: "xlarge",
    size: "XL",
    supabaseCostUSD: 210,
    supabaseCostBRL: 1302,
    markupBRL: computePrice(210),
    price: computePrice(210),
    cpu: "4 nucleos ARM",
    dedicated: true,
    ram: "16 GB",
    directConnections: 240,
    poolerConnections: 1000,
    benefits: [
      "4 nucleos ARM dedicados",
      "Banco de dados com 16 GB de RAM",
      "240 conexoes diretas ao banco",
      "1.000 conexoes via pooler",
      "Para apps com alta concorrência e consultas complexas",
    ],
  },
  {
    id: "2xlarge",
    size: "2XL",
    supabaseCostUSD: 410,
    supabaseCostBRL: 2542,
    markupBRL: computePrice(410),
    price: computePrice(410),
    cpu: "8 nucleos ARM",
    dedicated: true,
    ram: "32 GB",
    directConnections: 380,
    poolerConnections: 1500,
    benefits: [
      "8 nucleos ARM dedicados",
      "Banco de dados com 32 GB de RAM",
      "380 conexoes diretas ao banco",
      "1.500 conexoes via pooler",
      "Para escalar horizontalmente com múltiplos projetos",
    ],
  },
  {
    id: "4xlarge",
    size: "4XL",
    supabaseCostUSD: 960,
    supabaseCostBRL: 5952,
    markupBRL: computePrice(960),
    price: computePrice(960),
    cpu: "16 nucleos ARM",
    dedicated: true,
    ram: "64 GB",
    directConnections: 480,
    poolerConnections: 3000,
    benefits: [
      "16 nucleos ARM dedicados",
      "Banco de dados com 64 GB de RAM",
      "480 conexoes diretas ao banco",
      "3.000 conexoes via pooler",
      "Para organizações com múltiplos projetos e alto volume",
    ],
  },
  {
    id: "8xlarge",
    size: "8XL",
    supabaseCostUSD: 1870,
    supabaseCostBRL: 11594,
    markupBRL: computePrice(1870),
    price: computePrice(1870),
    cpu: "32 nucleos ARM",
    dedicated: true,
    ram: "128 GB",
    directConnections: 490,
    poolerConnections: 6000,
    benefits: [
      "32 nucleos ARM dedicados",
      "Banco de dados com 128 GB de RAM",
      "490 conexoes diretas ao banco",
      "6.000 conexoes via pooler",
      "Para workloads pesados e analytics em tempo real",
    ],
  },
  {
    id: "12xlarge",
    size: "12XL",
    supabaseCostUSD: 2800,
    supabaseCostBRL: 17360,
    markupBRL: computePrice(2800),
    price: computePrice(2800),
    cpu: "48 nucleos ARM",
    dedicated: true,
    ram: "192 GB",
    directConnections: 500,
    poolerConnections: 9000,
    benefits: [
      "48 nucleos ARM dedicados",
      "Banco de dados com 192 GB de RAM",
      "500 conexoes diretas ao banco",
      "9.000 conexoes via pooler",
      "Para infraestrutura enterprise com alta demanda",
    ],
  },
  {
    id: "16xlarge",
    size: "16XL",
    supabaseCostUSD: 3730,
    supabaseCostBRL: 23126,
    markupBRL: computePrice(3730),
    price: computePrice(3730),
    cpu: "64 nucleos ARM",
    dedicated: true,
    ram: "256 GB",
    directConnections: 500,
    poolerConnections: 12000,
    benefits: [
      "64 nucleos ARM dedicados",
      "Banco de dados com 256 GB de RAM",
      "500 conexoes diretas ao banco",
      "12.000 conexoes via pooler",
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
      "Você pode criar um projeto separado para seu backend de desenvolvimento e produção. Nosso plano Pro oferece 1 projeto ativo.",
  },
  {
    question: "Posso auto-hospedar o BCRM grátis?",
    answer:
      "Sim, você pode usar a configuração Docker ou o CLI do BCRM. O BCRM Studio também está disponível no Docker.",
  },
  {
    question: "Posso pausar um projeto gratuito?",
    answer:
      "Sim, você pode pausar um projeto a qualquer momento. Nosso plano Pro oferece 1 projeto, mas você pode ter quantos projetos pausados quiser.",
  },
];
