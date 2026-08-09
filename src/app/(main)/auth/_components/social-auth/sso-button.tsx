"use client";

import { useState } from "react";

import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function SSOButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handleSSO(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!domain.trim()) {
      setError("Digite o domínio da sua empresa.");
      return;
    }

    setLoading(true);
    try {
      const { error: ssoError } = await supabase.auth.signInWithSSO({
        domain: domain.trim(),
      });

      if (ssoError) {
        toast.error(ssoError.message || "SSO não configurado para este domínio.");
        return;
      }

      setOpen(false);
      toast.success("Redirecionando para o provedor de identidade...");
    } catch {
      toast.error("Falha ao iniciar SSO. Verifique se o SAML está configurado no Supabase.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn(className)} {...props}>
          <ShieldCheck className="size-4" />
          Conectar com SSO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Entrar com SSO</DialogTitle>
          <DialogDescription>
            Digite o domínio de e-mail da sua empresa para autenticar via SAML SSO.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSSO} className="space-y-4">
          <FieldGroup>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="sso-domain">Domínio da empresa</FieldLabel>
              <Input
                id="sso-domain"
                type="text"
                placeholder="suaempresa.com.br"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                autoFocus
              />
              {error && <FieldError errors={[{ message: error }]} />}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "Conectando..." : "Continuar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
