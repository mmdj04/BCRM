"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const paymentElementOptions: StripePaymentElementOptions = {
  layout: "tabs",
  fields: {
    billingDetails: {
      name: "auto",
      email: "auto",
    },
  },
};

interface PaymentFormProps {
  planName: string;
  planPrice: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PaymentForm({ planName, planPrice, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/billing?success=true`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Ocorreu um erro ao processar o pagamento.");
      setProcessing(false);
    }
    // On success, user is redirected to return_url
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={paymentElementOptions} className="stripe-payment-element" />

      {errorMessage && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-destructive text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row-reverse">
        <Button type="submit" disabled={!stripe || processing} className="w-full sm:w-auto">
          {processing ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processando...
            </span>
          ) : (
            `Confirmar Pagamento - ${planPrice}/mês`
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={processing} className="w-full sm:w-auto">
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
