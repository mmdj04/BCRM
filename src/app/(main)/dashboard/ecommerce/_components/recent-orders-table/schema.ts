export const orderFilters = ["Todos", "Necessita ação", "Não Atendido", "Não pago", "Devoluções"] as const;

export type OrderFilter = (typeof orderFilters)[number];

export type OrderRow = {
  id: string;
  date: string;
  customer: string;
  payment: "Paid" | "Pending" | "Refunded";
  total: string;
  items: string;
  fulfillment: "Fulfilled" | "Returned" | "Unfulfilled";
};
