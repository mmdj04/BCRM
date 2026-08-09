"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordStrengthIndicator } from "@/components/password-strength";
import { getPasswordStrength } from "@/hooks/use-password-strength";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const formSchema = z
  .object({
    email: z.email({ message: "Por favor, digite um endereço de e-mail válido." }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
      .regex(/[A-Z]/, { message: "A senha deve conter pelo menos 1 letra maiúscula." })
      .regex(/[a-z]/, { message: "A senha deve conter pelo menos 1 letra minúscula." })
      .regex(/[0-9]/, { message: "A senha deve conter pelo menos 1 número." })
      .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos 1 caractere especial (!@#$%^&*)." }),
    confirmPassword: z.string().min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({ control: form.control, name: "password" });
  const confirmPasswordValue = useWatch({ control: form.control, name: "confirmPassword" });
  const strength = getPasswordStrength(passwordValue ?? "");
  const passwordsMatch = passwordValue && confirmPasswordValue && passwordValue === confirmPasswordValue;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Conta criada! Verifique seu e-mail para confirmar.");
      router.push("/auth/v1/login");
    } catch {
      toast.error("Ocorreu um erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-email">Endereço de E-mail</FieldLabel>
              <Input
                {...field}
                id="register-email"
                type="email"
                placeholder="seu@email.com.br"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-password">Senha</FieldLabel>
              <Input
                {...field}
                id="register-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {!fieldState.invalid && passwordValue && <PasswordStrengthIndicator strength={strength} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-confirm-password">Confirmar Senha</FieldLabel>
              <Input
                {...field}
                id="register-confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {!fieldState.invalid && confirmPasswordValue && (
                <div className="flex items-center gap-2 text-xs">
                  {passwordsMatch ? (
                    <Check className="size-3.5 shrink-0 text-emerald-500" />
                  ) : (
                    <X className="size-3.5 shrink-0 text-destructive" />
                  )}
                  <span className={cn(passwordsMatch ? "text-emerald-500" : "text-destructive")}>
                    {passwordsMatch ? "As senhas coincidem" : "As senhas não coincidem"}
                  </span>
                </div>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Criando conta..." : "Cadastrar"}
      </Button>
    </form>
  );
}
