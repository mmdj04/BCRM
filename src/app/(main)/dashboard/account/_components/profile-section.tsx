"use client";

import { useRef, useState } from "react";

import { AlertTriangle, Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_CONFIG } from "@/config/demo-config";
import { useAuth } from "@/lib/supabase/auth-context";
import { getInitials } from "@/lib/utils";

export function ProfileSection() {
  const { user } = useAuth();
  const isDemo = user?.id === DEMO_CONFIG.user.id;
  const [name, setName] = useState(user?.user_metadata?.full_name || "Matheus Moraes");
  const [email] = useState(user?.email || "admin@bcrm.com");
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || "");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((f) => setTimeout(f, 1000));
    setSaving(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Perfil</CardTitle>
        <CardDescription>Gerencie suas informações pessoais.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {isDemo && (
          <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 text-sm dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <AlertTriangle className="size-4 shrink-0" />
            <p>Esta é uma conta de demonstração. As alterações de perfil não serão salvas permanentemente.</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl || undefined} alt={name} />
              <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
            </Avatar>
            {!isDemo && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
                >
                  <Camera className="size-3.5" />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground text-sm">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isDemo} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Endereço de E-mail</Label>
            <Input id="email" value={email} disabled />
            <p className="text-muted-foreground text-xs">
              {isDemo
                ? "A alteração de e-mail não está disponível no modo de demonstração."
                : "Entre em contato com o suporte para alterar seu endereço de e-mail."}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving || isDemo}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
