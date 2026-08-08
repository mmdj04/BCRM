"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/supabase/auth-context";
import { getInitials } from "@/lib/utils";

export function ProfileSection() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name || "Admin User");
  const [email] = useState(user?.email || "admin@bcrm.dev");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((f) => setTimeout(f, 1000));
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Perfil</CardTitle>
        <CardDescription>Gerencie suas informações pessoais.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.user_metadata?.avatar_url || undefined} alt={name} />
            <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground text-sm">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Endereço de E-mail</Label>
            <Input id="email" value={email} disabled />
            <p className="text-muted-foreground text-xs">
              Entre em contato com o suporte para alterar seu endereço de e-mail.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
