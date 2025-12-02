"use client";

import { useMemo } from "react";
import { useHistoryStore } from "@/stores/useHistoryStore";
import { diffSnapshots } from "./diffSnapshots";
import { interpolateSnapshots } from "./interpolateSnapshots";
import { resetCharacterPhysics } from "./interpolateCharacterPhysics";

export function useTimeTravelPreview() {
  const past = useHistoryStore((state) => state.past);
  const previewIndex = useHistoryStore((state) => state.previewIndex);
  const isPreviewing = useHistoryStore((state) => state.isPreviewing);
  const previewScrubT = useHistoryStore((state) => state.previewScrubT || 0);

  return useMemo(() => {
    if (!isPreviewing || previewIndex === null) {
      resetCharacterPhysics();
      return {
        isPreviewing,
        previewDefinition: null,
        ghostDefinition: null,
        diffs: null,
        scrubProgress: 0,
        prevDefinition: null,
        nextDefinition: null,
      };
    }

    const currentSnap = past[previewIndex];
    const nextSnap = past[previewIndex + 1];

    const previewDefinition =
      interpolateSnapshots(currentSnap?.redo || null, nextSnap?.redo || null, previewScrubT) ||
      currentSnap?.redo ||
      null;

    const diffs =
      currentSnap?.redo && nextSnap?.redo ? diffSnapshots(currentSnap.redo, nextSnap.redo) : null;

    return {
      isPreviewing,
      previewDefinition,
      ghostDefinition: nextSnap?.redo || null,
      diffs,
      scrubProgress: previewScrubT,
      prevDefinition: currentSnap?.redo || null,
      nextDefinition: nextSnap?.redo || null,
    };
  }, [isPreviewing, past, previewIndex, previewScrubT]);
}
