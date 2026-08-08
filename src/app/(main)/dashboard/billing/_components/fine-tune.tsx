import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { ComputeOption } from "./data";

type FineTuneProps = {
  options: ComputeOption[];
};

export function FineTune({ options }: FineTuneProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ajuste seu projeto</CardTitle>
        <CardDescription>
          Todos os projetos rodam em uma instancia de computacao. Os planos Pro e Team incluem compute Micro no preco base.
          Projetos adicionais adicionam seu proprio custo de computacao.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tamanho</TableHead>
              <TableHead className="text-right">R$/mes</TableHead>
              <TableHead>CPU</TableHead>
              <TableHead>Dedicado</TableHead>
              <TableHead>RAM</TableHead>
              <TableHead className="text-right">Conex. Diretas</TableHead>
              <TableHead className="text-right">Conex. Pooler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((option) => (
              <TableRow key={option.size}>
                <TableCell className="font-medium">{option.size}</TableCell>
                <TableCell className="text-right">R$ {option.price.toLocaleString("pt-BR")}</TableCell>
                <TableCell>{option.cpu}</TableCell>
                <TableCell>{option.dedicated ? "Sim" : "Nao"}</TableCell>
                <TableCell>{option.ram}</TableCell>
                <TableCell className="text-right">{option.directConnections}</TableCell>
                <TableCell className="text-right">{option.poolerConnections.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
