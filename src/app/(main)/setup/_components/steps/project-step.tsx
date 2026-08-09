"use client";

import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSetup } from "@/contexts/setup-context";

export function ProjectStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const canProceed = setupData.project.name.trim().length > 0;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="size-5" />
          Configurações do Projeto
        </CardTitle>
        <CardDescription>Defina as informações do seu projeto BCRM.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-name">
              Nome do Projeto
              <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                Obrigatório
              </span>
            </FieldLabel>
            <Input
              id="project-name"
              placeholder="BCRM"
              value={setupData.project.name}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, name: e.target.value } })}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-url">
              URL do Projeto
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                Opcional
              </span>
            </FieldLabel>
            <Input
              id="project-url"
              placeholder="https://bcrm.vercel.app"
              value={setupData.project.url}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, url: e.target.value } })}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-logo">
              URL do Logo
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                Opcional
              </span>
            </FieldLabel>
            <Input
              id="project-logo"
              placeholder="https://exemplo.com/logo.png"
              value={setupData.project.logo}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, logo: e.target.value } })}
            />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-description">
              Descrição do Projeto
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                Opcional
              </span>
            </FieldLabel>
            <Textarea
              id="project-description"
              placeholder="Descreva o objetivo do seu projeto..."
              rows={3}
              value={setupData.project.description}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, description: e.target.value } })}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(3)} disabled={!canProceed}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
