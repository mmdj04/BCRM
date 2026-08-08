"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import type { FaqItem } from "./data";

type FaqProps = {
  items: FaqItem[];
};

export function Faq({ items }: FaqProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Perguntas Frequentes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        {items.map((item, index) => (
          <Collapsible key={item.question} open={openItems.has(index)} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between border-b px-6 py-4 text-left font-medium text-sm transition-colors hover:bg-muted/50"
              >
                {item.question}
                <ChevronDown
                  className={`size-4 shrink-0 text-muted-foreground transition-transform ${openItems.has(index) ? "rotate-180" : ""}`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pt-2 pb-6 text-muted-foreground text-sm">{item.answer}</div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}
