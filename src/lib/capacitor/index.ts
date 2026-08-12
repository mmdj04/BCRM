"use client";

import { useEffect, useState } from "react";

import { App } from "@capacitor/app";
import { Clipboard } from "@capacitor/clipboard";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";
import { Dialog } from "@capacitor/dialog";
import { Haptics } from "@capacitor/haptics";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Preferences } from "@capacitor/preferences";
import { Share } from "@capacitor/share";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { toast } from "sonner";

// Status Bar
export async function initStatusBar() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: "#0f172a" });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch (e) {
    console.warn("StatusBar init failed:", e);
  }
}

// Splash Screen
export async function hideSplashScreen() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await SplashScreen.hide();
  } catch (e) {
    console.warn("SplashScreen hide failed:", e);
  }
}

// Haptics
export async function hapticImpact(style: "LIGHT" | "MEDIUM" | "HEAVY" | "RIGID" | "SOFT" = "MEDIUM") {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await Haptics.impact({ style: style as any });
  } catch (e) {
    console.warn("Haptics failed:", e);
  }
}

export async function hapticNotification(type: "SUCCESS" | "WARNING" | "ERROR" = "SUCCESS") {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await Haptics.notification({ type: type as any });
  } catch (e) {
    console.warn("Haptics notification failed:", e);
  }
}

// Clipboard
export async function copyToClipboard(text: string) {
  if (!Capacitor.isNativePlatform()) {
    await navigator.clipboard.writeText(text);
    toast.success("Copiado!");
    return;
  }
  try {
    await Clipboard.write({ string: text });
    toast.success("Copiado!");
  } catch (e) {
    console.warn("Clipboard failed:", e);
  }
}

// Dialog
export async function showAlert(title: string, message: string) {
  if (!Capacitor.isNativePlatform()) {
    window.alert(message);
    return;
  }
  try {
    await Dialog.alert({ title, message });
  } catch (e) {
    console.warn("Dialog.alert failed:", e);
  }
}

export async function showConfirm(title: string, message: string): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return window.confirm(message);
  }
  try {
    const result = await Dialog.confirm({ title, message });
    return result.value;
  } catch (e) {
    console.warn("Dialog.confirm failed:", e);
    return false;
  }
}

export async function showPrompt(title: string, message: string): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) {
    return window.prompt(message);
  }
  try {
    const result = await Dialog.prompt({ title, message });
    return result.value;
  } catch (e) {
    console.warn("Dialog.prompt failed:", e);
    return null;
  }
}

// Share
export async function shareContent(title: string, text: string, url?: string) {
  if (!Capacitor.isNativePlatform()) {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    }
    return;
  }
  try {
    await Share.share({ title, text, url });
  } catch (e) {
    console.warn("Share failed:", e);
  }
}

// Device Info
export async function getDeviceInfo() {
  if (!Capacitor.isNativePlatform()) {
    return { platform: "web", model: "browser", batteryLevel: 1, isCharging: false };
  }
  try {
    const info = await Device.getInfo();
    const battery = await Device.getBatteryInfo();
    return {
      platform: info.platform,
      model: info.model,
      batteryLevel: battery.batteryLevel ?? 1,
      isCharging: battery.isCharging ?? false,
    };
  } catch (e) {
    console.warn("Device.getInfo failed:", e);
    return { platform: "unknown", model: "unknown", batteryLevel: 1, isCharging: false };
  }
}

// Preferences (Secure Storage)
export async function secureSet(key: string, value: string) {
  if (!Capacitor.isNativePlatform()) {
    localStorage.setItem(key, value);
    return;
  }
  try {
    await Preferences.set({ key, value });
  } catch (e) {
    console.warn("Preferences.set failed:", e);
  }
}

export async function secureGet(key: string): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) {
    return localStorage.getItem(key);
  }
  try {
    const result = await Preferences.get({ key });
    return result.value;
  } catch (e) {
    console.warn("Preferences.get failed:", e);
    return null;
  }
}

export async function secureRemove(key: string) {
  if (!Capacitor.isNativePlatform()) {
    localStorage.removeItem(key);
    return;
  }
  try {
    await Preferences.remove({ key });
  } catch (e) {
    console.warn("Preferences.remove failed:", e);
  }
}

// Local Notifications
export async function scheduleNotification(title: string, body: string, id: number, schedule?: Date) {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const hasPermission = await LocalNotifications.checkPermissions();
    if (hasPermission.display !== "granted") {
      await LocalNotifications.requestPermissions();
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id,
          schedule: schedule ? { at: schedule } : undefined,
        },
      ],
    });
  } catch (e) {
    console.warn("LocalNotifications failed:", e);
  }
}

// App State Listener
export function onAppStateChanged(callback: (state: "active" | "inactive" | "background") => void) {
  if (!Capacitor.isNativePlatform()) {
    return () => {
      // noop on web
    };
  }

  const listener = App.addListener("appStateChange", ({ isActive }) => {
    callback(isActive ? "active" : "background");
  });

  return () => {
    listener
      .then((handle) => handle.remove())
      .catch(() => {
        // Ignore cleanup errors
      });
  };
}

// Back Button Handler
export function onBackButton(callback: () => void) {
  if (!Capacitor.isNativePlatform()) {
    return () => {
      // noop on web
    };
  }

  const listener = App.addListener("backButton", callback);

  return () => {
    listener
      .then((handle) => handle.remove())
      .catch(() => {
        // Ignore cleanup errors
      });
  };
}

// Deep Links
export function onDeepLink(callback: (url: string) => void) {
  if (!Capacitor.isNativePlatform()) {
    return () => {
      // noop on web
    };
  }

  const listener = App.addListener("appUrlOpen", ({ url }) => {
    callback(url);
  });

  return () => {
    listener
      .then((handle) => handle.remove())
      .catch(() => {
        // Ignore cleanup errors
      });
  };
}

// Initialize all plugins
export async function initCapacitorPlugins() {
  if (!Capacitor.isNativePlatform()) return;

  await Promise.all([initStatusBar(), hideSplashScreen(), LocalNotifications.requestPermissions()]);
}

// React Hook for Capacitor
export function useCapacitor() {
  const [isReady, setIsReady] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<Awaited<ReturnType<typeof getDeviceInfo>> | null>(null);

  useEffect(() => {
    async function init() {
      await initCapacitorPlugins();
      const info = await getDeviceInfo();
      setDeviceInfo(info);
      setIsReady(true);
    }

    init().catch(() => {
      // Ignore init errors
    });
  }, []);

  return { isReady, deviceInfo };
}
