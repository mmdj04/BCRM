import { BillingHistory } from "./_components/billing-history";
import { CurrentPlan } from "./_components/current-plan";
import { billingHistory, computeOptions, featureComparison, faqItems, plans } from "./_components/data";
import { Faq } from "./_components/faq";
import { FeatureComparison } from "./_components/feature-comparison";
import { FineTune } from "./_components/fine-tune";
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
        <div className="flex flex-col gap-6 xl:col-span-8">
          <FeatureComparison categories={featureComparison} />
          <FineTune options={computeOptions} />
          <Faq items={faqItems} />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-4">
          <CurrentPlan />
          <BillingHistory entries={billingHistory} />
        </div>
      </div>
    </div>
  );
}
