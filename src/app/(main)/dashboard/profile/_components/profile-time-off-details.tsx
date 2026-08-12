import { Separator } from "@/components/ui/separator";

import type { ProfileRecord } from "./profile-data";

export function TimeOffDetails({ profile }: { profile: ProfileRecord }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">Leave balance</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Leave policy</dt>
              <dd className="text-sm">{profile.leavePolicy}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Annual leave allowance</dt>
              <dd className="text-sm">{profile.annualLeaveAllowance}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Remaining leave</dt>
              <dd className="text-sm">{profile.remainingLeave}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Carried over leave</dt>
              <dd className="text-sm">{profile.carriedOverLeave}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Used leave</dt>
              <dd className="text-sm">{profile.usedLeave}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Scheduled leave</dt>
              <dd className="text-sm">{profile.scheduledLeave}</dd>
            </div>
          </div>
        </dl>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">Leave details</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Pending leave requests</dt>
              <dd className="text-sm">{profile.pendingLeaveRequests}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Leave year</dt>
              <dd className="text-sm">{profile.leaveYear}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Next leave</dt>
              <dd className="text-sm">{profile.nextLeave}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">Last working day</dt>
              <dd className="text-sm">{profile.lastWorkingDay}</dd>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
}
