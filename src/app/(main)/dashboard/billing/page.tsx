import { BillingHistory } from "./_components/billing-history";
import { CurrentPlan } from "./_components/current-plan";
import { billingHistory, plans } from "./_components/data";
import { PricingCards } from "./_components/pricing-cards";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-sm">Manage your subscription, payment methods, and billing history.</p>
      </div>

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          <PricingCards plans={plans} />
        </div>
        <div className="flex flex-col gap-4 xl:col-span-4">
          <CurrentPlan />
        </div>
      </div>

      <BillingHistory entries={billingHistory} />
    </div>
  );
}
