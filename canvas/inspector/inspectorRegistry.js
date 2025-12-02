"use client";

const registry = {};

export function registerInspector(type, component) {
  registry[type] = component;
}

export function getInspectorForLayer(layer) {
  if (!layer) return null;
  return registry[layer.type] || null;
}
