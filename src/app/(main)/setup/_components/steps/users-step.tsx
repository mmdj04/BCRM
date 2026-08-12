"use client";

import { useState } from "react";

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

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [newTeamColor, setNewTeamColor] = useState(TEAM_COLORS[0]);
  const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);
  const [editingTeamName, setEditingTeamName] = useState("");
  const [editingTeamDescription, setEditingTeamDescription] = useState("");

  const [customRoles, setCustomRoles] = useState<CustomRole[]>(DEFAULT_ROLES);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState(DEFAULT_ROLES[0].name);
  const [newTeam, setNewTeam] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

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

  const addTeam = () => {
    if (!newTeamName.trim()) return;
    const team: Team = { name: newTeamName.trim(), description: newTeamDescription.trim(), color: newTeamColor };
    setTeams((prev) => [...prev, team]);
    updateSetupData({
      teams: [...setupData.teams, { name: team.name, description: team.description, color: team.color }],
    });
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
    if (editingTeamIndex === index) setEditingTeamIndex(null);
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
      teams: setupData.teams.map((t) =>
        t.name === oldName ? { name: updated.name, description: updated.description, color: updated.color } : t,
      ),
      users: setupData.users.map((u) => (u.team === oldName ? { ...u, team: updated.name } : u)),
    });
    setEditingTeamIndex(null);
  };

  const cancelEditTeam = () => setEditingTeamIndex(null);

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
    if (newRole === removed.name) setNewRole(DEFAULT_ROLES[0].name);
  };

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
    updateSetupData({ users: setupData.users.filter((_, i) => i !== index) });
  };

  const toggleMigration = (id: string) => setSelectedMigration((prev) => (prev === id ? null : id));

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Usuários</h1>
        <p className="text-base text-muted-foreground">
          Convide membros da equipe, crie equipes e configure permissões.
        </p>
      </div>

      <Accordion type="multiple" className="flex flex-1 flex-col gap-2">
        {/* Equipes */}
        <AccordionItem value="teams" className="rounded-xl border border-border/60 bg-background/80 px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <UsersRound className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Equipes</span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs dark:bg-amber-950 dark:text-amber-400">
                Opcional
              </span>
              {teams.length > 0 && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">{teams.length}</span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="flex flex-col gap-3">
              <FieldGroup className="gap-3">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="team-name">
                      Nome <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="team-name"
                      placeholder="Ex: Desenvolvimento"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="team-description">Descrição</FieldLabel>
                    <Input
                      id="team-description"
                      placeholder="Descreva o time..."
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel>Cor</FieldLabel>
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
                                ? "scale-110 border-foreground"
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
                  <Plus className="mr-2 size-3" /> Adicionar Equipe
                </Button>
              </FieldGroup>

              {teams.length > 0 && (
                <div className="flex flex-col gap-2">
                  {teams.map((team, index) => (
                    <div
                      key={`${team.name}-${index}`}
                      className="flex items-center justify-between rounded-lg border border-border/60 p-3"
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
                              {team.description && <p className="text-muted-foreground text-xs">{team.description}</p>}
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

        {/* Funções */}
        <AccordionItem value="roles" className="rounded-xl border border-border/60 bg-background/80 px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <Shield className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Funções</span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs dark:bg-amber-950 dark:text-amber-400">
                Opcional
              </span>
              {customRoles.length > 0 && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">{customRoles.length}</span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="flex flex-col gap-3">
              <FieldGroup className="gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="role-name">
                      Nome <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="role-name"
                      placeholder="Ex: Suporte"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="role-description">Descrição</FieldLabel>
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
                  <Plus className="mr-2 size-3" /> Adicionar Função
                </Button>
              </FieldGroup>
              <div className="flex flex-col gap-2">
                {customRoles.map((role, index) => (
                  <div
                    key={`${role.name}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-border/60 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="size-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{role.name}</p>
                        {role.description && <p className="text-muted-foreground text-xs">{role.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {index < DEFAULT_ROLES.length && (
                        <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">Padrão</span>
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

        {/* Migração */}
        <AccordionItem value="migration" className="rounded-xl border border-border/60 bg-background/80 px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <ArrowRightLeft className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Migração</span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs dark:bg-amber-950 dark:text-amber-400">
                Opcional
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="flex flex-col gap-3">
              <p className="text-muted-foreground text-xs">Já usa outro sistema? Importe seus dados para o BCRM.</p>
              <div className="flex flex-col gap-2">
                {[
                  { id: "csv", label: "Importar de CSV/Excel", desc: "Importe uma planilha com os dados dos usuários" },
                  { id: "google", label: "Google Workspace", desc: "Importe equipes do Google Admin" },
                  { id: "azure", label: "Azure Active Directory", desc: "Sincronize com o Azure AD" },
                ].map((m) => (
                  <label
                    key={m.id}
                    htmlFor={`migration-${m.id}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                      selectedMigration === m.id
                        ? "border-primary/30 bg-primary/5"
                        : "border-border/60 hover:border-border",
                    )}
                  >
                    <Checkbox
                      id={`migration-${m.id}`}
                      checked={selectedMigration === m.id}
                      onCheckedChange={() => toggleMigration(m.id)}
                    />
                    <div className="flex-1">
                      <span className="font-medium text-sm">{m.label}</span>
                      <p className="text-muted-foreground text-xs">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {selectedMigration === "csv" && (
                <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                  <p className="font-medium text-sm">Configurar Importação CSV</p>
                  <Field className="gap-1.5">
                    <FieldLabel>
                      Arquivo <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="csv-upload"
                        className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 text-muted-foreground text-sm hover:bg-muted/50"
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
                        Coluna Nome <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        placeholder="Ex: nome"
                        value={csvNameColumn}
                        onChange={(e) => setCsvNameColumn(e.target.value)}
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel>
                        Coluna E-mail <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        placeholder="Ex: email"
                        value={csvEmailColumn}
                        onChange={(e) => setCsvEmailColumn(e.target.value)}
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel>Coluna Função</FieldLabel>
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
                    <FileUp className="mr-2 size-3" /> Importar CSV
                  </Button>
                </div>
              )}

              {selectedMigration === "google" && (
                <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                  <p className="font-medium text-sm">Configurar Google Workspace</p>
                  <Field className="gap-1.5">
                    <FieldLabel>
                      Domínio <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Ex: empresa.com.br"
                      value={googleDomain}
                      onChange={(e) => setGoogleDomain(e.target.value)}
                    />
                  </Field>
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-xs">Opções de Sincronização</p>
                    <label htmlFor="google-sync-users" className="flex items-center gap-2 text-sm">
                      <Checkbox
                        id="google-sync-users"
                        checked={googleSyncUsers}
                        onCheckedChange={() => setGoogleSyncUsers(!googleSyncUsers)}
                      />
                      <span>Usuários</span>
                    </label>
                    <label htmlFor="google-sync-groups" className="flex items-center gap-2 text-sm">
                      <Checkbox
                        id="google-sync-groups"
                        checked={googleSyncGroups}
                        onCheckedChange={() => setGoogleSyncGroups(!googleSyncGroups)}
                      />
                      <span>Grupos</span>
                    </label>
                    <label htmlFor="google-sync-ou" className="flex items-center gap-2 text-sm">
                      <Checkbox
                        id="google-sync-ou"
                        checked={googleSyncOu}
                        onCheckedChange={() => setGoogleSyncOu(!googleSyncOu)}
                      />
                      <span>Unidades Organizacionais</span>
                    </label>
                  </div>
                  <Button type="button" variant="outline" size="sm" disabled={!googleDomain.trim()}>
                    <ArrowRightLeft className="mr-2 size-3" /> Conectar Google Workspace
                  </Button>
                </div>
              )}

              {selectedMigration === "azure" && (
                <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                  <p className="font-medium text-sm">Configurar Azure Active Directory</p>
                  <Field className="gap-1.5">
                    <FieldLabel>
                      Tenant ID <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Ex: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={azureTenantId}
                      onChange={(e) => setAzureTenantId(e.target.value)}
                    />
                  </Field>
                  <Button type="button" variant="outline" size="sm" disabled={!azureTenantId.trim()}>
                    <ArrowRightLeft className="mr-2 size-3" /> Conectar Azure AD
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Convite Manual */}
        <AccordionItem value="invite" className="rounded-xl border border-border/60 bg-background/80 px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <UserPlus className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Convidar Usuário</span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-600 text-xs dark:bg-amber-950 dark:text-amber-400">
                Opcional
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <FieldGroup className="gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="user-name">
                    Nome <span className="text-destructive">*</span>
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
                    E-mail <span className="text-destructive">*</span>
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
                  <FieldLabel htmlFor="user-role">Função</FieldLabel>
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
                  <FieldLabel htmlFor="user-team">Equipe</FieldLabel>
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
                <FieldLabel htmlFor="user-message">Mensagem de Convite</FieldLabel>
                <Input
                  id="user-message"
                  placeholder="Mensagem personalizada para o convite..."
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                />
              </Field>
              <Button
                type="button"
                onClick={addUser}
                disabled={!newName.trim() || !newEmail.trim()}
                className="bg-primary text-white hover:bg-primary/90"
              >
                <Mail className="mr-2 size-4" /> Enviar Convite
              </Button>
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Usuários Adicionados */}
      {setupData.users.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <span className="font-medium text-sm text-muted-foreground">
            Usuários adicionados ({setupData.users.length})
          </span>
          {setupData.users.map((user, index) => (
            <div
              key={`${user.email}-${index}`}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3"
            >
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {user.team && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary text-xs">{user.team}</span>
                )}
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{user.role}</span>
                <Button type="button" variant="ghost" size="icon" className="size-8" onClick={() => removeUser(index)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-800 text-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
        Usuários e equipes podem ser gerenciados depois em <strong>Configurações → Usuários</strong>.
      </div>

      <Button size="lg" className="mt-6 w-full bg-primary text-white hover:bg-primary/90" onClick={() => setStep(5)}>
        Continuar
      </Button>
    </div>
  );
}
