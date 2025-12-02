"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const styles = [
  "narrator",
  "commercial",
  "calm",
  "angry",
  "friendly",
  "assistant",
  "villain",
  "child",
  "deep",
  "robotic",
];

export default function VoiceStyleSelector() {
  const voiceStyle = useAIStudioStore((s) => s.voiceStyle);
  const setVoiceStyle = useAIStudioStore((s) => s.setVoiceStyle);

  return (
    <div>
      <p className="text-sm text-white/80 mb-2">Voice Style</p>
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setVoiceStyle(style)}
            className={`px-2 py-1 text-xs rounded-lg border transition ${
              voiceStyle === style
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
