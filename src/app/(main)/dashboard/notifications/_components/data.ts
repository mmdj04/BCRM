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
    title: "Bem-vindo ao BCRM",
    description: "Sua conta foi criada com sucesso. Comece a explorar o painel.",
    date: "2026-08-01",
    read: true,
    type: "success",
  },
  {
    id: "2",
    title: "Novo recurso: Gerenciador de Arquivos",
    description: "Adicionamos um novo Gerenciador de Arquivos para ajudá-lo a gerenciar seus arquivos de forma mais eficiente.",
    date: "2026-08-03",
    read: true,
    type: "info",
  },
  {
    id: "3",
    title: "Alerta de segurança: Novo login detectado",
    description: "Um novo login foi detectado no Chrome no Linux. Se não foi você, altere sua senha.",
    date: "2026-08-05",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Faturamento: Fatura pronta",
    description: "Sua fatura mensal de agosto de 2026 está disponível. Visualize e baixe pela página de Faturamento.",
    date: "2026-08-08",
    read: false,
    type: "info",
  },
  {
    id: "5",
    title: "Manutenção do sistema agendada",
    description: "Manutenção programada para 15 de agosto de 2026, das 2:00 às 4:00 UTC. Haverá uma breve interrupção.",
    date: "2026-08-08",
    read: false,
    type: "warning",
  },
];
