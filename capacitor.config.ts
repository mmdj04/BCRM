import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bcrm.app",
  appName: "BCRM",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false,
    },
    Camera: {
      androidPermissions: ["android.permission.CAMERA", "android.permission.READ_EXTERNAL_STORAGE"],
    },
    Network: {
      monitoring: true,
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
