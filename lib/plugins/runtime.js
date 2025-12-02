export class PluginRegistry {
  constructor() {
    this.plugins = [];
  }

  register(plugin) {
    if (!plugin?.type || typeof plugin.apply !== "function") {
      throw new Error("Invalid plugin");
    }
    this.plugins.push(plugin);
  }

  getPlugins(type) {
    return this.plugins.filter((plugin) => plugin.type === type);
  }
}

export const dropplePlugins = new PluginRegistry();

if (typeof window !== "undefined") {
  window.dropplePlugins = dropplePlugins;
}
