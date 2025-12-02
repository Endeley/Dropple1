"use client";

import { useState } from "react";
import { createBrandKit, addAssetToKit } from "@/lib/branding/brandkits/kitManager";
import { generatePalette } from "@/lib/branding/brandkits/paletteGenerator";
import { generateTypeSystem } from "@/lib/branding/brandkits/typeSystem";
import { generateLogo } from "@/lib/branding/logos/logoAI";
import { generateStyleGuide } from "@/lib/branding/guidelines/styleGuideGenerator";

export default function BrandingPanel() {
  const [name, setName] = useState("Neon Dropple");
  const [kit, setKit] = useState(null);
  const [styleGuide, setStyleGuide] = useState(null);
  const [log, setLog] = useState([]);

  const create = async () => {
    const palette = generatePalette();
    const type = generateTypeSystem();
    const logo = await generateLogo({ name });
    const base = createBrandKit({ name, palette, typography: type, logos: logo.variants });
    const kitWithAssets = addAssetToKit(base, { type: "socialHeader", title: `${name} Header` });
    setKit(kitWithAssets);
    setStyleGuide(generateStyleGuide(kitWithAssets));
    setLog((l) => [...l, "Brand kit created"]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Branding Engine</h3>
        <button
          onClick={create}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Generate Kit
        </button>
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm"
        placeholder="Brand name"
      />

      {kit && (
        <div className="mt-4 space-y-2 text-xs">
          <p className="text-purple-300 font-semibold">Brand Kit</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(kit, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Style Guide</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(styleGuide, null, 2)}</pre>
        </div>
      )}

      <pre className="mt-3 max-h-48 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
