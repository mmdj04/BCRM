import { ProfileHeader } from "./_components/profile-header";
import { ProfileOverview } from "./_components/profile-overview";
import { ProfileStatusSidebar } from "./_components/profile-status-sidebar";
import { profile } from "./_components/profile-data";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your personal information and preferences.</p>
      </div>

      <ProfileHeader profile={profile} />

      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-8">
          <ProfileOverview profile={profile} />
        </div>
        <div className="xl:col-span-4">
          <ProfileStatusSidebar profile={profile} />
        </div>
      </div>
    </div>
  );
}
