"use client";

import { useState } from "react";

import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/supabase/auth-context";

export function DangerZoneSection() {
  const { signOut } = useAuth();
  const [deleteDataConfirm, setDeleteDataConfirm] = useState("");
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAllData = async () => {
    if (deleteDataConfirm !== "DELETE") return;
    setDeleting(true);
    // Simulate data deletion
    await new Promise((f) => setTimeout(f, 2000));
    setDeleting(false);
    setDeleteDataConfirm("");
  };

  const handleDeleteAccount = async () => {
    if (deleteAccountConfirm !== "DELETE MY ACCOUNT") return;
    setDeleting(true);
    // Simulate account deletion
    await new Promise((f) => setTimeout(f, 2000));
    await signOut();
  };

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive text-lg">Zona de Perigo</CardTitle>
        <CardDescription>Ações irreversíveis. Por favor, tenha certeza antes de prosseguir.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Delete All Data */}
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Excluir Todos os Dados</p>
            <p className="text-muted-foreground text-sm">
              Remova todos os seus projetos, bancos de dados e arquivos. Esta ação não pode ser desfeita.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 size-4" />
                Excluir Dados
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-destructive" />
                  Excluir Todos os Dados
                </DialogTitle>
                <DialogDescription>
                  Isso excluirá permanentemente todos os seus projetos, bancos de dados, arquivos e configurações. Esta
                  ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="delete-data-confirm">
                  Digite <span className="font-bold font-mono">DELETE</span> para confirmar:
                </Label>
                <Input
                  id="delete-data-confirm"
                  value={deleteDataConfirm}
                  onChange={(e) => setDeleteDataConfirm(e.target.value)}
                  placeholder="DELETE"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={deleteDataConfirm !== "DELETE" || deleting}
                  onClick={handleDeleteAllData}
                >
                  {deleting ? "Excluindo..." : "Excluir Todos os Dados"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Excluir Conta</p>
            <p className="text-muted-foreground text-sm">
              Exclua permanentemente sua conta e todos os dados associados.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 size-4" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-destructive" />
                  Excluir Conta
                </DialogTitle>
                <DialogDescription>
                  Isso excluirá permanentemente sua conta, todos os seus dados, projetos e configurações. Você será
                  desconectado imediatamente. Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="delete-account-confirm">
                  Digite <span className="font-bold font-mono">DELETE MY ACCOUNT</span> para confirmar:
                </Label>
                <Input
                  id="delete-account-confirm"
                  value={deleteAccountConfirm}
                  onChange={(e) => setDeleteAccountConfirm(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={deleteAccountConfirm !== "DELETE MY ACCOUNT" || deleting}
                  onClick={handleDeleteAccount}
                >
                  {deleting ? "Excluindo..." : "Minha Conta"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
