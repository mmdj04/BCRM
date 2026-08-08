export type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
};

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to BCRM",
    description: "Your account has been created successfully. Start exploring the dashboard.",
    date: "2026-08-01",
    read: true,
    type: "success",
  },
  {
    id: "2",
    title: "New feature: File Manager",
    description: "We've added a new File Manager to help you manage your files more efficiently.",
    date: "2026-08-03",
    read: true,
    type: "info",
  },
  {
    id: "3",
    title: "Security alert: New login detected",
    description: "A new login was detected from Chrome on Linux. If this wasn't you, please change your password.",
    date: "2026-08-05",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Billing: Invoice ready",
    description: "Your monthly invoice for August 2026 is now available. View and download it from the Billing page.",
    date: "2026-08-08",
    read: false,
    type: "info",
  },
  {
    id: "5",
    title: "System maintenance scheduled",
    description: "Scheduled maintenance on August 15, 2026 from 2:00 AM to 4:00 AM UTC. Expect brief downtime.",
    date: "2026-08-08",
    read: false,
    type: "warning",
  },
];
