const imageCache = new Map();

export function renderImage(ctx, layer) {
  if (!layer.src) return;

  let img = imageCache.get(layer.src);
  if (!img) {
    img = new Image();
    img.src = layer.src;
    imageCache.set(layer.src, img);
    img.onload = () => ctx.drawImage(img, 0, 0, layer.width, layer.height);
    return;
  }

  if (img.complete) {
    ctx.drawImage(img, 0, 0, layer.width, layer.height);
  }
}
