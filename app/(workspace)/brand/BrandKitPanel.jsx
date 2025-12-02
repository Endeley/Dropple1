"use client";

import { useBrandKitStore } from "@/foundation/brand/brandKitStore";
import { applyBrandToTokens } from "@/foundation/brand/applyBrandToTokens";
import { extractBrandPaletteFromLogo } from "@/foundation/brand/ai/extractPalette";

const fontOptions = [
  "Inter",
  "Nunito",
  "Space Grotesk",
  "Playfair Display",
  "Roboto",
];

const styleOptions = ["rounded", "soft", "sharp", "playful"];

export default function BrandKitPanel() {
  const activeKitId = useBrandKitStore((s) => s.activeKitId);
  const kits = useBrandKitStore((s) => s.kits);
  const updateKit = useBrandKitStore((s) => s.updateBrandKit);
  const createBrandKit = useBrandKitStore((s) => s.createBrandKit);

  const kit = kits[activeKitId];

  if (!kit) {
    return (
      <div className="mt-6 p-4 bg-neutral-900/70 border border-white/5 rounded-lg text-sm">
        <p className="text-neutral-400 mb-3">No brand kit yet.</p>
        <button
          className="bg-violet-600 text-white px-3 py-1.5 rounded text-xs"
          onClick={() =>
            createBrandKit({
              name: "New Brand",
            })
          }
        >
          Create Brand Kit
        </button>
      </div>
    );
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      updateKit(kit.id, { logo: base64 });
      const palette = await extractBrandPaletteFromLogo(base64);
      updateKit(kit.id, {
        colors: { ...kit.colors, ...palette },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleColorChange = (key, value) => {
    updateKit(kit.id, {
      colors: { ...kit.colors, [key]: value },
    });
  };

  const handleFontChange = (key, value) => {
    updateKit(kit.id, {
      fonts: { ...kit.fonts, [key]: value },
    });
  };

  const handleApplyBrand = () => {
    applyBrandToTokens(kit);
  };

  return (
    <div className="mt-6 space-y-4 p-4 bg-neutral-900/60 border border-white/5 rounded-lg">
      <div>
        <div className="text-sm font-semibold text-white">{kit.name}</div>
        <div className="text-[11px] text-neutral-400">Brand Kit</div>
      </div>

      <div className="space-y-2 text-xs text-neutral-300">
        <div className="font-semibold text-neutral-200">Logo</div>
        <input
          type="file"
          accept="image/*"
          className="text-[11px]"
          onChange={handleLogoUpload}
        />
        {kit.logo && (
          <img
            src={kit.logo}
            alt="Brand logo"
            className="mt-2 w-20 h-20 object-contain rounded border border-white/10"
          />
        )}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-neutral-200">Colors</div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(kit.colors).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="w-16 capitalize">{key}</span>
              <input
                type="color"
                className="h-7 w-14 rounded border border-white/10 bg-transparent"
                value={value ?? "#000000"}
                onChange={(e) => handleColorChange(key, e.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="font-semibold text-neutral-200">Fonts</div>
        <label className="flex items-center gap-2">
          <span className="w-16 text-neutral-400">Heading</span>
          <select
            className="flex-1 bg-neutral-800/80 rounded px-2 py-1 text-white/90"
            value={kit.fonts.heading ?? ""}
            onChange={(e) => handleFontChange("heading", e.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16 text-neutral-400">Body</span>
          <select
            className="flex-1 bg-neutral-800/80 rounded px-2 py-1 text-white/90"
            value={kit.fonts.body ?? ""}
            onChange={(e) => handleFontChange("body", e.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-2 text-xs">
        <div className="font-semibold text-neutral-200">Style</div>
        <select
          className="w-full bg-neutral-800/80 rounded px-2 py-1 text-white/90"
          value={kit.style}
          onChange={(e) => updateKit(kit.id, { style: e.target.value })}
        >
          {styleOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        className="w-full bg-violet-600 hover:bg-violet-500 text-sm py-2 rounded text-white"
        onClick={handleApplyBrand}
      >
        Apply Brand to Document
      </button>
    </div>
  );
}
