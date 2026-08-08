"use client";

import { useState } from "react";
import { toast } from "sonner";

import { siGoogle } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        toast.error(error.message);
      }
    } catch {
      toast.error("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="secondary" className={cn(className)} onClick={signInWithGoogle} disabled={loading} {...props}>
      <SimpleIcon icon={siGoogle} className="size-4" />
      {loading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}
