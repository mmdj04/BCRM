"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCheckout } from "@/hooks/use-checkout";

import type { Plan } from "./data";

type PricingCardsProps = {
  plans: Plan[];
  userEmail?: string;
  userId?: string;
};

export function PricingCards({ plans, userEmail, userId }: PricingCardsProps) {
  const [annual, setAnnual] = useState(false);
  const { checkout, loading } = useCheckout();

  const handleCheckout = async (planId: string) => {
    if (!userEmail || !userId) {
      window.location.href = "/auth/v1/login";
      return;
    }
    await checkout({
      plan: planId,
      interval: annual ? "yearly" : "monthly",
      email: userEmail,
      userId,
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm ${!annual ? "font-medium" : "text-muted-foreground"}`}>Mensal</span>
        <button
          type="button"
          onClick={() => setAnnual(!annual)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
            annual ? "bg-primary" : "bg-input"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
              annual ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-sm ${annual ? "font-medium" : "text-muted-foreground"}`}>Anual</span>
      </div>

      <div className="flex flex-col gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-md" : ""}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                {plan.badge && <Badge className="bg-primary text-primary-foreground text-xs">{plan.badge}</Badge>}
              </div>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="flex items-baseline gap-1">
                {plan.monthlyPrice !== null ? (
                  <>
                    <span className="text-muted-foreground text-sm">R$</span>
                    <span className="text-4xl font-bold">{formatPrice(annual ? plan.yearlyPrice! : plan.monthlyPrice)}</span>
                    <span className="text-muted-foreground text-sm">/{annual ? "ano" : "mês"}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">Personalizado</span>
                )}
              </div>
              <Separator />
              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => plan.monthlyPrice !== null && handleCheckout(plan.id)}
                disabled={loading || plan.monthlyPrice === null}
              >
                {loading ? "Processando..." : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
