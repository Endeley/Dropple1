"use client";

import { pluginRegistry } from "@/plugins/PluginRegistry";

export default function PluginManagerModal() {
  const plugins = pluginRegistry.getAll();

  return (
    <div className="p-4 bg-zinc-900 text-white">
      <h2 className="text-lg font-bold mb-3">Plugins</h2>

      {plugins.map((p) => (
        <div key={p.id} className="border-b border-zinc-800 py-2">
          <p className="font-semibold">{p.name}</p>
          <p className="text-xs text-zinc-400">{p.description}</p>
        </div>
      ))}
    </div>
  );
}
