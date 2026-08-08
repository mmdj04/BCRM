import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { accounts, accountTypeLabels, getAccountsByType, totalBalance, totalMonthlyDelta } from "./accounts";

function deltaBadge(amount: number) {
  if (amount === 0) {
    return <Badge variant="secondary">Estável</Badge>;
  }
  if (amount > 0) {
    return (
      <Badge className="bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300">
        +{formatCurrency(amount, { noDecimals: true })}
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="bg-destructive/10 text-destructive">
      {formatCurrency(amount, { noDecimals: true })}
    </Badge>
  );
}

export function AccountKpis() {
  const largest = accounts.length
    ? accounts.reduce((top, account) => (account.balance > top.balance ? account : top), accounts[0])
    : null;
  const largestShare = !largest || totalBalance === 0 ? 0 : largest.balance / totalBalance;
  const breakdown = (Object.keys(accountTypeLabels) as Array<keyof typeof accountTypeLabels>)
    .map((type) => ({ type, count: getAccountsByType(type).length }))
    .filter((slice) => slice.count > 0);

  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="grid grid-cols-1 xl:grid-cols-12">
        <Card className="gap-5 overflow-hidden rounded-none border-0 border-foreground/10 border-b ring-0 xl:col-span-3 xl:border-r xl:border-b-0">
          <CardHeader>
            <CardTitle className="font-normal">Saldo total</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="text-3xl tabular-nums leading-none tracking-tight">
                {formatCurrency(totalBalance, { noDecimals: true })}
              </div>
              <p className="text-muted-foreground text-xs">Em {accounts.length} contas vinculadas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-5 overflow-hidden rounded-none border-0 border-foreground/10 border-b ring-0 xl:col-span-3 xl:border-r xl:border-b-0">
          <CardHeader>
            <CardTitle className="font-normal">Contas</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="text-3xl tabular-nums leading-none tracking-tight">{accounts.length}</div>
              <p className="text-muted-foreground text-xs">
                {breakdown.map((slice, index) => (
                  <span key={slice.type}>
                    {index > 0 ? " · " : ""}
                    <span className="text-foreground">{slice.count}</span>{" "}
                    <span>{accountTypeLabels[slice.type].toLowerCase()}</span>
                  </span>
                ))}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-5 overflow-hidden rounded-none border-0 border-foreground/10 border-b ring-0 xl:col-span-3 xl:border-r xl:border-b-0">
          <CardHeader>
            <CardTitle className="font-normal">Maior conta</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="text-3xl tabular-nums leading-none tracking-tight">
                {largest ? formatCurrency(largest.balance, { noDecimals: true }) : "—"}
              </div>
              <p className="text-muted-foreground text-xs">
                {largest ? (
                  <>
                    <span className="text-foreground">{largest.name}</span> · {Math.round(largestShare * 100)}% do total
                  </>
                ) : (
                  "Nenhuma conta vinculada"
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-5 overflow-hidden rounded-none border-0 ring-0 xl:col-span-3">
          <CardHeader>
            <CardTitle className="font-normal">Fluxo líquido de 30 dias</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="text-3xl tabular-nums leading-none tracking-tight">
                {totalMonthlyDelta >= 0 ? "+" : ""}
                {formatCurrency(totalMonthlyDelta, { noDecimals: true })}
              </div>
              <p className="text-muted-foreground text-xs">Entradas menos saídas em todas as contas</p>
            </div>
            {deltaBadge(totalMonthlyDelta)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
