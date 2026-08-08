"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { FeatureCategory } from "./data";

type FeatureComparisonProps = {
  categories: FeatureCategory[];
};

export function FeatureComparison({ categories }: FeatureComparisonProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set([categories[0]?.category]));

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comparação de Recursos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        {categories.map((cat) => (
          <Collapsible
            key={cat.category}
            open={openCategories.has(cat.category)}
            onOpenChange={() => toggleCategory(cat.category)}
          >
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="hover:bg-muted/50 flex w-full items-center justify-between border-b px-6 py-3 text-left text-sm font-medium transition-colors"
              >
                {cat.category}
                <ChevronDown
                  className={`text-muted-foreground size-4 transition-transform ${openCategories.has(cat.category) ? "rotate-180" : ""}`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-4">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[200px]">Recurso</TableHead>
                    <TableHead className="text-center">Starter</TableHead>
                    <TableHead className="text-center">Pro</TableHead>
                    <TableHead className="text-center">Team</TableHead>
                    <TableHead className="text-center">Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cat.features.map((feature) => (
                    <TableRow key={feature.name}>
                      <TableCell className="text-muted-foreground">{feature.name}</TableCell>
                      <TableCell className="text-center text-sm">{feature.starter}</TableCell>
                      <TableCell className="text-center text-sm">{feature.pro}</TableCell>
                      <TableCell className="text-center text-sm">{feature.team}</TableCell>
                      <TableCell className="text-center text-sm">{feature.enterprise}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        <div className="flex justify-center border-t px-6 py-4">
          <Button variant="outline">Comparar todos os recursos em detalhes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
