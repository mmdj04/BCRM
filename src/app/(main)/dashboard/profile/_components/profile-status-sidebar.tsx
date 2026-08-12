import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react";

import type { ProfileRecord } from "./profile-data";

interface ProfileStatusSidebarProps {
  profile: ProfileRecord;
}

export function ProfileStatusSidebar({ profile }: ProfileStatusSidebarProps) {
  const profileCompletion = 92;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Almost there! Complete your information.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
          <p className="text-muted-foreground text-xs">
            Complete your profile to get access to all features.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Next Leave</p>
              <p className="text-muted-foreground text-sm">{profile.nextLeave}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Remaining Leave</p>
              <p className="text-muted-foreground text-sm">{profile.remainingLeave}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Documents</p>
              <p className="text-muted-foreground text-sm">{profile.documents.length} documents</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button variant="outline" className="justify-start">
            <FileText className="mr-2 size-4" />
            Download Contract
          </Button>
          <Button variant="outline" className="justify-start">
            <AlertCircle className="mr-2 size-4" />
            Request Time Off
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
