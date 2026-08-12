"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileEmploymentDetails } from "./profile-employment-details";
import { ProfileDocuments } from "./profile-documents";
import { ProfilePersonalDetails } from "./profile-personal-details";
import { TimeOffDetails } from "./profile-time-off-details";

import type { ProfileRecord } from "./profile-data";

interface ProfileOverviewProps {
  profile: ProfileRecord;
}

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  const [activeTab, setActiveTab] = useState("employment");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="employment">Employment</TabsTrigger>
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="time-off">Time Off</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      <TabsContent value="employment" className="mt-4">
        <ProfileEmploymentDetails profile={profile} />
      </TabsContent>

      <TabsContent value="personal" className="mt-4">
        <ProfilePersonalDetails profile={profile} />
      </TabsContent>

      <TabsContent value="time-off" className="mt-4">
        <TimeOffDetails profile={profile} />
      </TabsContent>

      <TabsContent value="documents" className="mt-4">
        <ProfileDocuments documents={profile.documents} />
      </TabsContent>
    </Tabs>
  );
}
