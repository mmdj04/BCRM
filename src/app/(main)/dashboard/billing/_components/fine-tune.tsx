"use client";

import { Check } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { ComputeOption } from "./data";

type FineTuneProps = {
  options: ComputeOption[];
  selectedCompute?: string;
  onSelectCompute?: (id: string) => void;
};

export function FineTune({ options, selectedCompute, onSelectCompute }: FineTuneProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Como funciona o pricing do Compute</CardTitle>
        <CardDescription>
          Todos os projetos rodam em uma instância de computação. Cada compute adicionado ao seu plano é cobrado
          mensalmente. Selecione o compute ideal para o seu projeto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8" />
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-right">R$/mês</TableHead>
                <TableHead>CPU</TableHead>
                <TableHead>Dedicado</TableHead>
                <TableHead>RAM</TableHead>
                <TableHead className="text-right">Conex. Diretas</TableHead>
                <TableHead className="text-right">Conex. Pooler</TableHead>
                <TableHead className="hidden min-w-[280px] lg:table-cell">Benefícios</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {options.map((option) => {
                const isSelected = selectedCompute === option.id;
                return (
                  <TableRow
                    key={option.id}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                    }`}
                    onClick={() => onSelectCompute?.(option.id)}
                  >
                    <TableCell className="w-8 pr-0">
                      <div
                        className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && <Check className="size-3" />}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{option.size}</TableCell>
                    <TableCell className="text-right font-medium">R$ {option.price.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{option.cpu}</TableCell>
                    <TableCell>{option.dedicated ? "Sim" : "Não"}</TableCell>
                    <TableCell>{option.ram}</TableCell>
                    <TableCell className="text-right">{option.directConnections}</TableCell>
                    <TableCell className="text-right">{option.poolerConnections.toLocaleString()}</TableCell>
                    <TableCell className="hidden min-w-[280px] lg:table-cell">
                      <ul className="flex flex-col gap-0.5">
                        {option.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-1 text-muted-foreground text-xs">
                            <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile benefits (shown below table on small screens) */}
        {selectedCompute && (
          <div className="mt-4 lg:hidden">
            {options
              .filter((o) => o.id === selectedCompute)
              .map((option) => (
                <div key={option.id} className="rounded-lg border bg-muted/30 p-3">
                  <p className="mb-2 font-medium text-sm">Benefícios — {option.size}</p>
                  <ul className="flex flex-col gap-1">
                    {option.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                        <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
