"use client";

import { pluginRegistry } from "@/plugins/PluginRegistry";
import { usePluginsUIStore } from "@/stores/usePluginsUIStore";

export default function PluginPanel() {
  const openPluginId = usePluginsUIStore((s) => s.active);

  if (!openPluginId) return null;

  const plugin = pluginRegistry.getPlugin(openPluginId);

  if (!plugin || !plugin.Panel) return null;

  return (
    <div className="absolute right-0 top-0 w-80 h-full bg-zinc-900 text-white shadow-xl p-4 border-l border-zinc-700">
      <plugin.Panel />
    </div>
  );
}
