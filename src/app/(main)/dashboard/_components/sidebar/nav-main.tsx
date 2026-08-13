"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, MailIcon, PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useI18n } from "@/lib/i18n/provider";
import { navTranslations } from "@/lib/i18n/nav-translations";
import { cn } from "@/lib/utils";
import type {
  NavBadge,
  NavGroup,
  NavMainItem,
  NavMainLinkItem,
  NavMainParentItem,
} from "@/navigation/sidebar/sidebar-items";

interface NavMainProps {
  readonly items: readonly NavGroup[];
}
interface NavItemProps {
  readonly item: NavMainItem;
  readonly isItemActive: (item: NavMainItem) => boolean;
  readonly isSubItemActive: (url: string) => boolean;
  readonly isSubmenuOpen: (item: NavMainParentItem) => boolean;
  readonly translateTitle: (title: string) => string;
}
interface NavLinkItemProps { readonly item: NavMainLinkItem; readonly isActive: boolean; readonly showIconFallback: boolean; readonly title: string; }
interface NavLinkIconProps { readonly item: NavMainLinkItem; readonly showFallback: boolean; readonly title: string; }
interface NavDropdownItemProps { readonly item: NavMainParentItem; readonly isActive: boolean; readonly isSubItemActive: (url: string) => boolean; readonly title: string; readonly translateTitle: (title: string) => string; }
interface NavCollapsibleItemProps { readonly item: NavMainParentItem; readonly isActive: boolean; readonly defaultOpen: boolean; readonly isSubItemActive: (url: string) => boolean; readonly title: string; readonly translateTitle: (title: string) => string; }

function CollapsedIconFallback({ title }: { title: string }) {
  return <span className="flex size-4 shrink-0 items-center justify-center rounded-xs font-medium text-[10px] outline">{title.slice(0, 1)}</span>;
}
function hasSubItems(item: NavMainItem): item is NavMainParentItem { return Boolean(item.subItems?.length); }

