"use client";

import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";
import { computeGroupFrame } from "./groupMath";
import { useHistoryStore } from "@/stores/useHistoryStore";

export function useGrouping() {
  const store = useTemplateMasterStore();
  const selection = useSlotSelectionStore();

  const createGroup = () => {
    const ids = selection.selected;
    if (!ids || ids.length < 2) return;
    const definition = store.definition;
    if (!definition) return;

    const slots = definition.slots.filter((slot) => ids.includes(slot.id));
    const frame = computeGroupFrame(slots);
    const groupId = `group-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;

    const history = useHistoryStore.getState();
    history.beginBlock?.("Create Group", {
      type: "group",
      category: "meta",
      slotIds: [...ids],
      count: ids.length,
    });
    store.addGroup({ id: groupId, slotIds: [...ids], frame });
    selection.setGroupSelection(groupId, ids);
    history.endBlock?.();
  };

  const ungroup = () => {
    if (!selection.isGroup?.()) return;
    const groupId = selection.selectingGroup;
    if (!groupId) return;
    const history = useHistoryStore.getState();
    history.beginBlock?.("Ungroup", { type: "ungroup", category: "meta", groupId });
    store.removeGroup(groupId);
    selection.clear();
    history.endBlock?.();
  };

  return { createGroup, ungroup };
}
