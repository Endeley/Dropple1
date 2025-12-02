"use client";

import { useState } from "react";
import { detectPlanes } from "@/lib/reality-engine/tracking/planeDetector";
import { addAnchor, listAnchors } from "@/lib/reality-engine/tracking/anchorSystem";
import { analyzeEnvironment } from "@/lib/reality-engine/ai/environmentAI";
import { placeARObject } from "@/lib/reality-engine/ar/arPlacement";
import { enablePassthrough } from "@/lib/reality-engine/xr/passthrough";
import { renderXR } from "@/lib/reality-engine/xr/xrRenderer";
import { composeMixedReality } from "@/lib/reality-engine/scene/mixedRealityComposer";

export default function RealityPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const planes = detectPlanes();
    const anchor = addAnchor("plane", { planeId: planes[0]?.id });
    const env = analyzeEnvironment();
    const placed = placeARObject(anchor.id, { name: "Hologram" });
    const xr = renderXR({ nodes: [placed] });
    const mix = composeMixedReality({ real: { mesh: true }, virtual: { nodes: [placed] } });
    enablePassthrough(true);

    setLog((l) => [
      ...l,
      `Planes: ${planes.length}`,
      `Anchor: ${anchor.id}`,
      `Env lighting: ${env.lighting}`,
      `Placed: ${placed.status}`,
      `XR nodes: ${xr.nodes}`,
      `Mixed: real ${mix.realLayers} / virtual ${mix.virtualLayers}`,
      `Anchors total: ${listAnchors().length}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Reality Engine</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
