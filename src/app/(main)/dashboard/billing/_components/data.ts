export type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  badge?: string;
  highlighted?: boolean;
  cta: string;
  features: string[];
  supabasePlan: string;
  supabaseCost: number;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Inicial",
    description: "Para projetos pequenos e exploração.",
    monthlyPrice: 789.90,
    yearlyPrice: 9478.80,
    cta: "Começar Agora",
    supabasePlan: "Free",
    supabaseCost: 0,
    features: [
      "2 projetos ativos",
      "50.000 usuários ativos mensais",
      "500 MB de banco de dados",
      "5 GB de largura de banda",
      "1 GB de armazenamento",
      "Suporte da comunidade",
      "MFA básico",
      "CPU compartilhada (500 MB RAM)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para aplicações em produção e equipes em crescimento.",
    monthlyPrice: 1889.90,
    yearlyPrice: 22678.80,
    badge: "Popular",
    highlighted: true,
    cta: "Fazer Upgrade",
    supabasePlan: "Pro",
    supabaseCost: 150,
    features: [
      "Projetos ilimitados",
      "100.000 usuários ativos mensais",
      "8 GB de banco por projeto",
      "250 GB de largura de banda",
      "100 GB de armazenamento",
      "Suporte por e-mail",
      "Backups diários (7 dias)",
      "SMTP personalizado",
      "MFA avançado",
      "SSO/SAML (50 incluídos)",
      "Retenção de logs (7 dias)",
      "CDN inteligente",
      "Projetos nunca pausados",
    ],
  },
  {
    id: "team",
    name: "Equipe",
    description: "Para equipes que precisam de segurança e conformidade.",
    monthlyPrice: 7989.90,
    yearlyPrice: 95878.80,
    cta: "Fazer Upgrade",
    supabasePlan: "Team",
    supabaseCost: 3600,
    features: [
      "Tudo do Pro",
      "SOC2 e ISO 27001",
      "Conformidade HIPAA (adicional)",
      "SSO para dashboard",
      "Suporte prioritário por e-mail e SLAs",
      "Backups (14 dias)",
      "Retenção de logs (28 dias)",
      "Acesso somente leitura",
      "Logs de auditoria da plataforma",
      "Funções de acesso personalizadas",
      "AWS PrivateLink",
      "Ajuda com questionário de segurança",
    ],
  },
  {
    id: "enterprise",
    name: "Empresarial",
    description: "Para grandes organizações com necessidades customizadas.",
    monthlyPrice: null,
    yearlyPrice: null,
    supabasePlan: "Enterprise",
    supabaseCost: 0,
    cta: "Falar com Vendas",
    features: [
      "Tudo do Team",
      "Gerente de suporte designado",
      "SLAs de uptime",
      "BYO Cloud compatível",
      "Suporte premium 24/7",
      "Canal privado no Slack",
      "Questionários de segurança customizados",
      "Contrato e faturamento personalizados",
    ],
  },
];

export type FeatureCategory = {
  category: string;
  features: {
    name: string;
    starter: string;
    pro: string;
    team: string;
    enterprise: string;
  }[];
};

