"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";
import Markdown from "react-markdown";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { ChangelogIcon, type getChangelogTypeFromContent } from "./changelog-icon";

type ChangelogEntryType = "feature" | "fix" | "maintenance";

type ChangelogEntry = {
  version: string;
  date: string;
  content: string;
  type: ChangelogEntryType;
};

type ChangelogListProps = {
  entries: ChangelogEntry[];
};

const typeLabels: Record<ChangelogEntryType, string> = {
  feature: "Funcionalidade",
  fix: "Correção",
  maintenance: "Manutenção",
};

export function ChangelogList({ entries }: ChangelogListProps) {
  const [openEntries, setOpenEntries] = useState<Set<string>>(new Set([entries[0]?.version]));

  const toggleEntry = (version: string) => {
    setOpenEntries((prev) => {
      const next = new Set(prev);
      if (next.has(version)) {
        next.delete(version);
      } else {
        next.add(version);
      }
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Registro de Alterações</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        {entries.map((entry) => (
          <Collapsible
            key={entry.version}
            open={openEntries.has(entry.version)}
            onOpenChange={() => toggleEntry(entry.version)}
          >
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between border-b px-6 py-4 text-left font-medium text-sm transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-2.5">
                  <ChangelogIcon type={entry.type} />
                  <span className="font-bold font-mono">{entry.version}</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                    {typeLabels[entry.type]}
                  </span>
                  <span className="text-muted-foreground text-xs">{entry.date}</span>
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${openEntries.has(entry.version) ? "rotate-180" : ""}`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pt-2 pb-6 text-muted-foreground text-sm">
                <Markdown
                  components={{
                    h3: ({ children }) => <h3 className="mt-4 mb-2 font-semibold text-foreground">{children}</h3>,
                    ul: ({ children }) => <ul className="ml-4 list-disc space-y-1">{children}</ul>,
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  }}
                >
                  {entry.content}
                </Markdown>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}
