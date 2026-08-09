import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DriversCoverageTriage() {
  const leverOptions = [
    {
      key: "deal",
      label: "+1 negócio enterprise",
      value: "+R$ 72.133 ponderado",
      context: "32% do gap",
    },
    {
      key: "conversion",
      label: "+5pp conversão",
      value: "+R$ 49.182/mês",
      context: "22% do gap",
    },
    {
      key: "cycle",
      label: "-4d ciclo",
      value: "+R$ 90.167/dia",
      context: "40% do gap",
    },
  ] as const;

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>Triagem de Cobertura</CardTitle>
        <CardDescription>Escada de decisão para este ciclo de previsão</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="destructive" className="rounded-md font-medium">
            Em Risco
          </Badge>
          <Badge variant="outline" className="font-medium tabular-nums">
            1.9x / 3.0x
          </Badge>
          <Badge variant="outline" className="font-medium tabular-nums">
            Gap R$ 222.930
          </Badge>
          <Badge variant="outline" className="font-medium tabular-nums">
            4 negócios • Previsão 10d
          </Badge>
        </div>

        <p className="text-muted-foreground text-xs">
          Cobertura abaixo da meta. Priorize volume qualificado e tempo de ciclo menor.
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {leverOptions.map((lever) => (
            <div key={lever.key} className="space-y-1 rounded-md border bg-muted/20 px-2.5 py-2">
              <p className="text-muted-foreground text-xs">{lever.label}</p>
              <p className="font-semibold text-sm tabular-nums">{lever.value}</p>
              <p className="text-muted-foreground text-xs">{lever.context}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/20 px-3 py-2">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-muted-foreground">
              Responsável: <span className="font-medium text-foreground">Leila Zhang</span>
            </span>
            <span className="text-muted-foreground">
              Foco: <span className="text-foreground">principais negócios para preencher o gap</span>
            </span>
            <span className="text-muted-foreground">
              Prazo: <span className="text-foreground">antes da próxima chamada de previsão</span>
            </span>
          </div>
          <Button variant="secondary" size="sm" className="h-7 px-3 text-xs">
            Abrir top 5 negócios
          </Button>
        </div>

        <div className="space-y-1 rounded-md border border-dashed bg-muted/10 px-3 py-2.5">
          <p className="text-muted-foreground text-xs">
            Caminho mais rápido: <span className="font-medium text-foreground">-4d ciclo</span> recupera 40% do gap.
          </p>
          <p className="text-muted-foreground text-xs">
            Sequência de prioridade: <span className="text-foreground">tempo de ciclo</span> antes de volume líquido
            novo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
