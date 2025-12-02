"use client";

import { useTemplateStore } from "./templateStore";
import { useTemplateInstanceStore } from "./templateInstanceStore";

export function resolveTemplateInstance(instanceId) {
  if (!instanceId) return null;
  const templateInstanceState = useTemplateInstanceStore.getState();
  const templateState = useTemplateStore.getState();
  const instance = templateInstanceState.instances[instanceId];
  if (!instance) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Template instance missing", instanceId);
    }
    return null;
  }

  const template = templateState.templates[instance.templateId];
  if (!template) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Template definition missing", instance.templateId);
    }
    return null;
  }

  const resolvedLayers = {};
  const overrides = instance.slotOverrides || {};

  for (const id in template.layers) {
    const sourceLayer = template.layers[id];
    const layer = structuredClone(sourceLayer);

    if (layer.type === "slot") {
      const key = `${layer.id}:slot`;
      if (Object.prototype.hasOwnProperty.call(overrides, key)) {
        layer.filledValue = overrides[key];
        layer.isFilled = overrides[key] != null;
      } else {
        layer.filledValue = layer.defaultValue;
        layer.isFilled = layer.defaultValue != null;
      }
    }

    resolvedLayers[id] = layer;
  }

  return {
    id: instance.id,
    templateId: template.id,
    rootLayerIds: [...(template.rootLayerIds || [])],
    layers: resolvedLayers,
  };
}
