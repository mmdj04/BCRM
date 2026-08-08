export type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals and small teams getting started.",
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: ["Up to 5 team members", "10 GB storage", "Basic analytics", "Email support", "API access"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams that need more power and flexibility.",
    monthlyPrice: 49,
    yearlyPrice: 490,
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Up to 25 team members",
      "100 GB storage",
      "Advanced analytics & reports",
      "Priority support",
      "Custom integrations",
      "Role-based access control",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced requirements.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Unlimited team members",
      "1 TB storage",
      "Real-time analytics & dashboards",
      "Dedicated account manager",
      "SSO & SAML authentication",
      "Custom SLA & uptime guarantee",
      "Audit logs & compliance",
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
  {
    id: "inv_001",
    date: "Aug 1, 2026",
    description: "Pro Plan - Monthly",
    amount: 49,
    status: "paid",
  },
  {
    id: "inv_002",
    date: "Jul 1, 2026",
    description: "Pro Plan - Monthly",
    amount: 49,
    status: "paid",
  },
  {
    id: "inv_003",
    date: "Jun 1, 2026",
    description: "Pro Plan - Monthly",
    amount: 49,
    status: "paid",
  },
  {
    id: "inv_004",
    date: "May 1, 2026",
    description: "Starter Plan - Monthly",
    amount: 19,
    status: "paid",
  },
  {
    id: "inv_005",
    date: "Apr 1, 2026",
    description: "Starter Plan - Monthly",
    amount: 19,
    status: "paid",
  },
];
