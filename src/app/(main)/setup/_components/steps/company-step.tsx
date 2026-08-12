"use client";

import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSetup } from "@/contexts/setup-context";

const industries = [
  "Tecnologia",
  "Saúde",
  "Educação",
  "Finanças",
  "Varejo",
  "Indústria",
  "Serviços",
  "Construção",
  "Agronegócio",
  "Outro",
];

const companySizes = [
  "1-10 funcionários",
  "11-50 funcionários",
  "51-200 funcionários",
  "201-500 funcionários",
  "500+ funcionários",
];

const timezones = [
  { value: "America/Sao_Paulo", label: "Horário de Brasília (GMT-3)" },
  { value: "America/Manaus", label: "Horário de Manaus (GMT-4)" },
  { value: "America/Rio_Branco", label: "Horário do Acre (GMT-5)" },
];

export function CompanyStep() {
  const { setupData, updateSetupData, setStep } = useSetup();
  const canProceed = setupData.company.name.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* Title */}
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Dados da empresa</h1>
        <p className="text-base text-muted-foreground">Informações básicas da sua organização.</p>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col gap-5">
        {/* Company icon + name */}
        <div className="flex items-end gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted/50">
            <Building2 className="size-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-name">Nome da empresa</FieldLabel>
              <Input
                id="company-name"
                placeholder="Acme Inc."
                value={setupData.company.name}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, name: e.target.value } })}
              />
            </Field>
          </div>
        </div>

        {/* Country / Industry */}
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-industry">Setor de atuação</FieldLabel>
            <select
              id="company-industry"
              value={setupData.company.industry}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, industry: e.target.value } })}
              className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Selecione uma opção</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-size">Tamanho da empresa</FieldLabel>
            <select
              id="company-size"
              value={setupData.company.size}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, size: e.target.value } })}
              className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Selecione uma opção</option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Website */}
        <Field className="gap-1.5">
          <FieldLabel htmlFor="company-website">Website</FieldLabel>
          <Input
            id="company-website"
            placeholder="https://www.empresa.com.br"
            value={setupData.company.website}
            onChange={(e) => updateSetupData({ company: { ...setupData.company, website: e.target.value } })}
          />
        </Field>

        {/* Description */}
        <Field className="gap-1.5">
          <FieldLabel htmlFor="company-description">Descrição</FieldLabel>
          <Textarea
            id="company-description"
            placeholder="Descreva brevemente sua empresa..."
            rows={3}
            value={setupData.company.description}
            onChange={(e) => updateSetupData({ company: { ...setupData.company, description: e.target.value } })}
          />
        </Field>

        {/* Info */}
        <p className="text-sm text-muted-foreground">
          Todos os dados podem ser alterados depois em <strong>Configurações da Conta</strong>.
        </p>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className="mt-6 w-full bg-primary text-white hover:bg-primary/90"
        onClick={() => setStep(2)}
        disabled={!canProceed}
      >
        Continuar
      </Button>
    </div>
  );
}
