"use client";

import { useState } from "react";
import { createMaterial, listMaterials } from "@/lib/material-engine-2.0/core/materialManager";
import { buildPBR } from "@/lib/material-engine-2.0/core/pbrPipeline";
import { compileShader } from "@/lib/material-engine-2.0/core/shaderCompiler";
import { generateProceduralTexture } from "@/lib/material-engine-2.0/core/proceduralTextureEngine";
import { generateProceduralMaterial } from "@/lib/material-engine-2.0/generators/proceduralMaterialGenerator";
import { applyWorldAwareness } from "@/lib/material-engine-2.0/features/worldAwareMaterials";
import { animateMaterialOnTimeline } from "@/lib/material-engine-2.0/integration/animationEngine";

export default function MaterialEnginePanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const mat = createMaterial("Neon Glass", "pbr");
    const pbr = buildPBR({ metallic: 0.8, roughness: 0.2 });
    const procTex = generateProceduralTexture("noise");
    const procMat = generateProceduralMaterial(42);
    const compiled = compileShader(mat);
    const worldAware = applyWorldAwareness(mat, { biome: "neon_city" });
    const linked = animateMaterialOnTimeline(mat, "tl_demo");

    setLog((l) => [
      ...l,
      `Material: ${mat.id}`,
      `Pipeline: ${pbr.type}`,
      `Texture: ${procTex.texture}`,
      `Procedural maps: ${procMat.maps.join(",")}`,
      `Compiled: ${compiled.status}`,
      `World biome: ${worldAware.worldContext.biome}`,
      `Timeline link: ${linked.status}`,
      `Materials total: ${listMaterials().length}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Material Engine 2.0</h3>
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
