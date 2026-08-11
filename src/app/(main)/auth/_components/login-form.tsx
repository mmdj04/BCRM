"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DEMO_CONFIG } from "@/config/demo-config";

const formSchema = z.object({
  email: z.email({ message: "Por favor, digite um endereço de e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  remember: z.boolean().optional(),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // Check for demo credentials first
      // biome-ignore lint/suspicious/noUnnecessaryConditions: DEMO_CONFIG.enabled is a runtime config flag
      if (
        DEMO_CONFIG.enabled &&
        data.email === DEMO_CONFIG.credentials.email &&
        data.password === DEMO_CONFIG.credentials.password
      ) {
        // Call demo API to create user + license key in database
        const demoRes = await fetch("/api/auth/demo", { method: "POST" });
        const demoResult = await demoRes.json();

        if (!demoRes.ok) {
          toast.error(demoResult.error || "Erro ao configurar conta demo");
          return;
        }

        // Store JWT token in cookie
        document.cookie = `bcrm_token=${demoResult.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

        // Store demo session flag
        const maxAge = data.remember ? 30 * 24 * 60 * 60 : "";
        // biome-ignore lint/suspicious/noDocumentCookie: Demo session cookie must be set client-side
        document.cookie = `bcrm_demo_session=${JSON.stringify({
          user: DEMO_CONFIG.user,
          isDemo: true,
        })}; path=/; ${maxAge ? `max-age=${maxAge}; ` : ""}SameSite=Lax`;

        toast.success("Modo de demonstração ativado!");
        window.location.href = "/activate";
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Credenciais inválidas");
        return;
      }

      document.cookie = `bcrm_token=${result.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      
      if (result.requiresActivation) {
        toast.info("Ative sua conta para continuar");
        window.location.href = "/activate";
      } else if (result.redirect) {
        window.location.href = result.redirect;
      } else {
        toast.success("Login realizado com sucesso!");
        window.location.href = "/dashboard/default";
      }
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
              <FieldLabel htmlFor="login-email">Endereço de E-mail</FieldLabel>
              <Input
                {...field}
                id="login-email"
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
              <FieldLabel htmlFor="login-password">Senha</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="remember"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="login-remember"
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                aria-invalid={fieldState.invalid}
              />
              <FieldContent>
                <FieldLabel htmlFor="login-remember" className="font-normal">
                  Lembrar de mim por 30 dias
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
