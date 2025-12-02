"use client";

import { useTemplateInstanceStore } from "@/foundation/templates/templateInstanceStore";
import { useLayerStore } from "@/canvas/core/layerStore";
import { createLayer } from "@/canvas/core/createLayer";
import { LayerType } from "@/canvas/core/layerTypes";

export function addTemplateToCanvas(templateId, position = { x: 100, y: 100 }) {
  if (!templateId) return null;
  const instanceId =
    useTemplateInstanceStore.getState().createInstance(templateId);
  if (!instanceId) return null;

  const templateLayer = createLayer({
    id: instanceId,
    type: LayerType.TEMPLATE_INSTANCE,
    x: position.x,
    y: position.y,
    width: 800,
    height: 600,
    templateInstanceId: instanceId,
  });

  useLayerStore.getState().addLayer(templateLayer);

  return instanceId;
}
