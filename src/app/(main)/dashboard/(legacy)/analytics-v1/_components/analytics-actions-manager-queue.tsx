import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const NEXT_INTERVENTIONS = [
  {
    dealId: "OPP-489",
    priority: "Escalar",
    owner: "Leila Zhang",
    risk: 81,
    recommendation: "Participar da próxima chamada com o cliente e redefinir o plano de fechamento.",
  },
  {
    dealId: "OPP-475",
    priority: "Coaching",
    owner: "Omar Ali",
    risk: 76,
    recommendation: "Revisar a estratégia do negócio e desbloquear a saída do estágio.",
  },
  {
    dealId: "OPP-447",
    priority: "Coaching",
    owner: "Sofia Bautista",
    risk: 75,
    recommendation: "Revisar a estratégia do negócio e desbloquear a saída do estágio.",
  },
] as const;

export function ActionsManagerQueue() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle>Fila de Ações do Gerente</CardTitle>
        <CardDescription>Escalar, coaching e refazer previsão antes da chamada de compromisso</CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex h-full flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <StatCard label="Negócios acionáveis" value="7" />
            <StatCard label="Receita em jogo" value={formatCurrency(811000, { noDecimals: true })} mono />
            <StatCard label="Responsáveis envolvidos" value="3" />
            <StatCard label="Risco mediano" value="72" mono />
          </div>

          <div className="space-y-2 rounded-md border bg-muted/20 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">Mix de intervenções</p>
              <Badge variant="outline" className="h-5 px-2 text-[11px] tabular-nums">
                Escalar {formatCurrency(174000, { noDecimals: true })}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">Escalar</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  1 negócio · 14% · {formatCurrency(174000, { noDecimals: true })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">Coaching</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  4 negócios · 57% · {formatCurrency(478000, { noDecimals: true })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">Refazer Previsão</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  2 negócios · 29% · {formatCurrency(159000, { noDecimals: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-md border bg-muted/20 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">Foco do gerente</p>
              <span className="text-muted-foreground text-xs tabular-nums">Este ciclo de previsão</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>Fila de coaching</span>
                <span className="text-muted-foreground tabular-nums">
                  4 deals · {formatCurrency(478000, { noDecimals: true })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>Responsável principal</span>
                <span className="text-muted-foreground tabular-nums">Leila Zhang · 3 deals</span>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>Pipeline obsoleto</span>
                <span className="text-muted-foreground tabular-nums">
                  8 deals · {formatCurrency(1151000, { noDecimals: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-muted-foreground text-xs">Próximas intervenções</p>

            {NEXT_INTERVENTIONS.map((item) => (
              <div key={`${item.priority}-${item.dealId}`} className="space-y-1 rounded-md border px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{item.dealId}</span>
                  <Badge variant="outline" className="h-5 px-2 text-[11px]">
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  {item.owner} · {item.risk} risco
                </p>
                <p className="text-xs">{item.recommendation}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/20 px-3 py-2">
            <span className="text-muted-foreground text-xs">Monitor sem ação</span>
            <span className="font-medium text-xs tabular-nums">3 Negócios</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border bg-muted/20 px-2.5 py-2">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={mono ? "font-semibold text-base tabular-nums" : "font-semibold text-base"}>{value}</p>
    </div>
  );
}
