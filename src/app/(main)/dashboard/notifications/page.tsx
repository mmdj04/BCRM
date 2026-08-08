import { notifications } from "./_components/data";
import { NotificationsList } from "./_components/notifications-list";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Notificações</h1>
        <p className="text-muted-foreground text-sm">Mantenha-se atualizado com as últimas atividades e alertas.</p>
      </div>

      <NotificationsList notifications={notifications} />
    </div>
  );
}
