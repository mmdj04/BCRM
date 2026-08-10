"use client";

import { useState } from "react";

import { Check, CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  billingIntervals,
  intervalPrice,
  intervalPricePerMonth,
  type BillingInterval,
  type Plan,
} from "./data";

type PricingCardsProps = {
  plans: Plan[];
  onSelectPlan?: (planId: string, interval: BillingInterval) => void;
};

export function PricingCards({ plans, onSelectPlan }: PricingCardsProps) {
  const [selectedInterval, setSelectedInterval] = useState<BillingInterval>("monthly");

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const intervalConfig = billingIntervals.find((i) => i.id === selectedInterval)!;
  const monthsLabel = selectedInterval === "quarterly" ? "3 meses" : selectedInterval === "annual" ? "1 ano" : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Billing Interval Selector */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <CreditCard className="size-4" />
          <span>Forma de pagamento</span>
        </div>
        <ToggleGroup
          type="single"
          value={selectedInterval}
          onValueChange={(value) => {
            if (value) setSelectedInterval(value as BillingInterval);
          }}
          className="rounded-lg border bg-muted p-1"
        >
          {billingIntervals.map((interval) => (
            <ToggleGroupItem
              key={interval.id}
              value={interval.id}
              className="relative gap-1.5 px-4 text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm"
            >
              {interval.label}
              {interval.discount > 0 && (
                <Badge variant="default" className="ml-1 bg-green-600 text-white text-[10px] px-1.5 py-0">
                  -{Math.round(interval.discount * 100)}%
                </Badge>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {monthsLabel && (
          <p className="text-muted-foreground text-xs">
            Paga de uma vez — {monthsLabel} adiantado, sem mensalidade
          </p>
        )}
      </div>

      {/* Plan Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const planPricePerMonth = plan.monthlyPrice !== null ? intervalPricePerMonth(plan.monthlyPrice, selectedInterval) : 0;
          const planTotal = plan.monthlyPrice !== null ? intervalPrice(plan.monthlyPrice, selectedInterval) : 0;

          return (
            <Card key={plan.id} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-md" : ""}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {plan.badge && <Badge className="bg-primary text-primary-foreground text-xs">{plan.badge}</Badge>}
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Price */}
                <div className="flex flex-col gap-1">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-muted-foreground text-sm">R$</span>
                        <span className="font-bold text-4xl">{formatPrice(planPricePerMonth)}</span>
                        <span className="text-muted-foreground text-sm">/mês</span>
                      </div>
                      {selectedInterval !== "monthly" && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <CreditCard className="size-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Total: R$ {formatPrice(planTotal)} ({monthsLabel} adiantado)
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="font-bold text-4xl">Personalizado</span>
                  )}
                </div>

                {/* Base Features */}
                <div className="flex flex-col gap-2">
                  {plan.baseFeatures.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {plan.baseFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Extra Features */}
                  {plan.extraFeatures.length > 0 && (
                    <>
                      {plan.baseFeatures.length > 0 && <Separator className="my-1" />}
                      <p className="font-medium text-primary text-xs">
                        {plan.featureHeader ?? "Tudo no Plano anterior, mais:"}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {plan.extraFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span className="font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => onSelectPlan?.(plan.id, selectedInterval)}
                  disabled={plan.monthlyPrice === null}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
