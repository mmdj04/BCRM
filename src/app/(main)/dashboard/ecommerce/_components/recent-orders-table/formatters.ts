import type React from "react";

import type { OrderFilter } from "./schema";

export function formatOrderCount(filter: OrderFilter, count: number) {
  const orderLabel = count === 1 ? "pedido" : "pedidos";

  if (filter === "Todos") {
    return `${count.toLocaleString()} ${orderLabel}`;
  }

  if (filter === "Necessita ação") {
    return `${count.toLocaleString()} ${orderLabel} necessitam ação`;
  }

  if (filter === "Devoluções") {
    return `${count.toLocaleString()} ${count === 1 ? "devolução" : "devoluções"}`;
  }

  return `${count.toLocaleString()} ${filter.toLowerCase()} ${orderLabel}`;
}

export function formatSelectedOrderCount(count: number) {
  const orderLabel = count === 1 ? "pedido" : "pedidos";

  return `${count.toLocaleString()} ${orderLabel} selecionado`;
}

export function preventPaginationNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}
