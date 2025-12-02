"use client";

import { useState } from "react";
import { selectBundle } from "@/lib/optimization/bundling/dynamicRouter";
import { treeShake } from "@/lib/optimization/bundling/treeShaker";
import { lazyLoad } from "@/lib/optimization/loading/lazyLoader";
import { memoize } from "@/lib/optimization/runtime/memoizedSelectors";
import { optimizeMedia } from "@/lib/optimization/assets/mediaOptimizer";

export default function OptimizationPanel() {
  const [log, setLog] = useState([]);

  const chooseBundle = (mode) => {
    const path = selectBundle(mode);
    setLog((l) => [...l, `Bundle for ${mode}: ${path}`]);
  };

  const shake = () => {
    const shaken = treeShake([1, null, 2, undefined, 3]);
    setLog((l) => [...l, `Tree-shaken modules: ${shaken.join(",")}`]);
  };

  const loadVFX = async () => {
    const res = await lazyLoad("vfx", async () => new Promise((r) => setTimeout(r, 10)));
    setLog((l) => [...l, `Lazy load vfx cached=${res.cached}`]);
  };

  const memoDemo = () => {
    const sum = memoize((a, b) => a + b);
    sum(1, 2);
    const result = sum(1, 2);
    setLog((l) => [...l, `Memoized sum: ${result}`]);
  };

  const optimize = () => {
    const media = optimizeMedia({ type: "image", src: "photo.png" });
    setLog((l) => [...l, `Optimized media: ${JSON.stringify(media)}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Optimization Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={() => chooseBundle("design")}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Bundle
          </button>
          <button
            onClick={shake}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Tree Shake
          </button>
          <button
            onClick={loadVFX}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Lazy Load
          </button>
          <button
            onClick={memoDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Memoize
          </button>
          <button
            onClick={optimize}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Optimize Media
          </button>
        </div>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
