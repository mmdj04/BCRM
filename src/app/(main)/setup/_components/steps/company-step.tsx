"use client";

import { Building2, } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-5" />
          Dados da Empresa
        </CardTitle>
        <CardDescription>
          Informações básicas da sua empresa ou organização. Todos os campos podem ser alterados
          depois nas configurações da conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FieldGroup className="gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-name">
              Nome da Empresa
              <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 font-medium text-red-600 text-xs">
                Obrigatório
              </span>
            </FieldLabel>
            <Input
              id="company-name"
              placeholder="Minha Empresa LTDA"
              value={setupData.company.name}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, name: e.target.value } })}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-cnpj">
                CNPJ
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-cnpj"
                placeholder="00.000.000/0001-00"
                value={setupData.company.cnpj}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, cnpj: e.target.value } })}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-website">
                Website
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-website"
                placeholder="https://www.empresa.com.br"
                value={setupData.company.website}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, website: e.target.value } })}
              />
            </Field>
          </div>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-description">
              Descrição
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                Opcional
              </span>
            </FieldLabel>
            <Textarea
              id="company-description"
              placeholder="Descreva brevemente sua empresa..."
              rows={3}
              value={setupData.company.description}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, description: e.target.value } })}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-industry">
                Setor/Indústria
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <select
                id="company-industry"
                value={setupData.company.industry}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, industry: e.target.value } })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Selecione o setor</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-size">
                Tamanho da Empresa
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <select
                id="company-size"
                value={setupData.company.size}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, size: e.target.value } })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Selecione o tamanho</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-city">
                Cidade
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-city"
                placeholder="Nova Iguaçu"
                value={setupData.company.city}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, city: e.target.value } })}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-state">
                Estado
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-state"
                placeholder="RJ"
                value={setupData.company.state}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, state: e.target.value } })}
              />
            </Field>
          </div>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="company-address">
              Endereço
              <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                Opcional
              </span>
            </FieldLabel>
            <Input
              id="company-address"
              placeholder="Rua Exemplo, 123 - Centro"
              value={setupData.company.address}
              onChange={(e) => updateSetupData({ company: { ...setupData.company, address: e.target.value } })}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-phone">
                Telefone
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-phone"
                placeholder="(21) 99999-9999"
                value={setupData.company.phone}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, phone: e.target.value } })}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-email">
                E-mail Corporativo
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-email"
                type="email"
                placeholder="contato@empresa.com.br"
                value={setupData.company.email}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, email: e.target.value } })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-logo">
                Logo da Empresa
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <Input
                id="company-logo"
                placeholder="URL do logo (https://...)"
                value={setupData.company.logo}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, logo: e.target.value } })}
              />
            </Field>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="company-timezone">
                Fuso Horário
                <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs">
                  Opcional
                </span>
              </FieldLabel>
              <select
                id="company-timezone"
                value={setupData.company.timezone}
                onChange={(e) => updateSetupData({ company: { ...setupData.company, timezone: e.target.value } })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
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
          <Button variant="outline" onClick={() => setStep(0)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(2)} disabled={!canProceed}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
