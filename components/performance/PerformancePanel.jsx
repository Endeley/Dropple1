"use client";

import { useState } from "react";
import { createRenderGraph, addRenderNode, connectRenderNodes } from "@/lib/performance/gpu/renderGraph";
import { createJobScheduler, scheduleJob, runNext } from "@/lib/performance/cpu/jobScheduler";
import { cacheAsset, getCachedAsset } from "@/lib/performance/memory/assetCache";
import { computeDirtyRects } from "@/lib/performance/canvas/dirtyRects";
import { batchDrawCalls } from "@/lib/performance/canvas/drawBatcher";

export default function PerformancePanel() {
  const [graph, setGraph] = useState(createRenderGraph());
  const [scheduler, setScheduler] = useState(createJobScheduler());
  const [log, setLog] = useState([]);

  const addNodes = () => {
    let g = addRenderNode(graph, { id: "scene" });
    g = addRenderNode(g, { id: "cull" });
    g = addRenderNode(g, { id: "batch" });
    g = addRenderNode(g, { id: "render" });
    g = connectRenderNodes(g, "scene", "cull");
    g = connectRenderNodes(g, "cull", "batch");
    g = connectRenderNodes(g, "batch", "render");
    setGraph(g);
    setLog((l) => [...l, "Render graph updated"]);
  };

  const addJobs = () => {
    let s = scheduleJob(scheduler, { name: "physics" });
    s = scheduleJob(s, { name: "vfx" });
    s = scheduleJob(s, { name: "motion" });
    setScheduler(s);
    setLog((l) => [...l, "Jobs scheduled"]);
  };

  const stepJob = () => {
    const s = runNext(scheduler);
    setScheduler(s);
    setLog((l) => [...l, `Ran job: ${s.last?.name || "none"}`]);
  };

  const cacheDemo = () => {
    cacheAsset("tex", { size: "1MB" });
    const tex = getCachedAsset("tex");
    setLog((l) => [...l, `Cached asset: ${JSON.stringify(tex)}`]);
  };

  const dirtyDemo = () => {
    const rects = computeDirtyRects([{ bounds: [0, 0, 100, 100] }, { bounds: [50, 50, 120, 120] }]);
    const batches = batchDrawCalls([{ shader: "fill", rect: rects[0] }]);
    setLog((l) => [...l, `Dirty rects: ${JSON.stringify(rects)}`, `Batches: ${JSON.stringify(batches)}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Performance Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={addNodes}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Build Graph
          </button>
          <button
            onClick={addJobs}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Add Jobs
          </button>
          <button
            onClick={stepJob}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Step Job
          </button>
          <button
            onClick={cacheDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Cache
          </button>
          <button
            onClick={dirtyDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Dirty
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-white/60">Render nodes: {graph.nodes.length}</p>
      <p className="text-xs text-white/60">Jobs queued: {scheduler.queue.length}</p>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
