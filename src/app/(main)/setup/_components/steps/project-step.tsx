"use client";

import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSetup } from "@/contexts/setup-context";

const languages = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (US)" },
  { value: "es", label: "Español" },
];

const themes = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
  { value: "system", label: "Sistema" },
];

const modes = [
  { value: "production", label: "Produção" },
  { value: "development", label: "Desenvolvimento" },
];

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
        <CardDescription>
          Defina as informações do seu projeto BCRM. Todos os campos podem ser alterados depois nas
          configurações da conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-name">
              Nome do Projeto
              <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">
                Obrigatório
              </span>
            </FieldLabel>
            <Input
              id="project-name"
              placeholder="BCRM"
              value={setupData.project.name}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, name: e.target.value } })}
            />
            <p className="text-muted-foreground text-xs">
              Aparece no título do navegador e no menu lateral do painel.
            </p>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-url">
              URL do Projeto
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                Opcional
              </span>
            </FieldLabel>
            <Input
              id="project-url"
              placeholder="https://bcrm.vercel.app"
              value={setupData.project.url}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, url: e.target.value } })}
            />
            <p className="text-muted-foreground text-xs">
              URL principal onde o painel estará acessível.
            </p>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-custom-domain">
              Domínio Personalizado
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                Opcional
              </span>
            </FieldLabel>
            <Input
              id="project-custom-domain"
              placeholder="admin.empresa.com.br"
              value={setupData.project.customDomain}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, customDomain: e.target.value } })}
            />
            <p className="text-muted-foreground text-xs">
              Domínio próprio para acesso ao painel (requer configuração de DNS).
            </p>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-logo">
              URL do Logo
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                Opcional
              </span>
            </FieldLabel>
            <Input
              id="project-logo"
              placeholder="https://exemplo.com/logo.png"
              value={setupData.project.logo}
              onChange={(e) => updateSetupData({ project: { ...setupData.project, logo: e.target.value } })}
            />
            <p className="text-muted-foreground text-xs">
              Logo que aparece no menu lateral e no cabeçalho do painel.
            </p>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="project-description">
              Descrição do Projeto
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
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

          <div className="grid grid-cols-3 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="project-language">
                Idioma
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <select
                id="project-language"
                value={setupData.project.language}
                onChange={(e) => updateSetupData({ project: { ...setupData.project, language: e.target.value } })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="project-theme">
                Tema Padrão
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <select
                id="project-theme"
                value={setupData.project.theme}
                onChange={(e) => updateSetupData({ project: { ...setupData.project, theme: e.target.value } })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {themes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="project-mode">
                Modo
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <select
                id="project-mode"
                value={setupData.project.mode}
                onChange={(e) => updateSetupData({ project: { ...setupData.project, mode: e.target.value } })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {modes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </FieldGroup>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-800 text-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <p>Todos os dados podem ser alterados depois em <strong>Configurações da Conta</strong>.</p>
        </div>

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
