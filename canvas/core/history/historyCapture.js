"use client";

import { useHistoryStore } from "@/stores/useHistoryStore";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";

const cloneDefinition = (definition) =>
  definition === undefined ? undefined : JSON.parse(JSON.stringify(definition));

export function captureBefore(meta = {}) {
  const hist = useHistoryStore.getState();
  if (hist.block || hist.inTransaction) return;
  const definition = useTemplateMasterStore.getState().definition;
  if (!definition) return;
  const finalMeta = {
    category: meta.category || "meta",
    label: meta.label || "Change",
    ...meta,
  };
  hist.startTransaction(cloneDefinition(definition), finalMeta);
}

export function captureAfter(meta = {}) {
  const hist = useHistoryStore.getState();
  if (hist.block || !hist.inTransaction) return;
  const definition = useTemplateMasterStore.getState().definition;
  if (!definition) {
    hist.discardTransaction?.();
    return;
  }
  const finalMeta = {
    category: meta.category,
    label: meta.label,
    ...meta,
  };
  hist.commitTransaction(cloneDefinition(definition), finalMeta);
}

export function resetCapture() {
  const hist = useHistoryStore.getState();
  if (hist.block) return;
  if (hist.inTransaction) {
    hist.discardTransaction();
  }
}
