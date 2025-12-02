const store = {
  brands: {},
};

const randomId = (prefix = "brand") => `${prefix}_${Math.random().toString(36).slice(2, 8)}`;

export function listBrands() {
  return Object.values(store.brands);
}

export function getBrand(id) {
  return store.brands[id] || null;
}

export function createBrand(payload = {}) {
  const id = payload.id || randomId();
  const now = Date.now();
  const brand = {
    id,
    name: payload.name || "New Brand",
    archetype: payload.archetype || [],
    voice: payload.voice || "",
    rules_version: payload.rules_version || 1,
    last_updated: now,
    colors: payload.colors || {},
    typography: payload.typography || {},
    logos: payload.logos || {},
    tokens: payload.tokens || {},
    templates: payload.templates || [],
    uikits: payload.uikits || [],
    themes: payload.themes || [],
    rules: payload.rules || [],
    audit: payload.audit || [],
    aiMemory: payload.aiMemory || {},
    versions: payload.versions || [],
  };
  store.brands[id] = brand;
  return brand;
}

export function updateBrand(id, patch = {}) {
  const brand = getBrand(id);
  if (!brand) throw new Error("Brand not found");
  store.brands[id] = { ...brand, ...patch, last_updated: Date.now() };
  return store.brands[id];
}

export function logAudit(id, issue) {
  const brand = getBrand(id);
  if (!brand) return null;
  const entry = { id: randomId("audit"), createdAt: Date.now(), ...issue };
  brand.audit.unshift(entry);
  brand.audit = brand.audit.slice(0, 200);
  brand.last_updated = Date.now();
  return entry;
}

export function addVersion(id, snapshot) {
  const brand = getBrand(id);
  if (!brand) return null;
  const entry = { id: randomId("ver"), createdAt: Date.now(), ...snapshot };
  brand.versions.unshift(entry);
  brand.versions = brand.versions.slice(0, 50);
  brand.last_updated = Date.now();
  return entry;
}
