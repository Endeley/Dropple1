"use client";

import { useRef } from "react";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";
import { useHistoryStore } from "@/stores/useHistoryStore";

export function useClipboard() {
  const clipboardRef = useRef(null);

  const copy = () => {
    const selected = useSlotSelectionStore.getState().selected;
    if (!selected?.length) return;
    const definition = useTemplateMasterStore.getState().definition;
    if (!definition) return;

    clipboardRef.current = {
      slots: definition.slots.filter((slot) => selected.includes(slot.id)),
      offset: { x: 20, y: 20 },
    };
  };

  const paste = (meta = { type: "paste" }) => {
    const clip = clipboardRef.current;
    if (!clip || !clip.slots?.length) return;

    const newSlots = clip.slots.map((slot) => {
      const newId = `${slot.id}-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
      return {
        ...slot,
        id: newId,
        frame: {
          ...slot.frame,
          x: slot.frame.x + (clip.offset?.x || 0),
          y: slot.frame.y + (clip.offset?.y || 0),
        },
      };
    });

    const history = useHistoryStore.getState();
    const label = meta?.type === "duplicate" ? "Duplicate Slots" : "Paste Slots";
    history.beginBlock?.(label, {
      category: "meta",
      count: newSlots.length,
      ...meta,
    });
    useTemplateMasterStore.getState().addSlots(newSlots);
    useSlotSelectionStore.getState().selectMultiple(newSlots.map((slot) => slot.id));
    history.endBlock?.();
  };

  const duplicate = () => {
    copy();
    paste({ type: "duplicate" });
  };

  return { copy, paste, duplicate };
}