export const featureComparison: FeatureCategory[] = [
  {
    category: "Banco de Dados",
    features: [
      { name: "Banco Postgres Dedicado", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Requisições API ilimitadas", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Tamanho do banco", starter: "500 MB", pro: "8 GB", team: "8 GB", enterprise: "Personalizado" },
      { name: "Configuração de disco avançada", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Backups automáticos", starter: "-", pro: "7 dias", team: "14 dias", enterprise: "Personalizado" },
      { name: "Recuperação ponto a ponto", starter: "-", pro: "R$ 500/mês por 7 dias", team: "R$ 500/mês por 7 dias", enterprise: "R$ 500/mês por 7 dias" },
      { name: "Pausa", starter: "Após 1 semana", pro: "Nunca", team: "Nunca", enterprise: "Nunca" },
      { name: "Branching", starter: "-", pro: "R$ 0,07/hora", team: "R$ 0,07/hora", enterprise: "Personalizado" },
      { name: "Egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Personalizado" },
      { name: "Pipelines", starter: "-", pro: "R$ 0,27/hora + R$ 15/GB", team: "R$ 0,27/hora + R$ 15/GB", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Autenticação",
    features: [
      { name: "Usuários ativos mensais (MAUs)", starter: "50.000", pro: "100.000", team: "100.000", enterprise: "Personalizado" },
      { name: "Propriedade dos dados do usuário", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Login anônimo", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Provedores OAuth sociais", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "SMTP personalizado", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Remover marca BCRM", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Logs de auditoria de autenticação", starter: "1 hora", pro: "7 dias", team: "28 dias", enterprise: "Incluso" },
      { name: "MFA básico", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "MFA avançado (Telefone)", starter: "-", pro: "R$ 375/mês primeiro projeto", team: "R$ 375/mês primeiro projeto", enterprise: "Personalizado" },
      { name: "MAUs de terceiros", starter: "50.000", pro: "100.000", team: "100.000", enterprise: "Personalizado" },
      { name: "Single Sign-On (SAML 2.0)", starter: "-", pro: "50 incluídos", team: "50 incluídos", enterprise: "Fale Conosco" },
      { name: "Proteção contra senhas vazadas", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Sessão única por usuário", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Timeouts de sessão", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Auth Hooks", starter: "JWT + Email/SMS", pro: "JWT + Email/SMS", team: "Todos", enterprise: "Todos" },
    ],
  },
  {
    category: "Armazenamento",
    features: [
      { name: "Armazenamento de arquivos", starter: "1 GB", pro: "100 GB", team: "100 GB", enterprise: "Personalizado" },
      { name: "Egress em cache", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Personalizado" },
      { name: "Controles de acesso personalizados", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Tamanho máximo de upload", starter: "50 MB", pro: "500 GB", team: "500 GB", enterprise: "Personalizado" },
      { name: "Rede de distribuição de conteúdo", starter: "CDN básico", pro: "CDN inteligente", team: "CDN inteligente", enterprise: "CDN inteligente" },
      { name: "Transformações de imagem", starter: "-", pro: "100 grátis", team: "100 grátis", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Funções Edge",
    features: [
      { name: "Invocações", starter: "500.000", pro: "2 Milhões", team: "2 Milhões", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Tempo Real",
    features: [
      { name: "Mudanças no Postgres", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Conexões simultâneas no pico", starter: "200", pro: "500", team: "500", enterprise: "Personalizado" },
      { name: "Mensagens por mês", starter: "2 Milhões", pro: "5 Milhões", team: "5 Milhões", enterprise: "Personalizado" },
      { name: "Tamanho máximo da mensagem", starter: "256 KB", pro: "3 MB", team: "3 MB", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Dashboard",
    features: [
      { name: "Membros da equipe", starter: "Ilimitados", pro: "Ilimitados", team: "Ilimitados", enterprise: "Ilimitados" },
    ],
  },
  {
    category: "Plataforma e Segurança",
    features: [
      { name: "BYO cloud", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Retenção de logs (API e Banco)", starter: "1 dia", pro: "7 dias", team: "28 dias", enterprise: "90 dias" },
      { name: "Log Drain", starter: "-", pro: "R$ 300/drain/mês", team: "R$ 300/drain/mês", enterprise: "Personalizado" },
      { name: "Logs de auditoria da plataforma", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "Endpoint de métricas", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "SOC2", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "ISO 27001", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "HIPAA", starter: "-", pro: "-", team: "Adicional", enterprise: "Adicional" },
      { name: "AWS PrivateLink", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "SSO", starter: "-", pro: "-", team: "Fale Conosco", enterprise: "Fale Conosco" },
      { name: "SLAs de uptime", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Funções de acesso", starter: "Proprietário, Admin, Dev", pro: "Proprietário, Admin, Dev", team: "Proprietário, Admin, Dev, Somente Leitura", enterprise: "Personalizado" },
      { name: "URLs personalizadas", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Domínios personalizados", starter: "-", pro: "R$ 50/domínio/mês", team: "R$ 50/domínio/mês", enterprise: "1 incluso" },
    ],
  },
  {
    category: "Suporte",
    features: [
      { name: "Suporte da comunidade", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Suporte por e-mail", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "SLA de suporte por e-mail", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "Suporte designado", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Suporte de integração", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Equipe de Sucesso do Cliente", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Ajuda com questionário de segurança", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
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
  { id: "inv_001", date: "Ago 1, 2026", description: "Plano Pro - Mensal", amount: 1889.90, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Plano Pro - Mensal", amount: 1889.90, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Plano Starter - Mensal", amount: 789.90, status: "paid" },
  { id: "inv_004", date: "Mai 1, 2026", description: "Plano Starter - Mensal", amount: 789.90, status: "paid" },
];

export type ComputeOption = {
  size: string;
  price: number;
  cpu: string;
  dedicated: boolean;
  ram: string;
  directConnections: number;
  poolerConnections: number;
};

export const computeOptions: ComputeOption[] = [
  { size: "Micro", price: 60, cpu: "2 núcleos ARM", dedicated: false, ram: "1 GB", directConnections: 60, poolerConnections: 200 },
  { size: "Pequeno", price: 90, cpu: "2 núcleos ARM", dedicated: false, ram: "2 GB", directConnections: 90, poolerConnections: 400 },
  { size: "Médio", price: 360, cpu: "2 núcleos ARM", dedicated: false, ram: "4 GB", directConnections: 120, poolerConnections: 600 },
  { size: "Grande", price: 660, cpu: "2 núcleos ARM", dedicated: true, ram: "8 GB", directConnections: 160, poolerConnections: 800 },
  { size: "XL", price: 1260, cpu: "4 núcleos ARM", dedicated: true, ram: "16 GB", directConnections: 240, poolerConnections: 1000 },
  { size: "2XL", price: 2460, cpu: "8 núcleos ARM", dedicated: true, ram: "32 GB", directConnections: 380, poolerConnections: 1500 },
  { size: "4XL", price: 5760, cpu: "16 núcleos ARM", dedicated: true, ram: "64 GB", directConnections: 480, poolerConnections: 3000 },
  { size: "8XL", price: 11220, cpu: "32 núcleos ARM", dedicated: true, ram: "128 GB", directConnections: 490, poolerConnections: 6000 },
  { size: "12XL", price: 16800, cpu: "48 núcleos ARM", dedicated: true, ram: "192 GB", directConnections: 500, poolerConnections: 9000 },
  { size: "16XL", price: 22380, cpu: "64 núcleos ARM", dedicated: true, ram: "256 GB", directConnections: 500, poolerConnections: 12000 },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Posso limitar meu uso para que minha conta não cresça demais?",
    answer: "Sim. Os limites de gastos estão ativos por padrão no plano Pro. Você pode desativar os limites para usar além dos limites do plano e pagar só pelo que usar.",
  },
  {
    question: "Estou preocupado que minha conta possa ficar muito alta no final do mês.",
    answer: "Os limites de gastos estão ativos por padrão e você precisa desativá-los no painel para ativar preços por uso.",
  },
  {
    question: "Quando serei cobrado?",
    answer: "Nosso plano Pro é cobrado antecipadamente, com faturamento mensal. Custos adicionais de uso também são cobrados no final do mês.",
  },
  {
    question: "O BCRM cobra impostos como ICMS, ISS ou PIS?",
    answer: "O BCRM aplicará impostos onde exigido por lei, com base no seu endereço de faturamento.",
  },
  {
    question: "Vocês vão mudar os preços no futuro?",
    answer: "Os preços podem mudar no futuro, mas como equipe de desenvolvedores, estamos comprometidos em manter preços acessíveis para desenvolvedores.",
  },
  {
    question: "O que acontece se eu cancelar minha assinatura?",
    answer: "A organização recebe créditos pelo tempo não utilizado durante o mês de faturamento. Esses créditos podem ser usados em outros projetos.",
  },
  {
    question: "Receberei uma notificação se estiver perto dos limites de uso?",
    answer: "Sim, enviaremos um e-mail quando você estiver a 20% dos limites do seu plano.",
  },
  {
    question: "E se eu precisar de um projeto para desenvolvimento e outro para produção?",
    answer: "Você pode criar um projeto separado para seu backend de desenvolvimento e produção. Nosso plano Starter oferece 2 projetos gratuitos.",
  },
  {
    question: "Posso auto-hospedar o BCRM grátis?",
    answer: "Sim, você pode usar a configuração Docker ou o CLI do BCRM. O BCRM Studio também está disponível no Docker.",
  },
  {
    question: "Posso pausar um projeto gratuito?",
    answer: "Sim, você pode pausar um projeto a qualquer momento. Nosso plano Starter oferece 2 projetos, mas você pode ter quantos projetos pausados quiser.",
  },
];
