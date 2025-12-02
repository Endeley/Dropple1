"use client";

import { useEffect } from "react";
import { useLibraryStore } from "./libraryStore";

// Placeholder hook for when Convex backend is available.
export function useLibrarySync(libraryId, loader) {
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!libraryId || typeof loader !== "function") return;
      const data = await loader(libraryId);
      if (!cancelled && data) {
        useLibraryStore.getState().loadLibrary(libraryId, data);
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [libraryId, loader]);
}
