import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bcrm.app",
  appName: "BCRM",
  server: {
    url: "https://bcrm-lilac.vercel.app",
    androidScheme: "https",
    errorPath: "offline.html",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      showSpinner: true,
      spinnerColor: "#3b82f6",
      splashFullScreen: true,
      splashImmersive: true,
    },
    Camera: {
      androidPermissions: [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
      ],
    },
    Network: {
      monitoring: true,
    },
    CapacitorSQLite: {},
    Preferences: {
      group: "com.bcrm.app",
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0f172a",
      overlaysWebView: false,
    },
    Keyboard: {},
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#3b82f6",
    },
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
};

export default config;
