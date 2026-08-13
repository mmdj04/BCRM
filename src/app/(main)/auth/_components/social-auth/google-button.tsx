"use client";

import { siGoogle } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/provider";

export function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { t } = useI18n();

  return (
    <Button variant="secondary" className={cn(className)} {...props}>
      <SimpleIcon icon={siGoogle} className="size-4" />
      {t.auth.form.google}
    </Button>
  );
}
