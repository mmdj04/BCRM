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
        <CardTitle className="text-destructive text-lg">Danger Zone</CardTitle>
        <CardDescription>
          Irreversible actions. Please be certain before proceeding.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Delete All Data */}
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Delete All Data</p>
            <p className="text-muted-foreground text-sm">
              Remove all your projects, databases, and files. This cannot be undone.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 size-4" />
                Delete Data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-destructive size-5" />
                  Delete All Data
                </DialogTitle>
                <DialogDescription>
                  This will permanently delete all your projects, databases, files, and
                  configurations. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="delete-data-confirm">
                  Type <span className="font-mono font-bold">DELETE</span> to confirm:
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
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={deleteDataConfirm !== "DELETE" || deleting}
                  onClick={handleDeleteAllData}
                >
                  {deleting ? "Deleting..." : "Delete All Data"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Delete Account</p>
            <p className="text-muted-foreground text-sm">
              Permanently delete your account and all associated data.
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
                  <AlertTriangle className="text-destructive size-5" />
                  Delete Account
                </DialogTitle>
                <DialogDescription>
                  This will permanently delete your account, all your data, projects,
                  and configurations. You will be logged out immediately. This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="delete-account-confirm">
                  Type <span className="font-mono font-bold">DELETE MY ACCOUNT</span> to confirm:
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
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={deleteAccountConfirm !== "DELETE MY ACCOUNT" || deleting}
                  onClick={handleDeleteAccount}
                >
                  {deleting ? "Deleting..." : "Delete My Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
