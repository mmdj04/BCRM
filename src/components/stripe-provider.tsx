"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { getStripe } from "@/lib/stripe/client";

const lightAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#2d2d2d",
    colorBackground: "#ffffff",
    colorText: "#1f1f1f",
    colorDanger: "#dc2626",
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    borderRadius: "0.625rem",
    spacingUnit: "4px",
    spacingGridRow: "16px",
  },
  rules: {
    ".Input": {
      border: "1px solid #ebebeb",
      boxShadow: "none",
      padding: "12px",
      fontSize: "14px",
    },
    ".Input:focus": {
      border: "1px solid #737373",
      boxShadow: "none",
      outline: "none",
    },
    ".Input--invalid": {
      border: "1px solid #dc2626",
    },
    ".Label": {
      fontSize: "13px",
      fontWeight: "500",
      color: "#1f1f1f",
      marginBottom: "6px",
    },
    ".Tab": {
      border: "1px solid #ebebeb",
      boxShadow: "none",
      backgroundColor: "#f7f7f7",
      color: "#737373",
      fontSize: "13px",
      fontWeight: "500",
    },
    ".Tab:hover": {
      backgroundColor: "#f0f0f0",
      color: "#1f1f1f",
    },
    ".Tab--selected": {
      border: "1px solid #2d2d2d",
      backgroundColor: "#ffffff",
      color: "#1f1f1f",
      boxShadow: "none",
    },
    ".TabIcon--selected": {
      fill: "#2d2d2d",
    },
    ".Divider": {
      backgroundColor: "#ebebeb",
    },
    ".Text": {
      color: "#737373",
    },
  },
};

const darkAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#ebebeb",
    colorBackground: "#1f1f1f",
    colorText: "#fbfbfb",
    colorDanger: "#f87171",
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    borderRadius: "0.625rem",
    spacingUnit: "4px",
    spacingGridRow: "16px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "none",
      padding: "12px",
      fontSize: "14px",
      backgroundColor: "#2d2d2d",
      color: "#fbfbfb",
    },
    ".Input:focus": {
      border: "1px solid rgba(255,255,255,0.3)",
      boxShadow: "none",
      outline: "none",
    },
    ".Input--invalid": {
      border: "1px solid #f87171",
    },
    ".Input::placeholder": {
      color: "rgba(251,251,251,0.4)",
    },
    ".Label": {
      fontSize: "13px",
      fontWeight: "500",
      color: "#fbfbfb",
      marginBottom: "6px",
    },
    ".Tab": {
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "none",
      backgroundColor: "#2d2d2d",
      color: "#999999",
      fontSize: "13px",
      fontWeight: "500",
    },
    ".Tab:hover": {
      backgroundColor: "#3d3d3d",
      color: "#fbfbfb",
    },
    ".Tab--selected": {
      border: "1px solid #ebebeb",
      backgroundColor: "#1f1f1f",
      color: "#fbfbfb",
      boxShadow: "none",
    },
    ".TabIcon--selected": {
      fill: "#ebebeb",
    },
    ".Divider": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    ".Text": {
      color: "#999999",
    },
    ".Text--final": {
      color: "#fbfbfb",
    },
  },
};

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

interface StripeElementsProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

export function StripeElementsProvider({ clientSecret, children }: StripeElementsProviderProps) {
  const isDark = useIsDarkMode();

  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: isDark ? darkAppearance : lightAppearance,
      }}
    >
      {children}
    </Elements>
  );
}

interface UseCreatePaymentIntentParams {
  plan: string;
  interval?: string;
  userId: string;
  email: string;
  isBusiness?: boolean;
  companyName?: string;
  cnpj?: string;
}

export function useCreatePaymentIntent() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIntent = async (params: UseCreatePaymentIntentParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: params.plan,
          interval: params.interval ?? "monthly",
          userId: params.userId,
          email: params.email,
          isBusiness: params.isBusiness,
          companyName: params.companyName,
          cnpj: params.cnpj,
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        return data.clientSecret;
      }
      setError(data.error || "Erro ao criar sessão de pagamento");
      return null;
    } catch {
      setError("Erro ao conectar com o servidor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { clientSecret, loading, error, createIntent, setClientSecret };
}
