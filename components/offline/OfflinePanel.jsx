"use client";

import { useEffect, useState } from "react";
import { detectOffline } from "@/lib/offline/mode/offlineDetector";
import { saveProjectLocal, loadProjectLocal, cacheAssetLocal, getAssetLocal } from "@/lib/offline/storage/localDB";
import { renderLocal } from "@/lib/offline/compute/localRender";
import { trackDelta, getDeltas, clearDeltas } from "@/lib/offline/sync/deltaTracker";

export default function OfflinePanel() {
  const [offline, setOffline] = useState(false);
  const [log, setLog] = useState([]);

  useEffect(() => {
    setOffline(detectOffline());
  }, []);

  const saveProject = () => {
    saveProjectLocal("proj_demo", { name: "Offline Demo" });
    setLog((l) => [...l, "Project saved locally"]);
  };

  const loadProject = () => {
    const p = loadProjectLocal("proj_demo");
    setLog((l) => [...l, `Loaded: ${JSON.stringify(p)}`]);
  };

  const cacheAsset = () => {
    cacheAssetLocal("asset_demo", { type: "image", src: "thumb.png" });
    const a = getAssetLocal("asset_demo");
    setLog((l) => [...l, `Cached asset: ${JSON.stringify(a)}`]);
  };

  const render = () => {
    const r = renderLocal({ sceneId: "scene_local", format: "png" });
    setLog((l) => [...l, `Render: ${JSON.stringify(r)}`]);
  };

  const addDelta = () => {
    trackDelta({ type: "layerUpdate", id: "layer1" });
    setLog((l) => [...l, `Deltas: ${getDeltas().length}`]);
  };

  const clear = () => {
    clearDeltas();
    setLog((l) => [...l, "Deltas cleared"]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Offline Engine</h3>
        <span className="text-xs text-white/70">{offline ? "Offline" : "Online"}</span>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={saveProject} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
          Save Project
        </button>
        <button onClick={loadProject} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
          Load Project
        </button>
        <button onClick={cacheAsset} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
          Cache Asset
        </button>
        <button onClick={render} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
          Local Render
        </button>
        <button onClick={addDelta} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
          Add Delta
        </button>
        <button onClick={clear} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
          Clear Deltas
        </button>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
