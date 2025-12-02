export function createBrandKit({ name = "New Brand", palette = [], typography = {}, logos = [] }) {
  return {
    id: `brand_${Math.random().toString(36).slice(2, 8)}`,
    name,
    palette,
    typography,
    logos,
    assets: [],
    createdAt: Date.now(),
  };
}

export function addAssetToKit(kit, asset) {
  return { ...kit, assets: [...kit.assets, asset] };
}
