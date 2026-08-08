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
        <CardTitle className="text-lg">Fine-tune your project</CardTitle>
        <CardDescription>
          All projects run on a compute instance. Pro and Team plans include Micro compute in the base price.
          Additional projects each add their own compute cost.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">$/month</TableHead>
              <TableHead>CPU</TableHead>
              <TableHead>Dedicated</TableHead>
              <TableHead>RAM</TableHead>
              <TableHead className="text-right">Direct Conn.</TableHead>
              <TableHead className="text-right">Pooler Conn.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((option) => (
              <TableRow key={option.size}>
                <TableCell className="font-medium">{option.size}</TableCell>
                <TableCell className="text-right">${option.price}</TableCell>
                <TableCell>{option.cpu}</TableCell>
                <TableCell>{option.dedicated ? "Yes" : "No"}</TableCell>
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
