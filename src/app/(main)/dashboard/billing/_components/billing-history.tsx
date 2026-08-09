"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/lib/supabase/auth-context";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
);

type PaymentEntry = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "succeeded" | "pending" | "failed";
};

const STATUS_LABELS: Record<string, string> = {
  succeeded: "Pago",
  pending: "Pendente",
  failed: "Falhou",
};

const STATUS_COLORS: Record<string, string> = {
  succeeded: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  pending:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  failed: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
};

export function BillingHistory() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<PaymentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from("payments")
          .select("id, created_at, description, amount, status")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (data) {
          setEntries(
            data.map((p) => ({
              id: p.id,
              date: new Date(p.created_at).toLocaleDateString("pt-BR", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              description: p.description ?? "Assinatura BCRM",
              amount: p.amount / 100,
              status: p.status as PaymentEntry["status"],
            })),
          );
        }
      } catch {
        // Ignore errors
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, [user?.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
        <CardDescription>Seus pagamentos recentes.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="size-6 animate-spin rounded-full border-2 border-current border-t-transparent text-primary" />
          </div>
        ) : entries.length === 0 ? (
          <p className="py-4 text-center text-muted-foreground text-sm">Nenhum pagamento registrado.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm">{entry.date}</TableCell>
                  <TableCell className="text-sm">{entry.description}</TableCell>
                  <TableCell className="text-right text-sm">
                    R$ {entry.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_COLORS[entry.status]}>
                      {STATUS_LABELS[entry.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
