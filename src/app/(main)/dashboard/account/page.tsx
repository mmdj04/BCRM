import { DangerZoneSection } from "./_components/danger-zone-section";
import { PasswordSection } from "./_components/password-section";
import { ProfileSection } from "./_components/profile-section";

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conta</h1>
        <p className="text-muted-foreground text-sm">Gerencie as configurações e preferências da sua conta.</p>
      </div>

      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-8">
          <ProfileSection />
          <PasswordSection />
        </div>
        <div className="xl:col-span-4">
          <DangerZoneSection />
        </div>
      </div>
    </div>
  );
}
