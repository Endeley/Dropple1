"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const MOCKUP_TYPES = [
  "shirt",
  "hoodie",
  "cap",
  "mug",
  "bottle",
  "phone",
  "laptop",
  "poster",
  "billboard",
  "box",
  "book",
  "tag",
  "tote",
];

export default function MockupPanel() {
  const applyMockup = useTemplateStore((s) => s.renderMockupToCanvas);
  const [selectedType, setSelectedType] = useState("shirt");

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Auto Mockup</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
        >
          {MOCKUP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Mockup preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 to-black/10 text-[11px] font-semibold text-white">
          Mockup Preview
        </div>
      </div>

      <button
        type="button"
        onClick={() => applyMockup?.(selectedType)}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Insert Mockup
      </button>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Uses your uploaded image as the default design source. Apply to ready-made mockup definitions; warp, lighting,
        and masking will be layered automatically.
      </p>
    </div>
  );
}
