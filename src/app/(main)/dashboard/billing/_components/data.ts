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
    name: "Starter",
    description: "Para projetos pequenos e exploracao.",
    monthlyPrice: 789.90,
    yearlyPrice: 9478.80,
    cta: "Comecar Agora",
    supabasePlan: "Free",
    supabaseCost: 0,
    features: [
      "2 projetos ativos",
      "50.000 usuarios ativos mensais",
      "500 MB de banco de dados",
      "5 GB de largura de banda",
      "1 GB de armazenamento",
      "Suporte da comunidade",
      "MFA basico",
      "CPU compartilhada (500 MB RAM)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para aplicacoes em producao e equipes em crescimento.",
    monthlyPrice: 1889.90,
    yearlyPrice: 22678.80,
    badge: "Popular",
    highlighted: true,
    cta: "Fazer Upgrade",
    supabasePlan: "Pro",
    supabaseCost: 150,
    features: [
      "Projetos ilimitados",
      "100.000 usuarios ativos mensais",
      "8 GB de banco por projeto",
      "250 GB de largura de banda",
      "100 GB de armazenamento",
      "Suporte por e-mail",
      "Backups diarios (7 dias)",
      "SMTP personalizado",
      "MFA avancado",
      "SSO/SAML (50 incluidos)",
      "Retencao de logs (7 dias)",
      "CDN inteligente",
      "Projetos nunca pausados",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "Para equipes que precisam de seguranca e conformidade.",
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
      "Suporte prioritario por e-mail e SLAs",
      "Backups (14 dias)",
      "Retencao de logs (28 dias)",
      "Acesso somente leitura",
      "Logs de auditoria da plataforma",
      "Funcoes de acesso personalizadas",
      "AWS PrivateLink",
      "Ajuda com questionario de seguranca",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Para grandes organizacoes com necessidades customizadas.",
    monthlyPrice: null,
    yearlyPrice: null,
    supabasePlan: "Enterprise",
    supabaseCost: 0,
    cta: "Falar com Vendas",
    features: [
      "Tudo do Team",
      "Gerente de suporte designado",
      "SLAs de uptime",
      "BYO Cloud compativel",
      "Suporte premium 24/7",
      "Canal privado no Slack",
      "Questionarios de seguranca customizados",
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
      { name: "Requisicoes API ilimitadas", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Tamanho do banco", starter: "500 MB", pro: "8 GB", team: "8 GB", enterprise: "Personalizado" },
      { name: "Configuracao de disco avancada", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Backups automaticos", starter: "-", pro: "7 dias", team: "14 dias", enterprise: "Personalizado" },
      { name: "Recuperacao ponto a ponto", starter: "-", pro: "R$ 500/mo por 7 dias", team: "R$ 500/mo por 7 dias", enterprise: "R$ 500/mo por 7 dias" },
      { name: "Pausa", starter: "Apos 1 semana", pro: "Nunca", team: "Nunca", enterprise: "Nunca" },
      { name: "Branching", starter: "-", pro: "R$ 0,07/hr", team: "R$ 0,07/hr", enterprise: "Personalizado" },
      { name: "Egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Personalizado" },
      { name: "Pipelines", starter: "-", pro: "R$ 0,27/hr + R$ 15/GB", team: "R$ 0,27/hr + R$ 15/GB", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Autenticacao",
    features: [
      { name: "Usuarios ativos mensais (MAUs)", starter: "50.000", pro: "100.000", team: "100.000", enterprise: "Personalizado" },
      { name: "Propriedade dos dados do usuario", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Login anonimo", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Provedores OAuth sociais", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "SMTP personalizado", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Remover marca BCRM", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Logs de auditoria de autenticacao", starter: "1 hora", pro: "7 dias", team: "28 dias", enterprise: "Incluso" },
      { name: "MFA basico", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "MFA avancado (Telefone)", starter: "-", pro: "R$ 375/mo primeiro projeto", team: "R$ 375/mo primeiro projeto", enterprise: "Personalizado" },
      { name: "MAUs de terceiros", starter: "50.000", pro: "100.000", team: "100.000", enterprise: "Personalizado" },
      { name: "Single Sign-On (SAML 2.0)", starter: "-", pro: "50 incluidos", team: "50 incluidos", enterprise: "Fale Conosco" },
      { name: "Protecao contra senhas vazadas", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Sessao unica por usuario", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Timeouts de sessao", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Auth Hooks", starter: "JWT + Email/SMS", pro: "JWT + Email/SMS", team: "Todos", enterprise: "Todos" },
    ],
  },
  {
    category: "Armazenamento",
    features: [
      { name: "Armazenamento de arquivos", starter: "1 GB", pro: "100 GB", team: "100 GB", enterprise: "Personalizado" },
      { name: "Egress em cache", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Personalizado" },
      { name: "Controles de acesso personalizados", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Tamanho maximo de upload", starter: "50 MB", pro: "500 GB", team: "500 GB", enterprise: "Personalizado" },
      { name: "Rede de distribuicao de conteudo", starter: "CDN basico", pro: "CDN inteligente", team: "CDN inteligente", enterprise: "CDN inteligente" },
      { name: "Transformacoes de imagem", starter: "-", pro: "100 gratis", team: "100 gratis", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Funcoes Edge",
    features: [
      { name: "Invocacoes", starter: "500.000", pro: "2 Milhoes", team: "2 Milhoes", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Tempo Real",
    features: [
      { name: "Mudancas no Postgres", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Conexoes simultaneas no pico", starter: "200", pro: "500", team: "500", enterprise: "Personalizado" },
      { name: "Mensagens por mes", starter: "2 Milhoes", pro: "5 Milhoes", team: "5 Milhoes", enterprise: "Personalizado" },
      { name: "Tamanho maximo da mensagem", starter: "256 KB", pro: "3 MB", team: "3 MB", enterprise: "Personalizado" },
    ],
  },
  {
    category: "Dashboard",
    features: [
      { name: "Membros da equipe", starter: "Ilimitados", pro: "Ilimitados", team: "Ilimitados", enterprise: "Ilimitados" },
    ],
  },
  {
    category: "Plataforma e Seguranca",
    features: [
      { name: "BYO cloud", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Retencao de logs (API e Banco)", starter: "1 dia", pro: "7 dias", team: "28 dias", enterprise: "90 dias" },
      { name: "Log Drain", starter: "-", pro: "R$ 300/drain/mo", team: "R$ 300/drain/mo", enterprise: "Personalizado" },
      { name: "Logs de auditoria da plataforma", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "Endpoint de metricas", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "SOC2", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "ISO 27001", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "HIPAA", starter: "-", pro: "-", team: "Adicional", enterprise: "Adicional" },
      { name: "AWS PrivateLink", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "SSO", starter: "-", pro: "-", team: "Fale Conosco", enterprise: "Fale Conosco" },
      { name: "SLAs de uptime", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Funcoes de acesso", starter: "Proprietario, Admin, Dev", pro: "Proprietario, Admin, Dev", team: "Proprietario, Admin, Dev, Somente Leitura", enterprise: "Personalizado" },
      { name: "URLs personalizadas", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Dominios personalizados", starter: "-", pro: "R$ 50/dominio/mo", team: "R$ 50/dominio/mo", enterprise: "1 incluso" },
    ],
  },
  {
    category: "Suporte",
    features: [
      { name: "Suporte da comunidade", starter: "Incluso", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "Suporte por e-mail", starter: "-", pro: "Incluso", team: "Incluso", enterprise: "Incluso" },
      { name: "SLA de suporte por e-mail", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
      { name: "Suporte designado", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Suporte de integracao", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Equipe de Sucesso do Cliente", starter: "-", pro: "-", team: "-", enterprise: "Incluso" },
      { name: "Ajuda com questionario de seguranca", starter: "-", pro: "-", team: "Incluso", enterprise: "Incluso" },
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
  { size: "Micro", price: 60, cpu: "2-core ARM", dedicated: false, ram: "1 GB", directConnections: 60, poolerConnections: 200 },
  { size: "Small", price: 90, cpu: "2-core ARM", dedicated: false, ram: "2 GB", directConnections: 90, poolerConnections: 400 },
  { size: "Medium", price: 360, cpu: "2-core ARM", dedicated: false, ram: "4 GB", directConnections: 120, poolerConnections: 600 },
  { size: "Large", price: 660, cpu: "2-core ARM", dedicated: true, ram: "8 GB", directConnections: 160, poolerConnections: 800 },
  { size: "XL", price: 1260, cpu: "4-core ARM", dedicated: true, ram: "16 GB", directConnections: 240, poolerConnections: 1000 },
  { size: "2XL", price: 2460, cpu: "8-core ARM", dedicated: true, ram: "32 GB", directConnections: 380, poolerConnections: 1500 },
  { size: "4XL", price: 5760, cpu: "16-core ARM", dedicated: true, ram: "64 GB", directConnections: 480, poolerConnections: 3000 },
  { size: "8XL", price: 11220, cpu: "32-core ARM", dedicated: true, ram: "128 GB", directConnections: 490, poolerConnections: 6000 },
  { size: "12XL", price: 16800, cpu: "48-core ARM", dedicated: true, ram: "192 GB", directConnections: 500, poolerConnections: 9000 },
  { size: "16XL", price: 22380, cpu: "64-core ARM", dedicated: true, ram: "256 GB", directConnections: 500, poolerConnections: 12000 },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Posso limitar meu uso para que minha conta nao cresca demais?",
    answer: "Sim. Os limites de gastos estao ativos por padrao no plano Pro. Voce pode desativar os limites para usar alem dos limites do plano e pagar so pelo que usar.",
  },
  {
    question: "Estou preocupado que minha conta possa ficar muito alta no final do mes.",
    answer: "Os limites de gastos estao ativos por padrao e voce precisa desativa-los no painel para ativar precos por uso.",
  },
  {
    question: "Quando serei cobrado?",
    answer: "Nosso plano Pro e cobrado antecipadamente, com faturamento mensal. Custos adicionais de uso tambem sao cobrados no final do mes.",
  },
  {
    question: "O BCRM cobra impostos como ICMS, ISS ou PIS?",
    answer: "O BCRM aplicara impostos onde exigido por lei, com base no seu endereco de faturamento.",
  },
  {
    question: "Voces vao mudar os precos no futuro?",
    answer: "Os precos podem mudar no futuro, mas como equipe de desenvolvedores, estamos comprometidos em manter precos acessiveis para desenvolvedores.",
  },
  {
    question: "O que acontece se eu cancelar minha assinatura?",
    answer: "A organizacao recebe creditos pelo tempo nao utilizado durante o mes de faturamento. Esses creditos podem ser usados em outros projetos.",
  },
  {
    question: "Receberei uma notificacao se estiver perto dos limites de uso?",
    answer: "Sim, enviaremos um e-mail quando voce estiver a 20% dos limites do seu plano.",
  },
  {
    question: "E se eu precisar de um projeto para desenvolvimento e outro para producao?",
    answer: "Voce pode criar um projeto separado para seu backend de desenvolvimento e producao. Nosso plano Starter gives 2 projetos gratuitos.",
  },
  {
    question: "Posso auto-hospedar o BCRM gratis?",
    answer: "Sim, voce pode usar a configuracao Docker ou o CLI do BCRM. O BCRM Studio tambem esta disponivel no Docker.",
  },
  {
    question: "Posso pausar um projeto gratuito?",
    answer: "Sim, voce pode pausar um projeto a qualquer momento. Nosso plano Starter oferece 2 projetos, mas voce pode ter quantos projetos pausados quiser.",
  },
];
