"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function IncomeReliability() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confiabilidade da Receita</CardTitle>
        <CardDescription>Como sua receita tem sido consistente recentemente.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-0.5">
          <p className="font-medium text-xl">Alta Confiabilidade</p>
          <p className="text-muted-foreground text-xs">Baseado nos últimos 6 meses de receita</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">Receita Fixa</p>
            <p className="text-muted-foreground text-xs">Recorrente · Prevísvel</p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(90000, { noDecimals: true })}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">Receita Variável</p>
            <p className="text-muted-foreground text-xs">Fontes flutuantes</p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(46500, { noDecimals: true })}</p>
        </div>
        <Separator />
        <p className="text-muted-foreground text-xs">
          Tendência de consistência: <span className="font-medium text-primary">Estável</span>
        </p>
      </CardContent>
    </Card>
  );
}
