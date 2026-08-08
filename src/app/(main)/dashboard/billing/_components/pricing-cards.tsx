"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { Plan } from "../data";

type PricingCardsProps = {
  plans: Plan[];
};

export function PricingCards({ plans }: PricingCardsProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className={`text-sm ${!annual ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
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
        <span className={`text-sm ${annual ? "font-medium" : "text-muted-foreground"}`}>
          Annual
          <Badge
            variant="outline"
            className="ml-1.5 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
          >
            Save 20%
          </Badge>
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.highlighted ? "border-primary shadow-md" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                {plan.badge && <Badge className="bg-primary text-primary-foreground">{plan.badge}</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${annual ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-muted-foreground">/{annual ? "year" : "month"}</span>
              </div>
              <Separator />
              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
