"use client";

import { CheckoutElementsProvider, useCheckoutElements, PaymentElement, CurrencySelectorElement } from "@stripe/react-stripe-js/checkout";
import { useEffect, useState } from "react";

import { getStripe } from "@/lib/stripe/client";

export { CurrencySelectorElement } from "@stripe/react-stripe-js/checkout";

const lightAppearance = {
  variables: {
    colorPrimary: "#2d2d2d",
    colorBackground: "#ffffff",
    colorText: "#1f1f1f",
    colorDanger: "#dc2626",
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
    borderRadius: "0.625rem",
  },
};

const darkAppearance = {
  variables: {
    colorPrimary: "#ebebeb",
    colorBackground: "#1f1f1f",
    colorText: "#fbfbfb",
    colorDanger: "#f87171",
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
    borderRadius: "0.625rem",
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
    <CheckoutElementsProvider
      stripe={getStripe()}
      options={{
        clientSecret,
        adaptivePricing: { allowed: true },
        elementsOptions: {
          appearance: isDark ? darkAppearance : lightAppearance,
        },
      }}
    >
      {children}
    </CheckoutElementsProvider>
  );
}

export function useCheckoutConfirm() {
  const checkoutState = useCheckoutElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    if (checkoutState.type !== "success") {
      setError("Pagamento ainda não está pronto.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const result = await checkoutState.checkout.confirm();

      if (result.type === "error") {
        setError(result.error.message ?? "Ocorreu um erro ao processar o pagamento.");
        setProcessing(false);
      }
      // On success, user is redirected to return_url
    } catch {
      setError("Erro ao processar pagamento.");
      setProcessing(false);
    }
  };

  return { confirm, processing, error };
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
