import type { Locale } from "./config";

export const translations = {
  "pt-BR": {
    auth: {
      login: {
        welcomeTitle: "Olá novamente",
        welcomeSubtitle: "Entre para continuar",
        title: "Entrar",
        description: "Bem-vindo de volta. Digite seu e-mail e sua senha para acessar sua conta.",
        noAccount: "Ainda não tem uma conta?",
        register: "Criar conta",
      },
      register: {
        welcomeTitle: "Boas-vindas!",
        welcomeSubtitle: "Você está no lugar certo.",
        title: "Criar conta",
        description: "Preencha seus dados abaixo para criar sua conta no BCRM.",
        alreadyAccount: "Já tem uma conta?",
        login: "Entrar",
      },
      form: {
        email: "Endereço de e-mail",
        emailPlaceholder: "voce@exemplo.com",
        password: "Senha",
        confirmPassword: "Confirmar senha",
        remember: "Lembrar de mim por 30 dias",
        login: "Entrar",
        register: "Criar conta",
        google: "Continuar com Google",
        invalidEmail: "Digite um endereço de e-mail válido.",
        passwordMin: "A senha deve ter pelo menos 6 caracteres.",
        confirmPasswordMin: "A confirmação da senha deve ter pelo menos 6 caracteres.",
        passwordMismatch: "As senhas não coincidem.",
        submitted: "Os seguintes dados foram enviados",
      },
      locale: {
        label: "Idioma",
      },
    },
  },
  "en-US": {
    auth: {
      login: {
        welcomeTitle: "Hello again",
        welcomeSubtitle: "Login to continue",
        title: "Login",
        description: "Welcome back. Enter your email and password to access your account.",
        noAccount: "Don't have an account?",
        register: "Register",
      },
      register: {
        welcomeTitle: "Welcome!",
        welcomeSubtitle: "You're in the right place.",
        title: "Register",
        description: "Fill in your details below to create your BCRM account.",
        alreadyAccount: "Already have an account?",
        login: "Login",
      },
      form: {
        email: "Email address",
        emailPlaceholder: "you@example.com",
        password: "Password",
        confirmPassword: "Confirm password",
        remember: "Remember me for 30 days",
        login: "Login",
        register: "Register",
        google: "Continue with Google",
        invalidEmail: "Please enter a valid email address.",
        passwordMin: "Password must be at least 6 characters.",
        confirmPasswordMin: "Confirm password must be at least 6 characters.",
        passwordMismatch: "Passwords do not match.",
        submitted: "You submitted the following values",
      },
      locale: {
        label: "Language",
      },
    },
  },
} satisfies Record<Locale, unknown>;

export type TranslationSchema = typeof translations["pt-BR"];
