"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { CheckCircle2, Key, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_CONFIG } from "@/config/demo-config";

export default function ActivatePage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if demo mode
    const demoCookie = document.cookie.split("; ").find((c) => c.startsWith("bcrm_demo_session="));

    if (demoCookie) {
      setIsDemo(true);
      setKey(DEMO_CONFIG.licenseKey);
    }
  }, []);

  const handleActivate = async () => {
    if (!key.trim()) {
      toast.error("Digite uma chave de licença");
      return;
    }

    setLoading(true);
    try {
      // Get JWT token from cookie
      const tokenCookie = document.cookie.split("; ").find((c) => c.startsWith("bcrm_token="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("/api/license/activate", {
        method: "POST",
        headers,
        body: JSON.stringify({ key: key.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Erro ao ativar licença");
        return;
      }

      setSuccess(true);
      toast.success("Conta ativada com sucesso!");

      setTimeout(() => {
        router.push("/dashboard/default");
      }, 2000);
    } catch {
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="size-8 text-green-600" />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-xl">Conta Ativada!</h2>
              <p className="text-muted-foreground">Redirecionando para o painel...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Key className="size-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Ative sua Conta</CardTitle>
          <CardDescription>
            {isDemo
              ? "Modo Demo: chave já preenchida. Clique para ativar."
              : "Digite a chave de licença enviada para seu e-mail."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="license-key">Chave de Licença</Label>
            <Input
              id="license-key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
              placeholder="BCRM-XXXX-XXXX-XXXX-XXXX"
              className="text-center font-mono text-lg tracking-wider"
              disabled={isDemo}
              autoComplete="off"
            />
          </div>

          <Button onClick={handleActivate} disabled={loading || !key.trim()} className="w-full" size="lg">
            {loading && (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Ativando...
              </>
            )}
            {!loading && isDemo && "Ativar Conta Demo"}
            {!loading && !isDemo && "Ativar Conta"}
          </Button>

          {!isDemo && (
            <div className="text-center">
              <button
                type="button"
                className="text-muted-foreground text-sm hover:text-foreground"
                onClick={() => {
                  toast.success("Chave reenviada para seu e-mail");
                }}
              >
                Não recebeu a chave? Reenviar e-mail
              </button>
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              className="text-muted-foreground text-sm hover:text-foreground"
              onClick={() => router.push("/auth/v1/login")}
            >
              Voltar para o login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
