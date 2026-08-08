import { BillingHistory } from "./_components/billing-history";
import { CurrentPlan } from "./_components/current-plan";
import { billingHistory, featureComparison, plans } from "./_components/data";
import { FeatureComparison } from "./_components/feature-comparison";
import { PricingCards } from "./_components/pricing-cards";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
        <p className="text-muted-foreground text-sm">Start for free, scale as you grow. Pay only for what you use.</p>
      </div>

      <PricingCards plans={plans} />

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12">
        <div className="xl:col-span-8">
          <FeatureComparison categories={featureComparison} />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-4">
          <CurrentPlan />
          <BillingHistory entries={billingHistory} />
        </div>
      </div>
    </div>
  );
}
