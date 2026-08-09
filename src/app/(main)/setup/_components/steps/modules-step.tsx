"use client";

import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building,
  CheckSquare,
  CreditCard,
  FileStack,
  HeartPulse,
  LayoutDashboard,
  Server,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const modules = [
  { id: "crm" as const, label: "CRM", description: "Gestão de relacionamento com clientes", icon: BarChart3 },
  { id: "finance" as const, label: "Finanças", description: "Controle financeiro completo", icon: CreditCard },
  { id: "analytics" as const, label: "Análises", description: "Dashboards e relatórios", icon: BrainCircuit },
  { id: "productivity" as const, label: "Produtividade", description: "Tarefas e projetos", icon: CheckSquare },
  { id: "ecommerce" as const, label: "E-commerce", description: "Loja virtual e pedidos", icon: ShoppingBag },
  { id: "academy" as const, label: "Academia", description: "Cursos e treinamentos", icon: BookOpen },
  { id: "logistics" as const, label: "Logística", description: "Entregas e rastreamento", icon: Truck },
  { id: "infrastructure" as const, label: "Infraestrutura", description: "Servidores e deploy", icon: Server },
  { id: "fileManager" as const, label: "Arquivos", description: "Gerenciamento de documentos", icon: FileStack },
  { id: "patientMonitoring" as const, label: "Monitoramento", description: "Acompanhamento de pacientes", icon: HeartPulse },
];

export function ModulesStep() {
  const { setupData, updateSetupData, setStep } = useSetup();

  const toggleModule = (moduleId: keyof typeof setupData.modules) => {
    updateSetupData({
      modules: {
        ...setupData.modules,
        [moduleId]: !setupData.modules[moduleId],
      },
    });
  };

  const enabledCount = Object.values(setupData.modules).filter(Boolean).length;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutDashboard className="size-5" />
          Seleção de Módulos
        </CardTitle>
        <CardDescription>
          Escolha os módulos que deseja habilitar. Você pode alterar isso depois.
          {enabledCount > 0 && (
            <span className="ml-1 font-medium text-primary">{enabledCount} módulo(s) selecionado(s)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;
            const isEnabled = setupData.modules[module.id];
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => toggleModule(module.id)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                  isEnabled
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50",
                )}
              >
                <Checkbox
                  checked={isEnabled}
                  className="mt-0.5"
                  onCheckedChange={() => toggleModule(module.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4" />
                    <span className="font-medium text-sm">{module.label}</span>
                  </div>
                  <p className="mt-0.5 text-muted-foreground text-xs">{module.description}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(4)}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
