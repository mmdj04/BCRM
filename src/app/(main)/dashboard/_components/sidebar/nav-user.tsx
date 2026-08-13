"use client";

import { CircleUser, CreditCard, EllipsisVertical, LogOut, MessageSquareDot } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useI18n } from "@/lib/i18n/provider";
import { navTranslations } from "@/lib/i18n/nav-translations";
import { getInitials } from "@/lib/utils";

export function NavUser({ user }: { readonly user: { readonly name: string; readonly email: string; readonly avatar: string } }) {
  const { isMobile } = useSidebar();
  const { locale } = useI18n();
  const t = navTranslations[locale];
  return <SidebarMenu><SidebarMenuItem><DropdownMenu>
    <DropdownMenuTrigger asChild><SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
      <Avatar className="h-8 w-8 rounded-lg grayscale"><AvatarImage src={user.avatar || undefined} alt={user.name} /><AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback></Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-medium">{user.name}</span><span className="truncate text-muted-foreground text-xs">{user.email}</span></div><EllipsisVertical className="ml-auto size-4" />
    </SidebarMenuButton></DropdownMenuTrigger>
    <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
      <DropdownMenuLabel className="p-0 font-normal"><div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"><Avatar className="h-8 w-8 rounded-lg"><AvatarImage src={user.avatar || undefined} alt={user.name} /><AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback></Avatar><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-medium">{user.name}</span><span className="truncate text-muted-foreground text-xs">{user.email}</span></div></div></DropdownMenuLabel>
      <DropdownMenuSeparator /><DropdownMenuGroup>
        <DropdownMenuItem><CircleUser />{t.account}</DropdownMenuItem>
        <DropdownMenuItem><CreditCard />{t.billing}</DropdownMenuItem>
        <DropdownMenuItem><MessageSquareDot />{t.notifications}</DropdownMenuItem>
      </DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuItem><LogOut />{t.logout}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu></SidebarMenuItem></SidebarMenu>;
}
