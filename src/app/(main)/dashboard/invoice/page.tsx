import { Save, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Invoice } from "./_components/invoice";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-3xl leading-none tracking-tight">Criar Nova Fatura</h1>
          <p className="text-muted-foreground text-sm">
            Adicione os detalhes da fatura, revise a pré-visualização e envie para o seu cliente.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline">
            <Save data-icon="inline-start" />
            Salvar como Rascunho
          </Button>
          <Button type="button">
            <Send data-icon="inline-start" />
            Enviar Fatura
          </Button>
        </div>
      </div>

      <Invoice />
    </div>
  );
}
