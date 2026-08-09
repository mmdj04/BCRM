"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { DEMO_CONFIG } from "@/config/demo-config";

export interface SetupData {
  company: {
    name: string;
    cnpj: string;
    description: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
  };
  project: {
    name: string;
    url: string;
    logo: string;
    description: string;
  };
  modules: {
    crm: boolean;
    finance: boolean;
    analytics: boolean;
    ecommerce: boolean;
    academy: boolean;
    logistics: boolean;
    infrastructure: boolean;
    productivity: boolean;
    fileManager: boolean;
    patientMonitoring: boolean;
  };
  payment: {
    stripe: boolean;
    pix: boolean;
    boleto: boolean;
    creditCard: boolean;
    bankTransfer: boolean;
  };
  users: {
    name: string;
    email: string;
    role: string;
  }[];
  notifications: {
    email: boolean;
    whatsapp: boolean;
    push: boolean;
    weeklyReport: boolean;
  };
}

const defaultSetupData: SetupData = {
  company: {
    name: "",
    cnpj: "",
    description: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  },
  project: {
    name: "BCRM",
    url: "",
    logo: "",
    description: "",
  },
  modules: {
    crm: true,
    finance: true,
    analytics: true,
    ecommerce: false,
    academy: false,
    logistics: false,
    infrastructure: false,
    productivity: true,
    fileManager: false,
    patientMonitoring: false,
  },
  payment: {
    stripe: true,
    pix: true,
    boleto: false,
    creditCard: true,
    bankTransfer: false,
  },
  users: [],
  notifications: {
    email: true,
    whatsapp: false,
    push: true,
    weeklyReport: true,
  },
};

interface SetupContextType {
  isSetupComplete: boolean;
  setupData: SetupData;
  currentStep: number;
  isLoading: boolean;
  setStep: (step: number) => void;
  updateSetupData: (data: Partial<SetupData>) => void;
  completeSetup: () => void;
  resetSetup: () => void;
}

const SetupContext = createContext<SetupContextType | null>(null);

function getSetupStorageKey(userId: string): string {
  return `bcrm_setup_complete_${userId}`;
}

export function SetupProvider({ children, userId }: { children: React.ReactNode; userId: string }) {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [setupData, setSetupData] = useState<SetupData>(defaultSetupData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(getSetupStorageKey(userId));
    if (stored === "true") {
      setIsSetupComplete(true);
    }
    setIsLoading(false);
  }, [userId]);

  const setStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const updateSetupData = useCallback((data: Partial<SetupData>) => {
    setSetupData((prev) => ({ ...prev, ...data }));
  }, []);

  const completeSetup = useCallback(() => {
    localStorage.setItem(getSetupStorageKey(userId), "true");
    setIsSetupComplete(true);
  }, [userId]);

  const resetSetup = useCallback(() => {
    localStorage.removeItem(getSetupStorageKey(userId));
    setIsSetupComplete(false);
    setCurrentStep(0);
  }, [userId]);

  return (
    <SetupContext.Provider
      value={{
        isSetupComplete,
        setupData,
        currentStep,
        isLoading,
        setStep,
        updateSetupData,
        completeSetup,
        resetSetup,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
}

export function useSetup() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error("useSetup must be used within a SetupProvider");
  }
  return context;
}
