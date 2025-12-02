const assets = [];

export function listAssets() {
  return assets;
}

export function addAsset(asset) {
  assets.push(asset);
  return asset;
}
