"use client";

import { Building2, CheckCircle, Globe, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetup } from "@/contexts/setup-context";

export function WelcomeStep() {
  const { setStep } = useSetup();

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="size-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Bem-vindo ao BCRM!</CardTitle>
        <CardDescription className="text-base">
          Vamos configurar seu painel de administração em poucos passos.
          <br />
          Isso levará cerca de 3 minutos.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="grid w-full max-w-md grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Building2 className="size-4 text-muted-foreground" />
            <span>Dados da empresa</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Globe className="size-4 text-muted-foreground" />
            <span>Configurações do projeto</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Mail className="size-4 text-muted-foreground" />
            <span>Seleção de módulos</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Phone className="size-4 text-muted-foreground" />
            <span>Formas de pagamento</span>
          </div>
        </div>
        <Button size="lg" onClick={() => setStep(1)}>
          Começar Configuração
        </Button>
      </CardContent>
    </Card>
  );
}
