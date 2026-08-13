import { DefaultDashboardI18n } from "./_components/default-dashboard-i18n";
import { MetricCards } from "./_components/metric-cards";
import { PerformanceOverview } from "./_components/performance-overview";
import { SubscriberOverview } from "./_components/subscriber-overview";

export default function Page() {
  return (
    <DefaultDashboardI18n>
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <MetricCards />
        <PerformanceOverview />
        <SubscriberOverview />
      </div>
    </DefaultDashboardI18n>
  );
}
