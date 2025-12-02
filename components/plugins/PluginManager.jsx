"use client";

import { useEffect, useState } from "react";

const sampleManifest = `{
  "name": "Glow Storm",
  "id": "dropple.glow-storm",
  "version": "1.0.0",
  "author": "Sample Dev",
  "description": "Adds neon glow filters to selected layers.",
  "permissions": ["layers:read", "layers:write", "effects:apply"],
  "entry": "./index.js",
  "ui": "./ui.jsx",
  "actions": ["glowStorm"]
}`;

export default function PluginManager() {
  const [plugins, setPlugins] = useState([]);
  const [manifest, setManifest] = useState(sampleManifest);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlugins = async () => {
    try {
      const res = await fetch("/api/plugins/list");
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Failed to load plugins");
      setPlugins(data.plugins || []);
    } catch (err) {
      setError(err?.message || "Failed to load plugins");
    }
  };

  useEffect(() => {
    fetchPlugins();
  }, []);

  const install = async () => {
    setLoading(true);
    setError(null);
    try {
      const parsed = JSON.parse(manifest);
      const res = await fetch("/api/plugins/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manifest: parsed }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Install failed");
      await fetchPlugins();
    } catch (err) {
      setError(err?.message || "Failed to install plugin");
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (id, enabled) => {
    setLoading(true);
    setError(null);
    try {
      const route = enabled ? "/api/plugins/enable" : "/api/plugins/disable";
      const res = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Toggle failed");
      await fetchPlugins();
    } catch (err) {
      setError(err?.message || "Failed to toggle plugin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-3 text-xl text-purple-300">Plugin SDK Manager</h2>
      <p className="text-sm text-white/60">Install and toggle sandboxed plugins.</p>

      <div className="mt-4 grid gap-3">
        <textarea
          value={manifest}
          onChange={(e) => setManifest(e.target.value)}
          className="min-h-[200px] rounded-md border border-white/10 bg-white/5 p-3 text-sm font-mono"
        />
        <button
          onClick={install}
          className="w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Working…" : "Install / Update Plugin"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      <div className="mt-6 space-y-3">
        {plugins.map((p) => (
          <div key={p.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-purple-200 font-semibold">{p.name}</h3>
                <p className="text-xs text-white/50">
                  {p.id} • v{p.version} • {p.author}
                </p>
              </div>
              <button
                onClick={() => toggle(p.id, !p.enabled ? true : false)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  p.enabled ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-600 hover:bg-slate-700"
                }`}
                type="button"
              >
                {p.enabled ? "Disable" : "Enable"}
              </button>
            </div>
            <p className="mt-2 text-sm text-white/70">{p.description}</p>
            {p.permissions?.length ? (
              <p className="mt-2 text-xs text-white/50">Permissions: {p.permissions.join(", ")}</p>
            ) : null}
            {p.actions?.length ? <p className="text-xs text-white/50">Actions: {p.actions.join(", ")}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
