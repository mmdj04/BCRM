"use client";

import { useAuth } from "@/lib/supabase/auth-context";

import { BillingHistory } from "./billing-history";
import { CurrentPlan } from "./current-plan";
import { computeOptions, faqItems, featureComparison, plans } from "./data";
import { Faq } from "./faq";
import { FeatureComparison } from "./feature-comparison";
import { FineTune } from "./fine-tune";
import { PricingCards } from "./pricing-cards";

export function BillingContent() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Preços</h1>
        <p className="text-muted-foreground text-sm">
          Comece grátis, escale conforme cresce. Pague apenas pelo que usar.
        </p>
      </div>

      <PricingCards plans={plans} userEmail={user?.email} userId={user?.id} />

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-8">
          <FeatureComparison categories={featureComparison} />
          <FineTune options={computeOptions} />
          <Faq items={faqItems} />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-4">
          <CurrentPlan />
          <BillingHistory />
        </div>
      </div>
    </div>
  );
}
