"use client";

import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";
import { captureBefore, captureAfter } from "@/canvas/core/history/historyCapture";

let nudgeTimer = null;

export function useNudge() {
  const nudge = (dx, dy) => {
    if (dx === 0 && dy === 0) return;
    const selected = useSlotSelectionStore.getState().selected;
    if (!selected?.length) return;

    if (!nudgeTimer) {
      captureBefore({
        category: "transform",
        label: "Nudge",
        slotIds: [...selected],
      });
    }

    selected.forEach((slotId) => {
      useTemplateMasterStore.getState().updateSlotFrame(slotId, (frame) => ({
        x: (frame?.x || 0) + dx,
        y: (frame?.y || 0) + dy,
      }));
    });

    clearTimeout(nudgeTimer);
    nudgeTimer = setTimeout(() => {
      captureAfter({ label: "Nudge", category: "transform" });
      nudgeTimer = null;
    }, 120);
  };

  return { nudge };
}
