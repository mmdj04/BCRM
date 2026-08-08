import { notifications } from "./_components/data";
import { NotificationsList } from "./_components/notifications-list";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground text-sm">Stay updated with the latest activity and alerts.</p>
      </div>

      <NotificationsList notifications={notifications} />
    </div>
  );
}
