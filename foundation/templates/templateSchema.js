"use client";

import { SlotKinds } from "./slotKinds";

export function createTemplateDefinition({
  id,
  name = "Untitled Template",
  layers = {},
  rootLayerIds = [],
  meta = {},
} = {}) {
  if (!id) {
    id = "tmpl_" + (crypto?.randomUUID ? crypto.randomUUID() : Date.now());
  }

  return {
    id,
    name,
    layers,
    rootLayerIds,
    meta,
  };
}

export function createSlotLayer({
  id,
  kind = SlotKinds.TEXT,
  name = "Slot",
  x = 0,
  y = 0,
  width = 200,
  height = 80,
  defaultValue = null,
} = {}) {
  if (!id) {
    id = "slot_" + (crypto?.randomUUID ? crypto.randomUUID() : Date.now());
  }

  return {
    id,
    type: "slot",
    kind,
    name,
    x,
    y,
    width,
    height,
    defaultValue,
  };
}
