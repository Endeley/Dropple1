"use client";

import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useInlineTextEditor } from "@/stores/useInlineTextEditor";

export function useTextEditing(canvasScale = 1) {
  const masterStore = useTemplateMasterStore;
  const inlineStore = useInlineTextEditor;

  const onSlotClick = (slot) => {
    if (!slot?.type?.startsWith("text")) return;
    inlineStore.getState().startEditing(slot, canvasScale, (slotId, value) => {
      masterStore.getState().updateSlotContent(slotId, { text: value });
    });
  };

  return { onSlotClick };
}
