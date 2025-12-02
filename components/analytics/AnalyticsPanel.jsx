"use client";

import { useState } from "react";
import { logEvent, getBuffer } from "@/lib/analytics/core/collector";
import { incCounter, setGauge, getMetrics } from "@/lib/analytics/core/metricsStore";
import { logClick, getHeatmap } from "@/lib/analytics/heatmaps/uiHeatmapTracker";

export default function AnalyticsPanel() {
  const [log, setLog] = useState([]);

  const demoEvents = () => {
    logEvent("tool_used", { tool: "brush" });
    logEvent("asset_import", { type: "image" });
    incCounter("ai_requests", 2);
    setGauge("fps", 59.9);
    logClick(Math.random() * 500, Math.random() * 400);
    setLog((l) => [...l, "Events logged"]);
  };

  const refresh = () => {
    const events = getBuffer();
    const metrics = getMetrics();
    const heatmap = getHeatmap();
    setLog((l) => [
      ...l,
      `Buffer: ${events.length} events`,
      `Counters: ${JSON.stringify(metrics.counters)}`,
      `Gauges: ${JSON.stringify(metrics.gauges)}`,
      `Heatmap points: ${heatmap.length}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Analytics Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={demoEvents}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Log Demo
          </button>
          <button
            onClick={refresh}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Refresh
          </button>
        </div>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
