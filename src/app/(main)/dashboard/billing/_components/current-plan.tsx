import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const currentPlan = {
  name: "Pro",
  status: "active",
  nextBilling: "Sep 1, 2026",
  amount: 349.99,
  usage: {
    storage: { used: 42, total: 100, unit: "GB" },
    teamMembers: { used: 12, total: 25 },
    apiCalls: { used: 85000, total: 100000 },
  },
};

export function CurrentPlan() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <CardDescription>Your active subscription and usage.</CardDescription>
          </div>
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
          >
            {currentPlan.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-lg font-medium">{currentPlan.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Next billing</p>
            <p className="text-lg font-medium">{currentPlan.nextBilling}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-lg font-medium">${currentPlan.amount}/mo</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Storage</span>
              <span>
                {currentPlan.usage.storage.used} / {currentPlan.usage.storage.total} {currentPlan.usage.storage.unit}
              </span>
            </div>
            <Progress value={(currentPlan.usage.storage.used / currentPlan.usage.storage.total) * 100} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Team Members</span>
              <span>
                {currentPlan.usage.teamMembers.used} / {currentPlan.usage.teamMembers.total}
              </span>
            </div>
            <Progress value={(currentPlan.usage.teamMembers.used / currentPlan.usage.teamMembers.total) * 100} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">API Calls</span>
              <span>
                {currentPlan.usage.apiCalls.used.toLocaleString()} / {currentPlan.usage.apiCalls.total.toLocaleString()}
              </span>
            </div>
            <Progress value={(currentPlan.usage.apiCalls.used / currentPlan.usage.apiCalls.total) * 100} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
