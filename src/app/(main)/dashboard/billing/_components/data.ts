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
      { name: "Dedicated Postgres Database", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Unlimited API requests", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Database size", starter: "500 MB", pro: "8 GB", team: "8 GB", enterprise: "Custom" },
      { name: "Advanced disk config", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Automatic backups", starter: "-", pro: "7 days", team: "14 days", enterprise: "Custom" },
      { name: "Point-in-time recovery", starter: "-", pro: "$100/mo per 7 days", team: "$100/mo per 7 days", enterprise: "$100/mo per 7 days" },
      { name: "Pausing", starter: "After 1 week", pro: "Never", team: "Never", enterprise: "Never" },
      { name: "Branching", starter: "-", pro: "$0.01344/hr", team: "$0.01344/hr", enterprise: "Custom" },
      { name: "Egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
      { name: "Pipelines", starter: "-", pro: "$0.053/hr + $3/GB", team: "$0.053/hr + $3/GB", enterprise: "Custom" },
    ],
  },
  {
    category: "Auth",
    features: [
      { name: "Monthly active users (MAUs)", starter: "50,000", pro: "100,000", team: "100,000", enterprise: "Custom" },
      { name: "User data ownership", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Anonymous Sign-ins", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Social OAuth providers", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Custom SMTP server", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Remove Supabase branding", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Auth audit logs", starter: "1 hour", pro: "7 days", team: "28 days", enterprise: "Included" },
      { name: "Basic Multi-Factor Auth", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Advanced MFA (Phone)", starter: "-", pro: "$75/mo first project", team: "$75/mo first project", enterprise: "Custom" },
      { name: "Third-Party MAUs", starter: "50,000", pro: "100,000", team: "100,000", enterprise: "Custom" },
      { name: "Single Sign-On (SAML 2.0)", starter: "-", pro: "50 included", team: "50 included", enterprise: "Contact Us" },
      { name: "Leaked password protection", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Single session per user", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Session timeouts", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Auth Hooks", starter: "JWT + Email/SMS", pro: "JWT + Email/SMS", team: "All", enterprise: "All" },
    ],
  },
  {
    category: "Storage",
    features: [
      { name: "File storage", starter: "1 GB", pro: "100 GB", team: "100 GB", enterprise: "Custom" },
      { name: "Cached Egress", starter: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
      { name: "Custom access controls", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Max file upload size", starter: "50 MB", pro: "500 GB", team: "500 GB", enterprise: "Custom" },
      { name: "Content Delivery Network", starter: "Basic CDN", pro: "Smart CDN", team: "Smart CDN", enterprise: "Smart CDN" },
      { name: "Image transformations", starter: "-", pro: "100 free", team: "100 free", enterprise: "Custom" },
    ],
  },
  {
    category: "Edge Functions",
    features: [
      { name: "Invocations", starter: "500,000", pro: "2 Million", team: "2 Million", enterprise: "Custom" },
    ],
  },
  {
    category: "Realtime",
    features: [
      { name: "Postgres Changes", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Concurrent Peak Connections", starter: "200", pro: "500", team: "500", enterprise: "Custom" },
      { name: "Messages Per Month", starter: "2 Million", pro: "5 Million", team: "5 Million", enterprise: "Custom" },
      { name: "Max Message Size", starter: "256 KB", pro: "3 MB", team: "3 MB", enterprise: "Custom" },
    ],
  },
  {
    category: "Dashboard",
    features: [
      { name: "Team members", starter: "Unlimited", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Platform & Security",
    features: [
      { name: "BYO cloud", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Log retention (API & Database)", starter: "1 day", pro: "7 days", team: "28 days", enterprise: "90 days" },
      { name: "Log Drain", starter: "-", pro: "$60/drain/mo", team: "$60/drain/mo", enterprise: "Custom" },
      { name: "Platform Audit Logs", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Metrics endpoint", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "SOC2", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "ISO 27001", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "HIPAA", starter: "-", pro: "-", team: "Add-on", enterprise: "Add-on" },
      { name: "AWS PrivateLink", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "SSO", starter: "-", pro: "-", team: "Contact Us", enterprise: "Contact Us" },
      { name: "Uptime SLAs", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Access Roles", starter: "Owner, Admin, Dev", pro: "Owner, Admin, Dev", team: "Owner, Admin, Dev, Read-only", enterprise: "Custom" },
      { name: "Vanity URLs", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Custom Domains", starter: "-", pro: "$10/domain/mo", team: "$10/domain/mo", enterprise: "1 included" },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Community Support", starter: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email Support", starter: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email Support SLA", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Designated support", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "On Boarding Support", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Designated Customer Success Team", starter: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Security Questionnaire Help", starter: "-", pro: "-", team: "Included", enterprise: "Included" },
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
