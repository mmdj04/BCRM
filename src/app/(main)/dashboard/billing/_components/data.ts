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
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For hobby projects and exploration.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Get Started",
    features: [
      "2 active projects",
      "50,000 monthly active users",
      "500 MB database",
      "5 GB bandwidth",
      "1 GB file storage",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For production apps and growing teams.",
    monthlyPrice: 25,
    yearlyPrice: 240,
    badge: "Popular",
    highlighted: true,
    cta: "Start Free Trial",
    features: [
      "Unlimited projects",
      "100,000 monthly active users",
      "8 GB database per project",
      "250 GB bandwidth",
      "100 GB file storage",
      "Email support",
      "Daily backups (7 days)",
      "Custom SMTP server",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For teams that need security and compliance.",
    monthlyPrice: 599,
    yearlyPrice: 5990,
    cta: "Start Free Trial",
    features: [
      "Everything in Pro",
      "SOC2 & ISO 27001",
      "HIPAA compliance (add-on)",
      "SSO for dashboard",
      "Priority email support & SLAs",
      "14-day backups",
      "28-day log retention",
      "Read-only project access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs.",
    monthlyPrice: null,
    yearlyPrice: null,
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
    free: string;
    pro: string;
    team: string;
    enterprise: string;
  }[];
};

export const featureComparison: FeatureCategory[] = [
  {
    category: "Database",
    features: [
      { name: "Dedicated Postgres", free: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Database size", free: "500 MB", pro: "8 GB", team: "8 GB", enterprise: "Custom" },
      { name: "Automatic backups", free: "-", pro: "7 days", team: "14 days", enterprise: "Custom" },
      { name: "Point-in-time recovery", free: "-", pro: "$100/mo", team: "$100/mo", enterprise: "$100/mo" },
      { name: "Egress", free: "5 GB", pro: "250 GB", team: "250 GB", enterprise: "Custom" },
      { name: "Branching", free: "-", pro: "$0.013/hr", team: "$0.013/hr", enterprise: "Custom" },
    ],
  },
  {
    category: "Auth",
    features: [
      { name: "Monthly active users", free: "50,000", pro: "100,000", team: "100,000", enterprise: "Custom" },
      { name: "Social OAuth providers", free: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Custom SMTP", free: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Multi-Factor Auth", free: "Basic", pro: "Basic", team: "Basic", enterprise: "Advanced" },
      { name: "Single Sign-On (SAML)", free: "-", pro: "50 included", team: "50 included", enterprise: "Contact Us" },
      { name: "Auth audit logs", free: "1 hour", pro: "7 days", team: "28 days", enterprise: "Included" },
    ],
  },
  {
    category: "Storage",
    features: [
      { name: "File storage", free: "1 GB", pro: "100 GB", team: "100 GB", enterprise: "Custom" },
      { name: "Max file upload", free: "50 MB", pro: "500 GB", team: "500 GB", enterprise: "Custom" },
      { name: "CDN", free: "Basic", pro: "Smart CDN", team: "Smart CDN", enterprise: "Smart CDN" },
      { name: "Image transformations", free: "-", pro: "100 free", team: "100 free", enterprise: "Custom" },
    ],
  },
  {
    category: "Platform & Security",
    features: [
      { name: "Team members", free: "Unlimited", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "SOC2", free: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "ISO 27001", free: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "HIPAA", free: "-", pro: "-", team: "Add-on", enterprise: "Add-on" },
      { name: "SSO", free: "-", pro: "-", team: "Contact Us", enterprise: "Contact Us" },
      { name: "Log retention", free: "1 day", pro: "7 days", team: "28 days", enterprise: "90 days" },
      { name: "Uptime SLAs", free: "-", pro: "-", team: "-", enterprise: "Included" },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Community support", free: "Included", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email support", free: "-", pro: "Included", team: "Included", enterprise: "Included" },
      { name: "Email SLA", free: "-", pro: "-", team: "Included", enterprise: "Included" },
      { name: "Designated support", free: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "24/7 premium support", free: "-", pro: "-", team: "-", enterprise: "Included" },
      { name: "Private Slack channel", free: "-", pro: "-", team: "-", enterprise: "Included" },
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
  { id: "inv_001", date: "Aug 1, 2026", description: "Pro Plan - Monthly", amount: 25, status: "paid" },
  { id: "inv_002", date: "Jul 1, 2026", description: "Pro Plan - Monthly", amount: 25, status: "paid" },
  { id: "inv_003", date: "Jun 1, 2026", description: "Pro Plan - Monthly", amount: 25, status: "paid" },
  { id: "inv_004", date: "May 1, 2026", description: "Free Plan", amount: 0, status: "paid" },
];
