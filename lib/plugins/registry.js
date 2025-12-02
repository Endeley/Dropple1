const memoryStore = {
  plugins: [
    {
      id: "dropple.neon",
      name: "Neon Effect",
      version: "1.0.0",
      author: "Dev Studio",
      description: "Adds neon glow filters to shapes and text.",
      enabled: true,
      permissions: ["layers:read", "layers:write", "canvas:draw", "assets:read"],
      entry: "./index.js",
      ui: "./ui.jsx",
      actions: ["applyNeonGlow", "removeNeonGlow"],
      source: "builtin",
    },
  ],
};

export function listPlugins() {
  return memoryStore.plugins;
}

export function installPlugin(manifest = {}) {
  const id = manifest.id || `plugin.${Date.now()}`;
  const existing = memoryStore.plugins.find((p) => p.id === id);
  if (existing) {
    Object.assign(existing, manifest);
    return existing;
  }
  const plugin = {
    id,
    name: manifest.name || "New Plugin",
    version: manifest.version || "0.0.1",
    author: manifest.author || "Unknown",
    description: manifest.description || "No description",
    permissions: manifest.permissions || [],
    entry: manifest.entry || "./index.js",
    ui: manifest.ui || null,
    actions: manifest.actions || [],
    enabled: true,
    source: manifest.source || "remote",
  };
  memoryStore.plugins.push(plugin);
  return plugin;
}

export function enablePlugin(id) {
  const plugin = memoryStore.plugins.find((p) => p.id === id);
  if (plugin) plugin.enabled = true;
  return plugin;
}

export function disablePlugin(id) {
  const plugin = memoryStore.plugins.find((p) => p.id === id);
  if (plugin) plugin.enabled = false;
  return plugin;
}
