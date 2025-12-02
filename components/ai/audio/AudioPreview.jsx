"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function AudioPreview() {
  const audioPreview = useAIStudioStore((s) => s.audioPreview);

  if (!audioPreview) {
    return (
      <div className="flex items-center justify-center text-gray-400 h-full">
        Upload or generate audio to preview
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white/[0.05] rounded-xl border border-white/10">
      <audio controls src={audioPreview} className="w-full" />
    </div>
  );
}
