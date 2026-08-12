"use client";

import { useState } from "react";

import { useAuth } from "@/lib/supabase/auth-context";

import { BillingHistory } from "./billing-history";
import { ChangePlanDialog } from "./change-plan-dialog";
import { CurrentPlan } from "./current-plan";
import type { BillingInterval } from "./data";
import { faqItems, featureComparison, plans } from "./data";
import { Faq } from "./faq";
import { FeatureComparison } from "./feature-comparison";
import { PricingCards } from "./pricing-cards";

export function BillingContent() {
  const { isDemo } = useAuth();
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [changePlanTrigger, setChangePlanTrigger] = useState<{ plan: string; compute: string; pitr: string }>({
    plan: "pro",
    compute: "medium",
    pitr: "none",
  });

  const handleSelectPlan = (planId: string, _interval: BillingInterval) => {
    if (isDemo) return;
    setChangePlanTrigger({ plan: planId, compute: "medium", pitr: "none" });
    setChangePlanOpen(true);
  };

  const handleOpenChangePlan = (plan: string, compute: string, pitr: string) => {
    setChangePlanTrigger({ plan, compute, pitr });
    setChangePlanOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Preços</h1>
        <p className="text-muted-foreground text-sm">
          Comece grátis, escale conforme cresce. Pague apenas pelo que usar.
        </p>
      </div>

      <PricingCards plans={plans} onSelectPlan={handleSelectPlan} />

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-8">
          <FeatureComparison categories={featureComparison} />
          <Faq items={faqItems} />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-4">
          <CurrentPlan onOpenChangePlan={handleOpenChangePlan} />
          <BillingHistory />
        </div>
      </div>

      <ChangePlanDialog
        open={changePlanOpen}
        onOpenChange={setChangePlanOpen}
        currentPlan={changePlanTrigger.plan}
        currentCompute={changePlanTrigger.compute}
        currentPitr={changePlanTrigger.pitr}
        onPlanChanged={() => {
          // Plan changed - handled by parent
        }}
      />
    </div>
  );
}
