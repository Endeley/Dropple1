"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const QUICK_THEMES = ["luxury", "playful", "dark mode", "neon", "minimal"];
const HARMONIES = ["Complementary", "Analogous", "Triadic", "Tetradic", "Monochrome", "Duotone"];

export default function AutoColorPanel() {
  const applyTheme = useTemplateStore((s) => s.applyColorTheme);
  const generateThemes = useTemplateStore((s) => s.generateColorThemes);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [harmony, setHarmony] = useState("Complementary");
  const themes = useTemplateStore((s) => s.generatedThemes);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Auto Coloring</h3>
        <select
          value={harmony}
          onChange={(e) => setHarmony(e.target.value)}
          className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
        >
          {HARMONIES.map((h) => (
            <option key={h}>{h}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {QUICK_THEMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => generateThemes?.(t, harmony)}
            className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Suggested Themes</div>
        <div className="grid grid-cols-3 gap-2">
          {(themes || []).map((theme, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedTheme(theme)}
              className={`flex h-16 flex-col overflow-hidden rounded border border-neutral-300 dark:border-neutral-700 ${
                selectedTheme === theme ? "ring-2 ring-violet-400" : ""
              }`}
            >
              <div className="flex flex-1">
                {theme?.palette?.slice(0, 4).map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="flex h-4">
                {theme?.accents?.slice(0, 3).map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => selectedTheme && applyTheme?.(selectedTheme)}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Apply Theme
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Color preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview recolors against your template background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Generates palettes from prompts and your uploaded image, then recolors fills, strokes, shadows, and gradients
        across the canvas based on semantic roles.
      </p>
    </div>
  );
}
