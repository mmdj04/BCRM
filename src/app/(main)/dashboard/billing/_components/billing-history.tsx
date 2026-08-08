import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { BillingHistoryEntry } from "./data";

type BillingHistoryProps = {
  entries: BillingHistoryEntry[];
};

const statusStyles: Record<string, string> = {
  paid: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  pending:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  overdue: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
};

const statusLabels: Record<string, string> = {
  paid: "pago",
  pending: "pendente",
  overdue: "atrasado",
};

export function BillingHistory({ entries }: BillingHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Historico de Faturamento</CardTitle>
        <CardDescription>Veja suas faturas e pagamentos anteriores.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descricao</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell className="text-right font-medium">R$ {entry.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={statusStyles[entry.status]}>
                    {statusLabels[entry.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
