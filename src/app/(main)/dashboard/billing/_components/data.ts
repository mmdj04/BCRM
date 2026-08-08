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
  supabaseCost: number;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams getting started with essential features.",
    monthlyPrice: 134.99,
    yearlyPrice: 1295.9,
    cta: "Get Started",
    supabaseCost: 25,
    features: [
      "5 active projects",
      "50,000 monthly active users",
      "2 GB database per project",
      "50 GB bandwidth",
      "25 GB file storage",
      "Email support",
      "Weekly backups (7 days)",
      "Custom SMTP server",
      "Basic MFA",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For production apps and growing teams.",
    monthlyPrice: 349.99,
    yearlyPrice: 3359.9,
    badge: "Popular",
    highlighted: true,
    cta: "Start Free Trial",
    supabaseCost: 25,
    features: [
      "Unlimited projects",
      "100,000 monthly active users",
      "8 GB database per project",
      "250 GB bandwidth",
      "100 GB file storage",
      "Priority email support",
      "Daily backups (14 days)",
      "Custom SMTP server",
      "SSO for dashboard",
      "Advanced MFA",
      "7-day log retention",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For teams that need security and compliance.",
    monthlyPrice: 899.99,
    yearlyPrice: 8639.9,
    cta: "Start Free Trial",
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
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs.",
    monthlyPrice: null,
    yearlyPrice: null,
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
      { name: "Database size", starter: "2 GB", pro: "8 GB", team: "8 GB", enterprise: "Custom" },
      { name: "Automatic backups", starter: "7 days", pro: "14 days", team: "14 days", enterprise: "Custom" },
      { name: "Point-in-time recovery", starter: "-", pro: "$100/mo", team: "$100/mo", enterprise: "$100/mo" },
      { name: "Egress", starter: "50 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
      { name: "Branching", starter: "-", pro: "$0.013/hr", team: "$0.013/hr", enterprise: "Custom" },
    ],
  },
  {
    category: "Auth",
    features: [
      { name: "Monthly active users", starter: "50,000", pro: "100,000", team: "100,000", enterprise: "Custom" },
      { name: "Social OAuth providers", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Custom SMTP", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Multi-Factor Auth", starter: "Basic", pro: "Advanced", team: "Advanced", enterprise: "Advanced" },
      { name: "Single Sign-On (SAML)", starter: "-", pro: "50 included", team: "50 included", enterprise: "Contact Us" },
      { name: "Auth audit logs", starter: "1 hour", pro: "7 days", team: "28 days", enterprise: "Included" },
      { name: "Leaked password protection", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Session timeouts", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
    ],
  },
  {
    category: "Storage",
    features: [
      { name: "File storage", starter: "25 GB", pro: "100 GB", team: "100 GB", enterprise: "Custom" },
      { name: "Max file upload", starter: "50 MB", pro: "500 GB", team: "500 GB", enterprise: "Custom" },
      { name: "CDN", starter: "Basic", pro: "Smart CDN", team: "Smart CDN", enterprise: "Smart CDN" },
      { name: "Image transformations", starter: "-", pro: "100 free", team: "100 free", enterprise: "Custom" },
      { name: "Cached egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
    ],
  },
  {
    category: "Platform & Security",
    features: [
      { name: "Team members", starter: "10", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "SOC2", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "ISO 27001", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "HIPAA", starter: "-", pro: "-", team: "Add-on", enterprise: "Add-on" },
      { name: "SSO", starter: "-", pro: "-", team: "Contact Us", enterprise: "Contact Us" },
      { name: "Log retention", starter: "3 days", pro: "7 days", team: "28 days", enterprise: "90 days" },
      { name: "Uptime SLAs", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Platform audit logs", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Custom access roles", starter: "-", pro: "-", team: "Included", enterprise: "Custom" },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Community support", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email support", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email SLA", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Designated support", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "24/7 premium support", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Private Slack channel", starter: "-", pro: "-", team: "-", enterprise: "Included" },
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
  { id: "inv_001", date: "Aug 1, 2026", description: "Pro Plan - Monthly", amount: 349.99, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Pro Plan - Monthly", amount: 349.99, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Starter Plan - Monthly", amount: 134.99, status: "paid" },
  { id: "inv_004", date: "May 1, 2026", description: "Starter Plan - Monthly", amount: 134.99, status: "paid" },
];
