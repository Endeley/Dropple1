const assets = new Map();

const randomId = (prefix = "asset") => `${prefix}_${Math.random().toString(36).slice(2, 8)}`;

export async function storeAsset(data) {
  const id = randomId();
  const record = {
    id,
    type: data.type,
    src: data.src || `cdn://assets/${id}.webp`,
    metadata: data,
    tags: data.tags || [],
    brand: data.brand || null,
    version: 1,
    createdAt: Date.now(),
  };
  assets.set(id, record);
  return record;
}

export function listAssets() {
  return Array.from(assets.values());
}

export function getAsset(id) {
  return assets.get(id) || null;
}

export function replaceAssets(list = []) {
  assets.clear();
  list.forEach((item) => {
    const id = item.id || randomId();
    assets.set(id, { ...item, id });
  });
  return listAssets();
}
