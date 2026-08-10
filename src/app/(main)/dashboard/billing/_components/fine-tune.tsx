"use client";

import { Check } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { ComputeOption } from "./data";

type FineTuneProps = {
  options: ComputeOption[];
};

export function FineTune({ options }: FineTuneProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tabela de Compute</CardTitle>
        <CardDescription>
          Referência das opções de compute disponíveis. Todos os projetos rodam em uma instância de computação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
                return (
                  <TableRow key={option.id} className="transition-colors hover:bg-muted/50">
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
      </CardContent>
    </Card>
  );
}
