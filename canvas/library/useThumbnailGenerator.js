"use client";

import { useEffect } from "react";
import { renderComponentThumbnail } from "./renderComponentThumbnail";
import { useComponentStore } from "@/canvas/components/componentStore";

export function useThumbnailGenerator(masterId) {
  const master = useComponentStore((state) => state.masters[masterId]);

  useEffect(() => {
    if (!master) return;

    let cancelled = false;
    const timeout = setTimeout(async () => {
      const dataUrl = await renderComponentThumbnail(master);
      if (!cancelled && dataUrl) {
        useComponentStore.getState().setThumbnail(masterId, dataUrl);
      }
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [masterId, master]);
}
