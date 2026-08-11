"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { App } from "@capacitor/app";
import { Device } from "@capacitor/device";
import { Keyboard, KeyboardInfo } from "@capacitor/keyboard";
import { Network, NetworkStatus } from "@capacitor/network";

type CapacitorContextValue = {
  isNative: boolean;
  isKeyboardOpen: boolean;
  keyboardHeight: number;
  networkStatus: NetworkStatus;
  appInfo: { name: string; id: string; version: string; build: string } | null;
  deviceInfo: { platform: string; model: string; osVersion: string; manufacturer: string } | null;
};

const CapacitorContext = createContext<CapacitorContextValue>({
  isNative: false,
  isKeyboardOpen: false,
  keyboardHeight: 0,
  networkStatus: { connected: true, connectionType: "unknown" },
  appInfo: null,
  deviceInfo: null,
});

export function useCapacitor() {
  return useContext(CapacitorContext);
}

export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  const [isNative, setIsNative] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({ connected: true, connectionType: "unknown" });
  const [appInfo, setAppInfo] = useState<{ name: string; id: string; version: string; build: string } | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<{ platform: string; model: string; osVersion: string; manufacturer: string } | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [app, device, network] = await Promise.all([
          App.getInfo().catch(() => null),
          Device.getInfo().catch(() => null),
          Network.getStatus().catch(() => null),
        ]);

        if (device) {
          setIsNative(device.platform !== "web");
          setDeviceInfo({ platform: device.platform, model: device.model, osVersion: device.osVersion, manufacturer: device.manufacturer });
        }

        if (app) setAppInfo({ name: app.name, id: app.id, version: app.version, build: app.build });
        if (network) setNetworkStatus(network);

        Network.addListener("networkStatusChange", (status) => {
          setNetworkStatus(status);
        });

        Keyboard.addListener("keyboardWillShow", (info: KeyboardInfo) => {
          setIsKeyboardOpen(true);
          setKeyboardHeight(info.keyboardHeight);
        });

        Keyboard.addListener("keyboardWillHide", () => {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        });

        App.addListener("appStateChange", ({ isActive }) => {
          if (isActive) {
            Network.getStatus().then(setNetworkStatus);
          }
        });
      } catch {
        // Silently fail on web
      }
    };

    init();
  }, []);

  return (
    <CapacitorContext.Provider value={{ isNative, isKeyboardOpen, keyboardHeight, networkStatus, appInfo, deviceInfo }}>
      {children}
    </CapacitorContext.Provider>
  );
}
