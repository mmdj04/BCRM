import { Banknote, FilePlus2, Plus, Wallet as WalletIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const options = [
  { id: "bank", label: "Conectar banco", icon: Banknote },
  { id: "crypto", label: "Carteira cripto", icon: WalletIcon },
  { id: "manual", label: "Conta manual", icon: FilePlus2 },
];

export function AddAccountCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-normal">Adicionar uma conta</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          Vincule um novo banco, carteira custodial ou livro manual para vê-lo no seu painel.
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="flex flex-col items-center gap-2">
                <Button variant="outline" className="size-12 rounded-full" aria-label={option.label}>
                  <Icon aria-hidden="true" className="size-5" />
                </Button>
                <span className="text-center text-muted-foreground text-xs">{option.label}</span>
              </div>
            );
          })}
        </div>
        <Button variant="outline" className="mt-auto justify-center">
          <Plus data-icon="inline-start" />
          Nova conta
        </Button>
      </CardContent>
    </Card>
  );
}
