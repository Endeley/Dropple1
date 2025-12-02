export function findSnapTargets(layers = [], canvas) {
  const targets = {
    x: new Set(),
    y: new Set(),
  };

  layers.forEach((layer) => {
    if (!layer) return;
    targets.x.add(layer.x);
    targets.x.add(layer.x + layer.width);
    targets.x.add(layer.x + layer.width / 2);

    targets.y.add(layer.y);
    targets.y.add(layer.y + layer.height);
    targets.y.add(layer.y + layer.height / 2);
  });

  const width = canvas?.width || 0;
  const height = canvas?.height || 0;
  if (width > 0) targets.x.add(width / 2);
  if (height > 0) targets.y.add(height / 2);

  return {
    x: Array.from(targets.x),
    y: Array.from(targets.y),
  };
}
