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
    description: "For hobby projects and exploration.",
    monthlyPrice: 75,
    yearlyPrice: 720,
    cta: "Get Started",
    supabasePlan: "Free",
    supabaseCost: 0,
    features: [
      "2 active projects",
      "50,000 monthly active users",
      "500 MB database",
      "5 GB bandwidth",
      "1 GB file storage",
      "Community support",
      "Basic MFA",
      "Shared CPU (500 MB RAM)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For production apps and growing teams.",
    monthlyPrice: 235,
    yearlyPrice: 2256,
    badge: "Popular",
    highlighted: true,
    cta: "Start Free Trial",
    supabasePlan: "Pro",
    supabaseCost: 25,
    features: [
      "Unlimited projects",
      "100,000 monthly active users",
      "8 GB database per project",
      "250 GB bandwidth",
      "100 GB file storage",
      "Email support",
      "Daily backups (7 days)",
      "Custom SMTP server",
      "Advanced MFA",
      "SSO/SAML (50 included)",
      "7-day log retention",
      "Smart CDN",
      "Projects never paused",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For teams that need security and compliance.",
    monthlyPrice: 1650,
    yearlyPrice: 15840,
    cta: "Start Free Trial",
    supabasePlan: "Team",
    supabaseCost: 599,
    features: [
      "Everything in Pro",
      "SOC2 & ISO 27001",
      "HIPAA compliance (add-on)",
      "SSO for dashboard",
      "Priority email support & SLAs",
      "14-day backups",
      "28-day log retention",
      "Read-only project access",
      "Platform audit logs",
      "Custom access roles",
      "AWS PrivateLink",
      "Security questionnaire help",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs.",
    monthlyPrice: null,
    yearlyPrice: null,
    supabasePlan: "Enterprise",
    supabaseCost: 0,
    cta: "Contact Sales",
    features: [
      "Everything in Team",
      "Designated support manager",
      "Uptime SLAs",
      "BYO Cloud supported",
      "24/7 premium support",
      "Private Slack channel",
      "Custom security questionnaires",
      "Custom contract & invoicing",
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
    category: "Database",
    features: [
      { name: "Dedicated Postgres", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Unlimited API requests", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Database size", starter: "500 MB", pro: "8 GB", team: "8 GB", enterprise: "Custom" },
      { name: "Automatic backups", starter: "-", pro: "7 days", team: "14 days", enterprise: "Custom" },
      { name: "Point-in-time recovery", starter: "-", pro: "$100/mo", team: "$100/mo", enterprise: "$100/mo" },
      { name: "Egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
      { name: "Branching", starter: "-", pro: "$0.013/hr", team: "$0.013/hr", enterprise: "Custom" },
      { name: "Pipelines", starter: "-", pro: "$0.053/hr", team: "$0.053/hr", enterprise: "Custom" },
    ],
  },
  {
    category: "Auth",
    features: [
      { name: "Monthly active users", starter: "50,000", pro: "100,000", team: "100,000", enterprise: "Custom" },
      { name: "Social OAuth providers", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Custom SMTP", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Multi-Factor Auth", starter: "Basic", pro: "Advanced ($75/mo)", team: "Advanced ($75/mo)", enterprise: "Custom" },
      { name: "Single Sign-On (SAML)", starter: "-", pro: "50 included", team: "50 included", enterprise: "Contact Us" },
      { name: "Auth audit logs", starter: "1 hour", pro: "7 days", team: "28 days", enterprise: "Included" },
      { name: "Leaked password protection", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Session timeouts", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Auth hooks", starter: "JWT + Email", pro: "JWT + Email", team: "All", enterprise: "All" },
    ],
  },
  {
    category: "Storage",
    features: [
      { name: "File storage", starter: "1 GB", pro: "100 GB", team: "100 GB", enterprise: "Custom" },
      { name: "Max file upload", starter: "50 MB", pro: "500 GB", team: "500 GB", enterprise: "Custom" },
      { name: "CDN", starter: "Basic CDN", pro: "Smart CDN", team: "Smart CDN", enterprise: "Smart CDN" },
      { name: "Image transformations", starter: "-", pro: "100 free", team: "100 free", enterprise: "Custom" },
      { name: "Cached egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
    ],
  },
  {
    category: "Edge Functions & Realtime",
    features: [
      { name: "Edge function invocations", starter: "500k", pro: "2 Million", team: "2 Million", enterprise: "Custom" },
      { name: "Realtime connections", starter: "200", pro: "500", team: "500", enterprise: "Custom" },
      { name: "Realtime messages", starter: "2 Million", pro: "5 Million", team: "5 Million", enterprise: "Custom" },
      { name: "Max message size", starter: "256 KB", pro: "3 MB", team: "3 MB", enterprise: "Custom" },
    ],
  },
  {
    category: "Platform & Security",
    features: [
      { name: "Team members", starter: "Unlimited", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "SOC2", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "ISO 27001", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "HIPAA", starter: "-", pro: "-", team: "Add-on", enterprise: "Add-on" },
      { name: "SSO", starter: "-", pro: "-", team: "Contact Us", enterprise: "Contact Us" },
      { name: "Log retention", starter: "1 day", pro: "7 days", team: "28 days", enterprise: "90 days" },
      { name: "Uptime SLAs", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Platform audit logs", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Custom access roles", starter: "-", pro: "-", team: "Included", enterprise: "Custom" },
      { name: "AWS PrivateLink", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Projects paused after inactivity", starter: "1 week", pro: "Never", team: "Never", enterprise: "Never" },
      { name: "Active project limit", starter: "2", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Community support", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email support", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email SLA", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Designated support", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "24/7 premium support", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Private Slack channel", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Security questionnaire help", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
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
  { id: "inv_001", date: "Aug 1, 2026", description: "Pro Plan - Monthly", amount: 235, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Pro Plan - Monthly", amount: 235, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Starter Plan - Monthly", amount: 75, status: "paid" },
  { id: "inv_004", date: "May 1, 2026", description: "Starter Plan - Monthly", amount: 75, status: "paid" },
];