export function NavMain({ items }: NavMainProps) {
  const path = usePathname();
  const { locale } = useI18n();
  const translations = navTranslations[locale];
  const translateTitle = (title: string) => translations.items[title as keyof typeof translations.items] ?? title;
  const translateGroup = (label: string) => translations.groups[label as keyof typeof translations.groups] ?? label;

  const isItemActive = (item: NavMainItem) => hasSubItems(item) ? item.subItems.some((sub) => path.startsWith(sub.url)) : path === item.url;
  const isSubItemActive = (url: string) => path === url;
  const isSubmenuOpen = (item: NavMainParentItem) => item.subItems.some((sub) => path.startsWith(sub.url));

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton tooltip={translations.actions.quickCreate} className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground">
                <PlusCircleIcon /><span>{translations.actions.quickCreate}</span>
              </SidebarMenuButton>
              <Button size="icon" className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0" variant="outline" aria-label={translations.actions.inbox}>
                <MailIcon /><span className="sr-only">{translations.actions.inbox}</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          {group.label && <SidebarGroupLabel className="group-data-[collapsible=icon]:pointer-events-none">{translateGroup(group.label)}</SidebarGroupLabel>}
          <SidebarGroupContent><SidebarMenu>{group.items.map((item) => <NavItem key={item.id} item={item} isItemActive={isItemActive} isSubItemActive={isSubItemActive} isSubmenuOpen={isSubmenuOpen} translateTitle={translateTitle} />)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

function NavItem({ item, isItemActive, isSubItemActive, isSubmenuOpen, translateTitle }: NavItemProps) {
  const { state, isMobile } = useSidebar();
  const isCollapsedDesktop = state === "collapsed" && !isMobile;
  const title = translateTitle(item.title);
  if (!hasSubItems(item)) return <NavLinkItem item={item} isActive={isItemActive(item)} showIconFallback={isCollapsedDesktop} title={title} />;
  if (isCollapsedDesktop) return <NavDropdownItem item={item} isActive={isItemActive(item)} isSubItemActive={isSubItemActive} title={title} translateTitle={translateTitle} />;
  return <NavCollapsibleItem item={item} isActive={isItemActive(item)} defaultOpen={isSubmenuOpen(item)} isSubItemActive={isSubItemActive} title={title} translateTitle={translateTitle} />;
}

function NavLinkItem({ item, isActive, showIconFallback, title }: NavLinkItemProps) {
  return <SidebarMenuItem>
    <SidebarMenuButton asChild aria-disabled={item.disabled} tooltip={title} isActive={isActive}>
      <Link prefetch={false} href={item.url} target={item.newTab ? "_blank" : undefined} rel={item.newTab ? "noreferrer" : undefined}><NavLinkIcon item={item} showFallback={showIconFallback} title={title} /><span>{title}</span></Link>
    </SidebarMenuButton>
    <NavItemBadge badge={item.badge} />
  </SidebarMenuItem>;
}
function NavLinkIcon({ item, showFallback, title }: NavLinkIconProps) {
  const Icon = item.icon;
  if (Icon) return <Icon />;
  if (showFallback) return <CollapsedIconFallback title={title} />;
  return null;
}
function NavDropdownItem({ item, isActive, isSubItemActive, title, translateTitle }: NavDropdownItemProps) {
  const Icon = item.icon;
  return <SidebarMenuItem><DropdownMenu><DropdownMenuTrigger asChild><SidebarMenuButton tooltip={title} isActive={isActive} disabled={item.disabled}>{Icon ? <Icon /> : <CollapsedIconFallback title={title} />}<span>{title}</span></SidebarMenuButton></DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start" sideOffset={12} className="w-48"><DropdownMenuGroup>{item.subItems.map((subItem) => { const SubIcon = subItem.icon; const subTitle = translateTitle(subItem.title); return <DropdownMenuItem key={subItem.id} asChild disabled={subItem.disabled}><Link prefetch={false} href={subItem.url} target={subItem.newTab ? "_blank" : undefined} rel={subItem.newTab ? "noreferrer" : undefined} aria-current={isSubItemActive(subItem.url) ? "page" : undefined} className="flex items-center gap-2">{SubIcon && <SubIcon />}<span>{subTitle}</span></Link></DropdownMenuItem>; })}</DropdownMenuGroup></DropdownMenuContent>
  </DropdownMenu></SidebarMenuItem>;
}
function NavCollapsibleItem({ item, isActive, defaultOpen, isSubItemActive, title, translateTitle }: NavCollapsibleItemProps) {
  const Icon = item.icon;
  return <Collapsible asChild defaultOpen={defaultOpen} className="group/collapsible"><SidebarMenuItem><CollapsibleTrigger asChild><SidebarMenuButton tooltip={title} isActive={isActive} disabled={item.disabled}>{Icon && <Icon />}<span>{title}</span><ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /></SidebarMenuButton></CollapsibleTrigger><NavItemBadge badge={item.badge} />
    <CollapsibleContent><SidebarMenuSub>{item.subItems.map((subItem) => { const SubIcon = subItem.icon; const subTitle = translateTitle(subItem.title); return <SidebarMenuSubItem key={subItem.id}><SidebarMenuSubButton asChild aria-disabled={subItem.disabled} isActive={isSubItemActive(subItem.url)}><Link prefetch={false} href={subItem.url} target={subItem.newTab ? "_blank" : undefined} rel={subItem.newTab ? "noreferrer" : undefined}>{SubIcon && <SubIcon />}<span>{subTitle}</span></Link></SidebarMenuSubButton></SidebarMenuSubItem>; })}</SidebarMenuSub></CollapsibleContent>
  </SidebarMenuItem></Collapsible>;
}
function NavItemBadge({ badge }: { badge?: NavBadge }) {
  const { locale } = useI18n();
  if (!badge) return null;
  return <SidebarMenuBadge className={cn("rounded-sm border capitalize", badge === "new" && "border-green-600 text-green-600 peer-hover/menu-button:text-green-600 peer-data-active/menu-button:text-green-600", badge === "soon" && "border-muted-foreground text-muted-foreground")}>{navTranslations[locale].actions[badge]}</SidebarMenuBadge>;
}
