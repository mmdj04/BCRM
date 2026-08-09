"use client";

import { useState } from "react";

import { AlertTriangle, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_CONFIG } from "@/config/demo-config";
import { useAuth } from "@/lib/supabase/auth-context";

export function PasswordSection() {
  const { user } = useAuth();
  const isDemo = user?.id === DEMO_CONFIG.user.id;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setSaving(true);
    await new Promise((f) => setTimeout(f, 1000));
    setSaving(false);
    setSuccess("Senha atualizada com sucesso.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Senha</CardTitle>
        <CardDescription>Altere sua senha para manter sua conta segura.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isDemo && (
          <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <AlertTriangle className="size-4 shrink-0" />
            <p>A alteração de senha não está disponível no modo de demonstração.</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="current-password">Senha Atual</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={isDemo}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">Nova Senha</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isDemo}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isDemo}
          />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <div className="flex justify-end">
          <Button onClick={handlePasswordChange} disabled={saving || isDemo}>
            <Lock className="mr-2 size-4" />
            {saving ? "Atualizando..." : "Atualizar Senha"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
