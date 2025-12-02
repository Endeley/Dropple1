"use client";

import { renderMasterTree } from "@/canvas/renderer/renderMasterTree";

export async function renderComponentThumbnail(master, options = {}) {
  if (!master) return null;

  const { size = 200, bg = "transparent" } = options;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (bg !== "transparent") {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
  }

  const bbox = computeMasterBoundingBox(master);
  const scale = Math.min(
    size / (bbox.width || size),
    size / (bbox.height || size)
  );

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(-bbox.x, -bbox.y);
  renderMasterTree(ctx, master.layers, master.rootLayerIds);
  ctx.restore();

  return canvas.toDataURL("image/png");
}

function computeMasterBoundingBox(master) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  Object.values(master.layers || {}).forEach((layer) => {
    minX = Math.min(minX, layer.x ?? 0);
    minY = Math.min(minY, layer.y ?? 0);
    maxX = Math.max(maxX, (layer.x ?? 0) + (layer.width ?? 0));
    maxY = Math.max(maxY, (layer.y ?? 0) + (layer.height ?? 0));
  });

  if (!isFinite(minX) || !isFinite(minY)) {
    return { x: 0, y: 0, width: 200, height: 200 };
  }

  return {
    x: minX,
    y: minY,
    width: Math.max(maxX - minX, 1),
    height: Math.max(maxY - minY, 1),
  };
}
