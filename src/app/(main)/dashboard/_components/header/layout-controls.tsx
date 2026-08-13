"use client";

import { Settings } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type FontKey, fontOptions } from "@/lib/fonts/registry";
import type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant } from "@/lib/preferences/layout";
import { THEME_PRESET_OPTIONS, type ThemeMode, type ThemePreset } from "@/lib/preferences/theme";
import { navTranslations } from "@/lib/i18n/nav-translations";
import { useI18n } from "@/lib/i18n/provider";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export function LayoutControls() {
  const { locale } = useI18n();
  const t = navTranslations[locale].header;
  const { values, resolvedThemeMode, setPreference, resetPreferences } = usePreferencesStore(
    useShallow((state) => ({
      values: state.values,
      resolvedThemeMode: state.resolvedThemeMode,
      setPreference: state.setPreference,
      resetPreferences: state.resetPreferences,
    })),
  );
  const {
    theme_mode: themeMode,
    theme_preset: themePreset,
    content_layout: contentLayout,
    navbar_style: navbarStyle,
    sidebar_variant: variant,
    sidebar_collapsible: collapsible,
    font,
  } = values;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" aria-label={t.settings}><Settings /></Button>
      </PopoverTrigger>
      <PopoverContent align="end" aria-label={t.preferences}>
        <div className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <h4 className="font-medium text-sm leading-none">{t.preferences}</h4>
            <p className="text-muted-foreground text-xs">{t.preferencesDescription}</p>
          </div>
          <div className="space-y-3 **:data-[slot=toggle-group]:w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs">
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.themePreset}</Label>
              <Select value={themePreset} onValueChange={(value) => setPreference("theme_preset", value as ThemePreset)}>
                <SelectTrigger size="sm" className="w-full text-xs"><SelectValue placeholder={t.presetPlaceholder} /></SelectTrigger>
                <SelectContent><SelectGroup>{THEME_PRESET_OPTIONS.map((preset) => <SelectItem key={preset.value} className="text-xs" value={preset.value}><span className="size-2.5 rounded-full" style={{ backgroundColor: resolvedThemeMode === "dark" ? preset.primary.dark : preset.primary.light }} />{preset.label}</SelectItem>)}</SelectGroup></SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.fonts}</Label>
              <Select value={font} onValueChange={(value) => setPreference("font", value as FontKey)}>
                <SelectTrigger size="sm" className="w-full text-xs"><SelectValue placeholder={t.selectFont} /></SelectTrigger>
                <SelectContent><SelectGroup>{fontOptions.map((item) => <SelectItem key={item.key} className="text-xs" value={item.key}>{item.label}</SelectItem>)}</SelectGroup></SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.themeMode}</Label>
              <ToggleGroup size="sm" spacing={0} variant="outline" type="single" value={themeMode} onValueChange={(mode) => mode && setPreference("theme_mode", mode as ThemeMode)}>
                <ToggleGroupItem value="light" aria-label={t.light}>{t.light}</ToggleGroupItem>
                <ToggleGroupItem value="dark" aria-label={t.dark}>{t.dark}</ToggleGroupItem>
                <ToggleGroupItem value="system" aria-label={t.system}>{t.system}</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.pageLayout}</Label>
              <ToggleGroup size="sm" spacing={0} variant="outline" type="single" value={contentLayout} onValueChange={(value) => value && setPreference("content_layout", value as ContentLayout)}>
                <ToggleGroupItem value="centered" aria-label={t.centered}>{t.centered}</ToggleGroupItem>
                <ToggleGroupItem value="full-width" aria-label={t.fullWidth}>{t.fullWidth}</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.navbarBehavior}</Label>
              <ToggleGroup size="sm" spacing={0} variant="outline" type="single" value={navbarStyle} onValueChange={(value) => value && setPreference("navbar_style", value as NavbarStyle)}>
                <ToggleGroupItem value="sticky" aria-label={t.sticky}>{t.sticky}</ToggleGroupItem>
                <ToggleGroupItem value="scroll" aria-label={t.scroll}>{t.scroll}</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.sidebarStyle}</Label>
              <ToggleGroup size="sm" spacing={0} variant="outline" type="single" value={variant} onValueChange={(value) => value && setPreference("sidebar_variant", value as SidebarVariant)}>
                <ToggleGroupItem value="inset" aria-label={t.inset}>{t.inset}</ToggleGroupItem>
                <ToggleGroupItem value="sidebar" aria-label={t.sidebar}>{t.sidebar}</ToggleGroupItem>
                <ToggleGroupItem value="floating" aria-label={t.floating}>{t.floating}</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-xs">{t.sidebarCollapseMode}</Label>
              <ToggleGroup size="sm" spacing={0} variant="outline" type="single" value={collapsible} onValueChange={(value) => value && setPreference("sidebar_collapsible", value as SidebarCollapsible)}>
                <ToggleGroupItem value="icon" aria-label={t.icon}>{t.icon}</ToggleGroupItem>
                <ToggleGroupItem value="offcanvas" aria-label={t.offcanvas}>{t.offcanvas}</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Button type="button" size="sm" variant="outline" className="w-full text-xs" onClick={resetPreferences}>{t.restoreDefaults}</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
