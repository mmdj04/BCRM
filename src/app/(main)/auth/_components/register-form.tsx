"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/provider";

export function RegisterForm() {
  const { t } = useI18n();
  const formSchema = z
    .object({
      email: z.email({ message: t.auth.form.invalidEmail }),
      password: z.string().min(6, { message: t.auth.form.passwordMin }),
      confirmPassword: z.string().min(6, { message: t.auth.form.confirmPasswordMin }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.auth.form.passwordMismatch,
      path: ["confirmPassword"],
    });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast(t.auth.form.submitted, {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-email">{t.auth.form.email}</FieldLabel>
              <Input {...field} id="register-email" type="email" placeholder={t.auth.form.emailPlaceholder} autoComplete="email" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-password">{t.auth.form.password}</FieldLabel>
              <Input {...field} id="register-password" type="password" placeholder="••••••••" autoComplete="new-password" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-confirm-password">{t.auth.form.confirmPassword}</FieldLabel>
              <Input {...field} id="register-confirm-password" type="password" placeholder="••••••••" autoComplete="new-password" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit">{t.auth.form.register}</Button>
    </form>
  );
}
