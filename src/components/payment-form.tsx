"use client";

import { PaymentElement } from "@stripe/react-stripe-js/checkout";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCheckoutConfirm } from "@/components/stripe-provider";

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
  const { confirm, processing, error: confirmError } = useCheckoutConfirm();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    await confirm();
  };

  const errorMessage = localError || confirmError;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={paymentElementOptions} className="stripe-payment-element" />

      {errorMessage && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-destructive text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row-reverse">
        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
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
