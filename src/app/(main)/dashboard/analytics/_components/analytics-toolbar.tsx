import { Ellipsis, FileDown, FileUp, RefreshCw, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShare } from "@/hooks/use-capacitor";

export function AnalyticsToolbar() {
  const { share } = useShare();

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="last-4-weeks">
        <SelectTrigger className="w-34">
          <SelectValue placeholder="Selecionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
            <SelectItem value="last-4-weeks">Últimas 4 semanas</SelectItem>
            <SelectItem value="last-3-months">Últimos 3 meses</SelectItem>
            <SelectItem value="year-to-date">Ano até hoje</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Mais ações de analytics">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Ações de analytics</DropdownMenuLabel>
            <DropdownMenuItem>
              <FileDown />
              Exportar relatório
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileUp />
              Importar dados
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => share({ title: "BCRM Analytics", text: "Compartilhar painel de analytics", url: window.location.href })}>
              <Share2 />
              Compartilhar painel
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <RefreshCw />
              Atualizar métricas
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
