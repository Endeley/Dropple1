"use client";

import { useState } from "react";
import { createNodeGraph, addNode, connectNodes } from "@/lib/vfx/compositor/nodeGraph";
import { chromaKey } from "@/lib/vfx/nodes/keying/chromaKey";
import { gaussianBlur } from "@/lib/vfx/nodes/blur/gaussian";
import { glow } from "@/lib/vfx/nodes/stylize/glow";

export default function VFXPanel() {
  const [graph, setGraph] = useState(createNodeGraph());

  const addDemo = () => {
    let g = createNodeGraph();
    const keyNode = chromaKey("inputVideo", { keyColor: [0, 1, 0], tolerance: 0.12 });
    const blurNode = gaussianBlur("keyed", { radius: 10 });
    const glowNode = glow("blurred", { intensity: 1.4, threshold: 0.5 });
    g = addNode(g, keyNode);
    g = addNode(g, blurNode);
    g = addNode(g, glowNode);
    g = connectNodes(g, keyNode, blurNode);
    g = connectNodes(g, blurNode, glowNode);
    setGraph(g);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">VFX Engine</h3>
        <button
          onClick={addDemo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Add Demo Stack
        </button>
      </div>
      <p className="mt-2 text-xs text-white/60">Node-graph placeholder (chroma key → blur → glow).</p>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {JSON.stringify(graph, null, 2)}
      </pre>
    </div>
  );
}
