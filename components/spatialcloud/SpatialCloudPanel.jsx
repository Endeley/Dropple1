"use client";

import { useState } from "react";
import { allocateGPU } from "@/lib/spatial-cloud/compute/gpuClusters";
import { submitRender } from "@/lib/spatial-cloud/compute/renderFarm";
import { saveWorldState, loadWorldState } from "@/lib/spatial-cloud/persistence/worldStateStorage";
import { streamXR } from "@/lib/spatial-cloud/networking/xrStreaming";
import { pickEdgeRegion } from "@/lib/spatial-cloud/networking/lowLatencyNet";
import { runCloudAI } from "@/lib/spatial-cloud/ai/cloudAI";

export default function SpatialCloudPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const gpu = allocateGPU("rtx");
    const render = submitRender({ type: "frame", scene: "demo" });
    saveWorldState("world_1", { weather: "rain" });
    const loaded = loadWorldState("world_1");
    const xr = streamXR("xr_session_1");
    const edge = pickEdgeRegion("us-east");
    const ai = runCloudAI("neural_render");

    setLog((l) => [
      ...l,
      `GPU: ${gpu.id}`,
      `Render job: ${render.jobId}`,
      `World weather: ${loaded?.state?.weather}`,
      `XR stream: ${xr.stream}`,
      `Edge: ${edge.region}`,
      `AI job: ${ai.jobId}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Spatial Cloud</h3>
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
