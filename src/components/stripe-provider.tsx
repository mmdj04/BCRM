"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { getStripe } from "@/lib/stripe/client";

interface StripeElementsProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

export function StripeElementsProvider({ clientSecret, children }: StripeElementsProviderProps) {
  return (
    <Elements stripe={getStripe()} options={{ clientSecret, appearance: { theme: "stripe" } }}>
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
