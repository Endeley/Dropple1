"use client";

import { resolveTemplateInstance } from "@/foundation/templates/resolveTemplateInstance";
import { renderLayerTree } from "../renderLayerTree";

export function renderTemplateInstance(ctx, layer) {
  const instanceId = layer.templateInstanceId || layer.id;
  if (!instanceId) return;
  const resolved = resolveTemplateInstance(instanceId);
  if (!resolved) return;
  renderLayerTree(ctx, resolved.layers, resolved.rootLayerIds);
}
