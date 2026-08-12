"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";
import { Haptics } from "@capacitor/haptics";
import { Keyboard, type KeyboardInfo } from "@capacitor/keyboard";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Network, type NetworkStatus } from "@capacitor/network";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { toast } from "sonner";

type HapticsImpactStyle = "LIGHT" | "MEDIUM" | "HEAVY" | "RIGID" | "SOFT";
type HapticsNotificationType = "SUCCESS" | "WARNING" | "ERROR";

type CapacitorContextValue = {
  isNative: boolean;
  isKeyboardOpen: boolean;
  keyboardHeight: number;
  networkStatus: NetworkStatus;
  appInfo: { name: string; id: string; version: string; build: string } | null;
  deviceInfo: { platform: string; model: string; osVersion: string; manufacturer: string } | null;
  hapticImpact: (style?: HapticsImpactStyle) => Promise<void>;
  hapticNotification: (type: "SUCCESS" | "WARNING" | "ERROR") => Promise<void>;
};

const CapacitorContext = createContext<CapacitorContextValue>({
  isNative: false,
  isKeyboardOpen: false,
  keyboardHeight: 0,
  networkStatus: { connected: true, connectionType: "unknown" },
  appInfo: null,
  deviceInfo: null,
  hapticImpact: async () => {
    // Default - overridden by provider
  },
  hapticNotification: async () => {
    // Default - overridden by provider
  },
});

export function useCapacitor() {
  return useContext(CapacitorContext);
}

export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  const [isNative, setIsNative] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    connected: true,
    connectionType: "unknown",
  });
  const [appInfo, setAppInfo] = useState<{
    name: string;
    id: string;
    version: string;
    build: string;
  } | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<{
    platform: string;
    model: string;
    osVersion: string;
    manufacturer: string;
  } | null>(null);

  // Haptic feedback
  const hapticImpact = async (style: HapticsImpactStyle = "MEDIUM") => {
    if (!isNative) return;
    try {
      await Haptics.impact({ style: style as any });
    } catch {
      // Silently fail on web
    }
  };

  const hapticNotification = async (type: HapticsNotificationType) => {
    if (!isNative) return;
    try {
      await Haptics.notification({ type: type as any });
    } catch {
      // Silently fail on web
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize StatusBar
        if (Capacitor.isNativePlatform()) {
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: "#0f172a" });
          await StatusBar.setOverlaysWebView({ overlay: false });
        }

        // Hide SplashScreen
        if (Capacitor.isNativePlatform()) {
          await SplashScreen.hide();
        }

        // Request notification permissions
        if (Capacitor.isNativePlatform()) {
          await LocalNotifications.requestPermissions();
        }

        const [app, device, network] = await Promise.all([
          App.getInfo().catch(() => null),
          Device.getInfo().catch(() => null),
          Network.getStatus().catch(() => null),
        ]);

        if (device) {
          setIsNative(device.platform !== "web");
          setDeviceInfo({
            platform: device.platform,
            model: device.model,
            osVersion: device.osVersion,
            manufacturer: device.manufacturer,
          });
        }

        if (app) setAppInfo({ name: app.name, id: app.id, version: app.version, build: app.build });
        if (network) setNetworkStatus(network);

        // Listen for network changes
        await Network.addListener("networkStatusChange", (status) => {
          setNetworkStatus(status);
          if (!status.connected) {
            toast.error("Sem conexão com a internet", {
              description: "Verifique sua rede e tente novamente.",
            });
          } else if (status.connected && networkStatus.connected === false) {
            toast.success("Conexão restaurada", {
              description: "Internet disponível novamente.",
            });
          }
        });

        // Listen for keyboard
        await Keyboard.addListener("keyboardWillShow", (info: KeyboardInfo) => {
          setIsKeyboardOpen(true);
          setKeyboardHeight(info.keyboardHeight);
        });

        await Keyboard.addListener("keyboardWillHide", () => {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        });

        // Refresh network on app resume
        await App.addListener("appStateChange", ({ isActive }) => {
          if (isActive) {
            Network.getStatus().then(setNetworkStatus).catch(() => {
              // Ignore network status errors
            });
          }
        });
      } catch {
        // Silently fail on web
      }
    };

    init().catch(() => {
      // Silently fail on web
    });
  }, [networkStatus]);

  return (
    <CapacitorContext.Provider
      value={{
        isNative,
        isKeyboardOpen,
        keyboardHeight,
        networkStatus,
        appInfo,
        deviceInfo,
        hapticImpact,
        hapticNotification,
      }}
    >
      {children}
    </CapacitorContext.Provider>
  );
}
