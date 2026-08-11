import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SSOButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" className={cn(className)} disabled {...props}>
      <ShieldCheck className="size-4" />
      SSO (Indisponível)
    </Button>
  );
}
