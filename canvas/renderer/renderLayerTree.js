import { renderLayer } from "./renderLayer";

export function renderLayerTree(ctx, layers, ids = []) {
  ids.forEach((id) => {
    const layer = layers[id];
    if (!layer || layer.visible === false) return;

    ctx.save();
    ctx.translate(layer.x ?? 0, layer.y ?? 0);
    if (layer.rotation) {
      ctx.rotate((layer.rotation * Math.PI) / 180);
    }
    ctx.globalAlpha = layer.opacity ?? 1;

    renderLayer(ctx, layer);

    if (layer.children?.length) {
      renderLayerTree(ctx, layers, layer.children);
    }

    ctx.restore();
  });
}
