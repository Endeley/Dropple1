"use client";

import { pluginRegistry } from "@/plugins/PluginRegistry";
import { usePluginsUIStore } from "@/stores/usePluginsUIStore";

export default function PluginLauncherButton({ pluginId }) {
  const open = usePluginsUIStore((s) => s.openPanel);

  const manifest = pluginRegistry.getManifest(pluginId);

  return (
    <button
      onClick={() => open(pluginId)}
      className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded text-xs"
    >
      {manifest.name}
    </button>
  );
}
