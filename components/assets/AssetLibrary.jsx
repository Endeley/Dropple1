"use client";

import { useEffect, useState } from "react";

export default function AssetLibrary() {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await fetch("/api/assets/list");
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Failed to load assets");
      setAssets(data.assets || []);
    } catch (err) {
      setError(err?.message || "Failed to load assets");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-xl text-purple-300">Asset Pipeline</h2>
      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}
      <div className="mt-4 grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {assets.map((a) => (
          <div key={a.id} className="rounded-lg border border-white/10 bg-black/30 p-3 text-xs">
            <p className="font-semibold">{a.metadata?.originalName || a.id}</p>
            <p className="text-white/60">{a.type}</p>
            <p className="text-white/50">{a.tags?.join(", ")}</p>
          </div>
        ))}
        {!assets.length && <p className="text-xs text-white/50">No assets ingested yet.</p>}
      </div>
    </div>
  );
}
