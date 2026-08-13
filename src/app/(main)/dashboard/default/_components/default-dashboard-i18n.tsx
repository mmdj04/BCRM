"use client";

import * as React from "react";

import { useI18n } from "@/lib/i18n/provider";

import { defaultDashboardTranslations } from "./default-dashboard-translations";

const shortMonthTranslations: Record<string, keyof typeof defaultDashboardTranslations["pt-BR"]> = {
  Jan: "Jan",
  Feb: "Feb",
  Mar: "Mar",
  Apr: "Apr",
  May: "MayShort",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Aug",
  Sep: "Sep",
  Oct: "Oct",
  Nov: "Nov",
  Dec: "Dec",
};

function translateValue(value: string, locale: "pt-BR" | "en-US", translations: Record<string, string>) {
  if (locale === "en-US") return value;

  const exact = translations[value];
  if (exact) return exact;

  const selectedRows = value.match(/^(\d+) of (\d+) row\(s\) selected\.$/);
  if (selectedRows) {
    return `${selectedRows[1]} de ${selectedRows[2]} linha(s) selecionada(s).`;
  }

  const page = value.match(/^Page (\d+) of (\d+)$/);
  if (page) {
    return `Página ${page[1]} de ${page[2]}`;
  }

  const selectedCustomer = value.match(/^Select (.+)$/);
  if (selectedCustomer) {
    return `Selecionar ${selectedCustomer[1]}`;
  }

  const dateWithTime = value.match(/^at (\d{1,2}:\d{2} (?:AM|PM))$/);
  if (dateWithTime) {
    return `às ${dateWithTime[1]}`;
  }

  return value.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, (month) =>
    translations[shortMonthTranslations[month]],
  ).replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (month) =>
    translations[month],
  );
}

function translateNode(node: Node, locale: "pt-BR" | "en-US", translations: Record<string, string>) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    const next = translateValue(text, locale, translations);
    if (next !== text) node.textContent = next;
    return;
  }

  if (node instanceof Element) {
    for (const attribute of ["aria-label", "title", "placeholder"]) {
      const value = node.getAttribute(attribute);
      if (!value) continue;
      const next = translateValue(value, locale, translations);
      if (next !== value) node.setAttribute(attribute, next);
    }
  }
}

export function DefaultDashboardI18n({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  const translations = defaultDashboardTranslations[locale];

  React.useEffect(() => {
    const root = document.getElementById("default-dashboard");
    if (!root) return;

    const translate = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      let node: Node | null = walker.currentNode;

      while (node) {
        translateNode(node, locale, translations);
        node = walker.nextNode();
      }
    };

    translate();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== "childList") continue;
        mutation.addedNodes.forEach((addedNode) => {
          translateNode(addedNode, locale, translations);
          if (addedNode instanceof Element) {
            const walker = document.createTreeWalker(addedNode, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
            let node: Node | null = walker.currentNode;
            while (node) {
              translateNode(node, locale, translations);
              node = walker.nextNode();
            }
          }
        });
      }
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale, translations]);

  return <div id="default-dashboard" key={locale}>{children}</div>;
}
