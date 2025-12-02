"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const styles = ["studio", "outdoor", "flat-lay", "3d-render", "minimal", "futuristic"];

export default function MockupStyleSelector() {
  const mockupStyle = useAIStudioStore((s) => s.mockupStyle);
  const setMockupStyle = useAIStudioStore((s) => s.setMockupStyle);

  return (
    <div>
      <p className="text-sm text-white/80 mb-2">Scene Style</p>
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setMockupStyle(style)}
            className={`px-2 py-1 rounded-lg text-xs border transition ${
              mockupStyle === style
                ? "bg-violet-600 border-violet-500"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/10"
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}
