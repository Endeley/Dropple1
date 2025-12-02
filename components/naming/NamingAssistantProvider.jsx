"use client";

import { createContext, useContext, useState } from "react";
import { useNamingEngine } from "@/hooks/useNamingEngine";

const NamingAssistantContext = createContext(null);

export function NamingAssistantProvider({ children }) {
  const naming = useNamingEngine();
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [presetTarget, setPresetTarget] = useState("project");
  const [lastAppliedName, setLastAppliedName] = useState("");

  const openQuickModal = (target) => {
    if (target) setPresetTarget(target);
    setQuickModalOpen(true);
  };

  const closeQuickModal = () => setQuickModalOpen(false);

  const value = {
    ...naming,
    quickModalOpen,
    openQuickModal,
    closeQuickModal,
    presetTarget,
    setPresetTarget,
    lastAppliedName,
    setLastAppliedName,
  };

  return (
    <NamingAssistantContext.Provider value={value}>
      {children}
    </NamingAssistantContext.Provider>
  );
}

export const useNamingAssistant = () => {
  const ctx = useContext(NamingAssistantContext);
  if (!ctx) throw new Error("useNamingAssistant must be used inside NamingAssistantProvider");
  return ctx;
};
