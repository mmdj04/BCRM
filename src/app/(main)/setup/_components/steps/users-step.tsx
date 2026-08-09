"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRightLeft,
  Check,
  Edit,
  FileUp,
  Mail,
  Palette,
  Plus,
  Shield,
  Trash2,
  UserPlus,
  Users,
  UsersRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSetup } from "@/contexts/setup-context";
import { cn } from "@/lib/utils";

const TEAM_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-pink-500",
];

interface CustomRole {
  name: string;
  description: string;
}

interface Team {
  name: string;
  description: string;
  color: string;
}

const DEFAULT_ROLES: CustomRole[] = [
  { name: "Administrador", description: "Acesso total ao sistema" },
  { name: "Gerente", description: "Gerencia equipe e relatórios" },
  { name: "Editor", description: "Cria e edita conteúdo" },
  { name: "Visualizador", description: "Apenas visualiza dados" },
];

export function UsersStep() {
  const { setupData, updateSetupData, setStep } = useSetup();

  // Teams state
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [newTeamColor, setNewTeamColor] = useState(TEAM_COLORS[0]);
  const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);
  const [editingTeamName, setEditingTeamName] = useState("");
  const [editingTeamDescription, setEditingTeamDescription] = useState("");

  // Roles state
  const [customRoles, setCustomRoles] = useState<CustomRole[]>(DEFAULT_ROLES);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  // User invite state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState(DEFAULT_ROLES[0].name);
  const [newTeam, setNewTeam] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  // Migration state
  const [selectedMigration, setSelectedMigration] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvNameColumn, setCsvNameColumn] = useState("");
  const [csvEmailColumn, setCsvEmailColumn] = useState("");
  const [csvRoleColumn, setCsvRoleColumn] = useState("");
  const [googleDomain, setGoogleDomain] = useState("");
  const [googleSyncUsers, setGoogleSyncUsers] = useState(true);
  const [googleSyncGroups, setGoogleSyncGroups] = useState(false);
  const [googleSyncOu, setGoogleSyncOu] = useState(false);
  const [azureTenantId, setAzureTenantId] = useState("");

  // Team CRUD handlers
  const addTeam = () => {
    if (!newTeamName.trim()) return;
    const team: Team = {
      name: newTeamName.trim(),
      description: newTeamDescription.trim(),
      color: newTeamColor,
    };
    setTeams((prev) => [...prev, team]);
    updateSetupData({ teams: [...setupData.teams, { name: team.name, description: team.description, color: team.color }] });
    setNewTeamName("");
    setNewTeamDescription("");
    setNewTeamColor(TEAM_COLORS[0]);
  };

  const removeTeam = (index: number) => {
    const teamToRemove = teams[index];
    setTeams((prev) => prev.filter((_, i) => i !== index));
    updateSetupData({
      teams: setupData.teams.filter((t) => t.name !== teamToRemove.name),
      users: setupData.users.map((u) => (u.team === teamToRemove.name ? { ...u, team: "" } : u)),
    });
    if (editingTeamIndex === index) {
      setEditingTeamIndex(null);
    }
  };

  const startEditTeam = (index: number) => {
    setEditingTeamIndex(index);
    setEditingTeamName(teams[index].name);
    setEditingTeamDescription(teams[index].description);
  };

  const saveEditTeam = (index: number) => {
    if (!editingTeamName.trim()) return;
    const oldName = teams[index].name;
    const updated = { ...teams[index], name: editingTeamName.trim(), description: editingTeamDescription.trim() };
    setTeams((prev) => prev.map((t, i) => (i === index ? updated : t)));
    updateSetupData({
      teams: setupData.teams.map((t) => (t.name === oldName ? { name: updated.name, description: updated.description, color: updated.color } : t)),
      users: setupData.users.map((u) => (u.team === oldName ? { ...u, team: updated.name } : u)),
    });
    setEditingTeamIndex(null);
  };

  const cancelEditTeam = () => {
    setEditingTeamIndex(null);
  };

  // Role CRUD handlers
  const addRole = () => {
    if (!newRoleName.trim()) return;
    const exists = customRoles.some((r) => r.name.toLowerCase() === newRoleName.trim().toLowerCase());
    if (exists) return;
    setCustomRoles((prev) => [...prev, { name: newRoleName.trim(), description: newRoleDescription.trim() }]);
    setNewRoleName("");
    setNewRoleDescription("");
  };

  const removeRole = (index: number) => {
    if (index < DEFAULT_ROLES.length) return;
    const removed = customRoles[index];
    setCustomRoles((prev) => prev.filter((_, i) => i !== index));
    if (newRole === removed.name) {
      setNewRole(DEFAULT_ROLES[0].name);
    }
  };

  // User invite handlers
  const addUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    updateSetupData({
      users: [...setupData.users, { name: newName.trim(), email: newEmail.trim(), role: newRole, team: newTeam }],
    });
    setNewName("");
    setNewEmail("");
    setNewRole(DEFAULT_ROLES[0].name);
    setNewTeam("");
    setInviteMessage("");
  };

  const removeUser = (index: number) => {
    updateSetupData({
      users: setupData.users.filter((_, i) => i !== index),
    });
  };

  // Migration handlers
  const toggleMigration = (id: string) => {
    setSelectedMigration((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Gestão de Usuários
        </CardTitle>
        <CardDescription>
          Convide membros da equipe, crie equipes e configure permissões. Você pode adicionar mais
          usuários depois nas configurações.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Accordion type="multiple" className="w-full">
          {/* Equipes */}
          <AccordionItem value="teams">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <UsersRound className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Equipes</span>
                <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
                {teams.length > 0 && (
                  <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">
                    {teams.length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3">
                <FieldGroup className="gap-3">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="team-name">
                        Nome da Equipe
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                          Obrigatório
                        </span>
                      </FieldLabel>
                      <Input
                        id="team-name"
                        placeholder="Ex: Desenvolvimento"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="team-description">
                        Descrição
                        <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                          Opcional
                        </span>
                      </FieldLabel>
                      <Input
                        id="team-description"
                        placeholder="Descreva o time..."
                        value={newTeamDescription}
                        onChange={(e) => setNewTeamDescription(e.target.value)}
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel>
                        Cor
                      </FieldLabel>
                      <div className="flex items-center gap-1.5">
                        <Palette className="size-4 text-muted-foreground" />
                        <div className="flex gap-1.5">
                          {TEAM_COLORS.map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={cn(
                                "size-6 rounded-full border-2 transition-all",
                                color,
                                newTeamColor === color
                                  ? "border-foreground scale-110"
                                  : "border-transparent hover:scale-105",
                              )}
                              onClick={() => setNewTeamColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                    </Field>
                  </div>
                  <Button
                    type="button"
                    onClick={addTeam}
                    disabled={!newTeamName.trim()}
                    variant="outline"
                    size="sm"
                    className="w-fit"
                  >
                    <Plus className="mr-2 size-3" />
                    Adicionar Equipe
                  </Button>
                </FieldGroup>

                {teams.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {teams.map((team, index) => (
                      <div
                        key={`${team.name}-${index}`}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        {editingTeamIndex === index ? (
                          <div className="flex flex-1 flex-col gap-2">
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                value={editingTeamName}
                                onChange={(e) => setEditingTeamName(e.target.value)}
                                placeholder="Nome da equipe"
                              />
                              <Input
                                value={editingTeamDescription}
                                onChange={(e) => setEditingTeamDescription(e.target.value)}
                                placeholder="Descrição"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => saveEditTeam(index)}
                                disabled={!editingTeamName.trim()}
                              >
                                <Check className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={cancelEditTeam}
                              >
                                <X className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <div className={cn("size-3 rounded-full", team.color)} />
                              <div>
                                <p className="font-medium text-sm">{team.name}</p>
                                {team.description && (
                                  <p className="text-muted-foreground text-xs">{team.description}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => startEditTeam(index)}
                              >
                                <Edit className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => removeTeam(index)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Funções Customizadas */}
          <AccordionItem value="roles">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <Shield className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Funções</span>
                <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
                {customRoles.length > 0 && (
                  <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">
                    {customRoles.length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3">
                <FieldGroup className="gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="role-name">
                        Nome da Função
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                          Obrigatório
                        </span>
                      </FieldLabel>
                      <Input
                        id="role-name"
                        placeholder="Ex: Suporte"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel htmlFor="role-description">
                        Descrição
                        <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                          Opcional
                        </span>
                      </FieldLabel>
                      <Input
                        id="role-description"
                        placeholder="Descreva as permissões..."
                        value={newRoleDescription}
                        onChange={(e) => setNewRoleDescription(e.target.value)}
                      />
                    </Field>
                  </div>
                  <Button
                    type="button"
                    onClick={addRole}
                    disabled={!newRoleName.trim()}
                    variant="outline"
                    size="sm"
                    className="w-fit"
                  >
                    <Plus className="mr-2 size-3" />
                    Adicionar Função
                  </Button>
                </FieldGroup>

                <div className="flex flex-col gap-2">
                  {customRoles.map((role, index) => (
                    <div
                      key={`${role.name}-${index}`}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="size-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{role.name}</p>
                          {role.description && (
                            <p className="text-muted-foreground text-xs">{role.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {index < DEFAULT_ROLES.length && (
                          <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                            Padrão
                          </span>
                        )}
                        {index >= DEFAULT_ROLES.length && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() => removeRole(index)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Migração e Integração */}
          <AccordionItem value="migration">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <ArrowRightLeft className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Migração e Integração</span>
                <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-xs">
                  Já usa outro sistema? Importe seus dados para o BCRM.
                </p>

                <div className="flex flex-col gap-2">
                  {/* CSV/Excel */}
                  <label
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer",
                      selectedMigration === "csv"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/50",
                    )}
                  >
                    <Checkbox
                      checked={selectedMigration === "csv"}
                      onCheckedChange={() => toggleMigration("csv")}
                    />
                    <div className="flex-1">
                      <span className="font-medium text-sm">Importar de CSV/Excel</span>
                      <p className="text-muted-foreground text-xs">Importe uma planilha com os dados dos usuários</p>
                    </div>
                  </label>

                  {/* Google Workspace */}
                  <label
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer",
                      selectedMigration === "google"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/50",
                    )}
                  >
                    <Checkbox
                      checked={selectedMigration === "google"}
                      onCheckedChange={() => toggleMigration("google")}
                    />
                    <div className="flex-1">
                      <span className="font-medium text-sm">Google Workspace</span>
                      <p className="text-muted-foreground text-xs">Importe equipes do Google Admin</p>
                    </div>
                  </label>

                  {/* Azure AD */}
                  <label
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer",
                      selectedMigration === "azure"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/50",
                    )}
                  >
                    <Checkbox
                      checked={selectedMigration === "azure"}
                      onCheckedChange={() => toggleMigration("azure")}
                    />
                    <div className="flex-1">
                      <span className="font-medium text-sm">Azure Active Directory</span>
                      <p className="text-muted-foreground text-xs">Sincronize com o Azure AD</p>
                    </div>
                  </label>
                </div>

                {/* CSV/Excel config */}
                {selectedMigration === "csv" && (
                  <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                    <p className="font-medium text-sm">Configurar Importação CSV/Excel</p>
                    <Field className="gap-1.5">
                      <FieldLabel>
                        Arquivo
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                          Obrigatório
                        </span>
                      </FieldLabel>
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="csv-upload"
                          className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 text-sm text-muted-foreground hover:bg-muted/50"
                        >
                          <FileUp className="size-4" />
                          {csvFile ? csvFile.name : "Selecionar arquivo..."}
                        </label>
                        <input
                          id="csv-upload"
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          className="hidden"
                          onChange={(e) => setCsvFile(e.target.files?.[0] ?? null)}
                        />
                        {csvFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() => setCsvFile(null)}
                          >
                            <X className="size-3.5" />
                          </Button>
                        )}
                      </div>
                    </Field>
                    <div className="grid grid-cols-3 gap-3">
                      <Field className="gap-1.5">
                        <FieldLabel>
                          Coluna Nome
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                            Obrigatório
                          </span>
                        </FieldLabel>
                        <Input
                          placeholder="Ex: nome"
                          value={csvNameColumn}
                          onChange={(e) => setCsvNameColumn(e.target.value)}
                        />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel>
                          Coluna E-mail
                          <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                            Obrigatório
                          </span>
                        </FieldLabel>
                        <Input
                          placeholder="Ex: email"
                          value={csvEmailColumn}
                          onChange={(e) => setCsvEmailColumn(e.target.value)}
                        />
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel>
                          Coluna Função
                          <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                            Opcional
                          </span>
                        </FieldLabel>
                        <Input
                          placeholder="Ex: cargo"
                          value={csvRoleColumn}
                          onChange={(e) => setCsvRoleColumn(e.target.value)}
                        />
                      </Field>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={!csvFile || !csvNameColumn.trim() || !csvEmailColumn.trim()}
                    >
                      <FileUp className="mr-2 size-3" />
                      Importar CSV
                    </Button>
                  </div>
                )}

                {/* Google Workspace config */}
                {selectedMigration === "google" && (
                  <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                    <p className="font-medium text-sm">Configurar Google Workspace</p>
                    <Field className="gap-1.5">
                      <FieldLabel>
                        Domínio
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                          Obrigatório
                        </span>
                      </FieldLabel>
                      <Input
                        placeholder="Ex: empresa.com.br"
                        value={googleDomain}
                        onChange={(e) => setGoogleDomain(e.target.value)}
                      />
                    </Field>
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-xs">Opções de Sincronização</p>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox checked={googleSyncUsers} onCheckedChange={() => setGoogleSyncUsers(!googleSyncUsers)} />
                        <span>Usuários</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox checked={googleSyncGroups} onCheckedChange={() => setGoogleSyncGroups(!googleSyncGroups)} />
                        <span>Grupos</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox checked={googleSyncOu} onCheckedChange={() => setGoogleSyncOu(!googleSyncOu)} />
                        <span>Unidades Organizacionais</span>
                      </label>
                    </div>
                    <Button type="button" variant="outline" size="sm" disabled={!googleDomain.trim()}>
                      <ArrowRightLeft className="mr-2 size-3" />
                      Conectar Google Workspace
                    </Button>
                  </div>
                )}

                {/* Azure AD config */}
                {selectedMigration === "azure" && (
                  <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                    <p className="font-medium text-sm">Configurar Azure Active Directory</p>
                    <Field className="gap-1.5">
                      <FieldLabel>
                        Tenant ID
                        <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                          Obrigatório
                        </span>
                      </FieldLabel>
                      <Input
                        placeholder="Ex: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        value={azureTenantId}
                        onChange={(e) => setAzureTenantId(e.target.value)}
                      />
                    </Field>
                    <div className="rounded-lg bg-background p-3 text-xs">
                      <p className="font-medium mb-2">Instruções de Configuração</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Crie um App Registration no Azure Portal</li>
                        <li>Configure os-permissions: User.Read, Group.Read.All</li>
                        <li>Gere um Client Secret</li>
                        <li>Cole o Tenant ID e Client Secret abaixo</li>
                      </ol>
                    </div>
                    <Button type="button" variant="outline" size="sm" disabled={!azureTenantId.trim()}>
                      <ArrowRightLeft className="mr-2 size-3" />
                      Conectar Azure AD
                    </Button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Convite Manual */}
          <AccordionItem value="invite">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2 text-left">
                <UserPlus className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">Convidar Usuário</span>
                <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                  Opcional
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <FieldGroup className="gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="user-name">
                      Nome
                      <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                        Obrigatório
                      </span>
                    </FieldLabel>
                    <Input
                      id="user-name"
                      placeholder="Nome do usuário"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="user-email">
                      E-mail
                      <span className="ml-1.5 rounded bg-red-50 px-1.5 py-0.5 text-red-600 text-xs font-medium">
                        Obrigatório
                      </span>
                    </FieldLabel>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="usuario@empresa.com.br"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="user-role">
                      Função
                      <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                        Opcional
                      </span>
                    </FieldLabel>
                    <select
                      id="user-role"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {customRoles.map((role) => (
                        <option key={role.name} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="user-team">
                      Equipe
                      <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                        Opcional
                      </span>
                    </FieldLabel>
                    <select
                      id="user-team"
                      value={newTeam}
                      onChange={(e) => setNewTeam(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Sem equipe</option>
                      {teams.map((team) => (
                        <option key={team.name} value={team.name}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="user-message">
                    Mensagem de Convite Personalizada
                    <span className="ml-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-amber-600 text-xs font-medium">
                      Opcional
                    </span>
                  </FieldLabel>
                  <Input
                    id="user-message"
                    placeholder="Mensagem personalizada para o convite..."
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                  />
                </Field>
                <Button type="button" onClick={addUser} disabled={!newName.trim() || !newEmail.trim()}>
                  <Mail className="mr-2 size-4" />
                  Enviar Convite
                </Button>
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Usuários Adicionados */}
        {setupData.users.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm">Usuários Adicionados ({setupData.users.length})</span>
            {setupData.users.map((user, index) => (
              <div key={`${user.email}-${index}`} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {user.team && (
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs dark:bg-blue-950 dark:text-blue-300">
                      {user.team}
                    </span>
                  )}
                  <span className="rounded bg-muted px-2 py-0.5 text-xs">
                    {user.role}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => removeUser(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-800 text-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <p>Usuários e equipes podem ser gerenciados depois em <strong>Configurações → Usuários</strong>.</p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(4)}>
            Voltar
          </Button>
          <Button onClick={() => setStep(6)}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}
