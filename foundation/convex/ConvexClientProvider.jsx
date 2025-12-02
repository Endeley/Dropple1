"use client";

import { createContext, useContext, useMemo } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const ConvexClientContext = createContext(null);

export function useConvexClient() {
  return useContext(ConvexClientContext);
}

let browserClient = null;
function getConvexClient() {
  if (!convexUrl) return null;
  if (!browserClient) {
    browserClient = new ConvexReactClient(convexUrl, {
      unsavedChangesWarning: false,
    });
  }
  return browserClient;
}

export default function ConvexClientProvider({ children }) {
  const client = useMemo(() => getConvexClient(), []);

  if (!convexUrl || !client) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Convex client not initialized. Set NEXT_PUBLIC_CONVEX_URL to enable persistence."
      );
    }
    return (
      <ConvexClientContext.Provider value={null}>{children}</ConvexClientContext.Provider>
    );
  }

  return (
    <ConvexClientContext.Provider value={client}>
      <ConvexProvider client={client}>{children}</ConvexProvider>
    </ConvexClientContext.Provider>
  );
}
