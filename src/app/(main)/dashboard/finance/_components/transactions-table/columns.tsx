"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { SimpleIcon } from "@/components/simple-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { cn, formatCurrency } from "@/lib/utils";

import { accounts } from "../accounts";
import type { TransactionCategory, TransactionRow, TransactionStatus } from "./schema";

const categoryClasses: Record<TransactionCategory, string> = {
  Receita: "bg-chart-2/15 text-chart-2 dark:text-chart-2",
  Mercearia: "bg-chart-1/15 text-chart-1 dark:text-chart-1",
  Aluguel: "bg-chart-4/15 text-chart-4 dark:text-chart-4",
  Assinaturas: "bg-chart-3/15 text-chart-3 dark:text-chart-3",
  Transferências: "bg-muted text-foreground",
  Cripto: "bg-chart-5/15 text-chart-5 dark:text-chart-5",
  Alimentação: "bg-chart-1/10 text-chart-1 dark:text-chart-1",
  Utilidades: "bg-chart-4/10 text-chart-4 dark:text-chart-4",
  Viagem: "bg-chart-3/10 text-chart-3 dark:text-chart-3",
  Outro: "bg-muted text-muted-foreground",
};

const statusClasses: Record<TransactionStatus, string> = {
  Compensado: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Pendente: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200",
  Falhou: "bg-destructive/10 text-destructive",
};

const sortStateLabels: Record<"asc" | "desc" | "none", string> = {
  asc: "crescente",
  desc: "decrescente",
  none: "não ordenado",
};

function sortAriaLabel(field: string, state: false | "asc" | "desc") {
  const key = state || "none";
  return `Ordenar por ${field}, atualmente ${sortStateLabels[key]}`;
}

function accountById(id: string) {
  return accounts.find((account) => account.id === id);
}

export const transactionsColumns: ColumnDef<DataTableFeatures, TransactionRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todas as transações"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Selecionar ${row.original.description}`}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      const sortState = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          size="sm"
          aria-label={sortAriaLabel("date", sortState)}
          className="-ml-2 h-7 px-2 text-foreground"
          onClick={() => column.toggleSorting(sortState === "asc")}
        >
          Data
          <ArrowUpDown aria-hidden="true" className="ml-1 size-3.5 text-muted-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const parsed = parseISO(row.original.date);
      return (
        <div className="flex flex-col text-sm">
          <span className="font-medium tabular-nums">{format(parsed, "d 'de' MMM", { locale: ptBR })}</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {format(parsed, "HH:mm", { locale: ptBR })}
          </span>
        </div>
      );
    },
    sortFn: "datetime",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">{row.original.description}</span>
        <span className="text-muted-foreground text-xs">{row.original.reference}</span>
      </div>
    ),
  },
  {
    accessorKey: "accountId",
    header: "Conta",
    cell: ({ row }) => {
      const account = accountById(row.original.accountId);
      if (!account) return <span className="text-muted-foreground text-sm">—</span>;
      return (
        <div className="flex items-center gap-2">
          <div aria-hidden="true" className="grid size-7 place-items-center rounded-md border bg-background">
            <SimpleIcon icon={account.icon} aria-hidden="true" className="size-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">{account.name}</span>
            <span className="text-muted-foreground text-xs">{account.detail}</span>
          </div>
        </div>
      );
    },
    filterFn: "equalsString",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <Badge className={cn("rounded-full border-transparent px-2.5", categoryClasses[row.original.category])}>
        {row.original.category}
      </Badge>
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "type",
    header: () => null,
    cell: () => null,
    filterFn: "equalsString",
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      const sortState = column.getIsSorted();
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            aria-label={sortAriaLabel("amount", sortState)}
            className="-mr-2 h-7 px-2 text-foreground"
            onClick={() => column.toggleSorting(sortState === "asc")}
          >
            Valor
            <ArrowUpDown aria-hidden="true" className="ml-1 size-3.5 text-muted-foreground" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const positive = row.original.amount >= 0;
      return (
        <div
          className={cn(
            "text-right font-medium text-sm tabular-nums",
            positive ? "text-green-600 dark:text-green-400" : "text-foreground",
          )}
        >
          {positive ? "+" : ""}
          {formatCurrency(row.original.amount)}
        </div>
      );
    },
    sortFn: "alphanumeric",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={cn("rounded-full px-2.5", statusClasses[row.original.status])}>{row.original.status}</Badge>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Ações</span>,
    cell: ({ row }) => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-muted-foreground hover:bg-transparent focus-visible:bg-transparent"
              aria-label={`Ações para ${row.original.description}`}
            >
              <MoreHorizontal aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            <DropdownMenuItem>Recategorizar</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Disputar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];
