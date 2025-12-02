import { renderLayer } from "./renderLayer";

export function renderMasterTree(ctx, layers, rootIds) {
  if (!layers || !rootIds) return;
  rootIds.forEach((id) => drawNode(ctx, id, layers));
}

function drawNode(ctx, id, layers) {
  const layer = layers[id];
  if (!layer) return;

  ctx.save();
  ctx.translate(layer.x ?? 0, layer.y ?? 0);
  if (layer.rotation) {
    ctx.rotate((layer.rotation * Math.PI) / 180);
  }
  ctx.globalAlpha = layer.opacity ?? 1;

  renderLayer(ctx, layer);

  if (layer.children?.length) {
    layer.children.forEach((childId) => drawNode(ctx, childId, layers));
  }

  ctx.restore();
}
