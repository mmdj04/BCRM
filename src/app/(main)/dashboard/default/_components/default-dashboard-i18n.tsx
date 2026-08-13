"use client";

import * as React from "react";

import { useI18n } from "@/lib/i18n/provider";

const USD_TO_BRL = 5.2028;

const PT_TRANSLATIONS: Record<string, string> = {
  "Customer Activity": "Atividade dos clientes",
  "Customer activity for the last 3 months": "Atividade dos clientes nos últimos 3 meses",
  "Last 3 months": "Últimos 3 meses",
  Period: "Período",
  "3 months": "3 meses",
  Segments: "Segmentos",
  "All segments": "Todos os segmentos",
  Paid: "Pagos",
  Organic: "Orgânico",
  "View report": "Ver relatório",
  "18,426 Customers": "18.426 clientes",
  "Recent customer records with plan, billing, status, and signup activity.": "Registros recentes de clientes com plano, cobrança, status e atividade de cadastro.",
  Export: "Exportar",
  Customer: "Cliente",
  Status: "Status",
  Billing: "Cobrança",
  Plan: "Plano",
  Joined: "Cadastro",
  "Search customers...": "Pesquisar clientes...",
  All: "Todos",
  Subscribed: "Inscrito",
  Inactive: "Inativo",
  Unsubscribed: "Não inscrito",
  Pending: "Pendente",
  Overdue: "Em atraso",
  Trial: "Período de teste",
  "Joined date": "Data de cadastro",
  "All time": "Todo o período",
  "Last 30 days": "Últimos 30 dias",
  "Last 90 days": "Últimos 90 dias",
  Sort: "Ordenar",
  "Newest first": "Mais recentes primeiro",
  "Oldest first": "Mais antigos primeiro",
  "Name A-Z": "Nome A-Z",
  "Name Z-A": "Nome Z-A",
  "No results.": "Nenhum resultado.",
  "Rows per page": "Linhas por página",
  Page: "Página",
  "Go to first page": "Ir para a primeira página",
  "Go to previous page": "Ir para a página anterior",
  "Go to next page": "Ir para a próxima página",
  "Go to last page": "Ir para a última página",
  "Returning Users": "Usuários recorrentes",
  "New Customers": "Novos clientes",
  "Active Accounts": "Contas ativas",
  "Total Revenue": "Receita total",
  "Visitors for the last 6 months": "Visitantes nos últimos 6 meses",
  "Acquisition needs attention": "A aquisição precisa de atenção",
  "Engagement exceeds targets": "O engajamento supera as metas",
  "Growth Rate": "Taxa de crescimento",
  "Meets growth projections": "Dentro das projeções de crescimento",
  "Select all customers on this page": "Selecionar todos os clientes desta página",
};

const MONTHS_PT = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const MONTHS_SHORT_PT = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
const MONTH_LOOKUP: Record<string, number> = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7, sep: 8,
  sept: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
};

function formatUsdAsBrl(value: string) {
  const numeric = Number.parseFloat(value.replaceAll(",", ""));
  if (!Number.isFinite(numeric)) return value;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numeric * USD_TO_BRL);
}

function formatEnglishDate(value: string) {
  const ordinal = value.match(/^(\d+)(st|nd|rd|th)\s+([A-Za-z]+)\s+(\d{4})$/);
  const long = value.match(/^(\d+)\s+([A-Za-z]+)\s+(\d{4})$/);
  const us = value.match(/^([A-Za-z]+)\s+(\d+),\s+(\d{4})$/);
  const short = value.match(/^([A-Za-z]{3})\s+(\d{1,2})$/);
  const match = ordinal ?? long ?? us;
  if (match) {
    const [, a, b, c] = match;
    const day = ordinal || long ? Number(a) : Number(b);
    const monthName = ordinal || long ? b : a;
    const year = Number(c);
    const month = MONTH_LOOKUP[monthName.toLowerCase()];
    if (month !== undefined) return `${day} de ${MONTHS_PT[month]} de ${year}`;
  }
  if (short) {
    const month = MONTH_LOOKUP[short[1].toLowerCase()];
    if (month !== undefined) return `${Number(short[2])} de ${MONTHS_SHORT_PT[month]}`;
  }
  return value;
}

function formatEnglishTime(value: string) {
  const match = value.match(/^(?:at\s+)?(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return value;
  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return `às ${String(hours).padStart(2, "0")}:${minutes}`;
}

function translateText(source: string, locale: string) {
  if (locale !== "pt-BR") return source;
  let value = source;
  const currency = value.match(/\$(\d[\d,]*\.\d{2})/);
  if (currency) value = value.replace(currency[0], formatUsdAsBrl(currency[1]));
  value = formatEnglishTime(value);
  value = formatEnglishDate(value);
  for (const [from, to] of Object.entries(PT_TRANSLATIONS)) value = value.replaceAll(from, to);
  return value;
}

export function DefaultDashboardI18n({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  React.useEffect(() => {
    const originalTexts = new WeakMap<Text, string>();
    const originalAttributes = new WeakMap<Element, Map<string, string>>();

    const apply = (root: ParentNode) => {
      const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let textNode: Node | null = textWalker.nextNode();
      while (textNode) {
        const text = textNode as Text;
        if (!originalTexts.has(text)) originalTexts.set(text, text.textContent ?? "");
        text.textContent = translateText(originalTexts.get(text) ?? "", locale);
        textNode = textWalker.nextNode();
      }

      const elements = root instanceof Element || root instanceof Document ? root.querySelectorAll("*") : [];
      elements.forEach((element) => {
        const attrs = originalAttributes.get(element) ?? new Map<string, string>();
        for (const name of ["aria-label", "title", "placeholder"]) {
          const value = element.getAttribute(name);
          if (value !== null && !attrs.has(name)) attrs.set(name, value);
          const original = attrs.get(name);
          if (original !== undefined) element.setAttribute(name, translateText(original, locale));
        }
        originalAttributes.set(element, attrs);
      });
    };

    apply(document.body);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node as Text;
            originalTexts.set(text, text.textContent ?? "");
            text.textContent = translateText(text.textContent ?? "", locale);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            apply(node as Element);
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  return <>{children}</>;
}
