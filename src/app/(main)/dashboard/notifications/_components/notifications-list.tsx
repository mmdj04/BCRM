"use client";

import { useState } from "react";

import { AlertCircle, AlertTriangle, Bell, Check, CheckCheck, Info, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { Notification } from "./data";

type NotificationsListProps = {
  notifications: Notification[];
};

const typeStyles: Record<string, string> = {
  info: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  success: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  warning: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="size-4" />,
  success: <Check className="size-4" />,
  warning: <AlertTriangle className="size-4" />,
  error: <AlertCircle className="size-4" />,
};

export function NotificationsList({ notifications: initialNotifications }: NotificationsListProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Notificações</CardTitle>
            <CardDescription>
              {unreadCount > 0 ? `Você tem ${unreadCount} notificação(ões) não lida(s)` : "Tudo em dia!"}
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 size-4" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="mb-3 size-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Sem notificações</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-3 border-b px-6 py-4 transition-colors",
                !notification.read && "bg-muted/30",
              )}
            >
              <div className={cn("mt-0.5 rounded-full p-1.5", typeStyles[notification.type])}>
                {typeIcons[notification.type]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={cn("font-medium text-sm", !notification.read && "font-bold")}>{notification.title}</p>
                  {!notification.read && (
                    <Badge variant="secondary" className="text-xs">
                      Novo
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-muted-foreground text-sm">{notification.description}</p>
                <p className="mt-1 text-muted-foreground text-xs">{notification.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => markAsRead(notification.id)}>
                    <Check className="size-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
