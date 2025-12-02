"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function DevCodeBlock() {
  const devGeneratedCode = useAIStudioStore((s) => s.devGeneratedCode);

  return (
    <div className="p-4 flex-1 overflow-auto">
      <p className="text-xs text-white/60 mb-2">GENERATED CODE</p>
      <pre className="bg-black/20 border border-white/10 rounded-xl p-4 text-xs text-white/90 whitespace-pre-wrap">
        {devGeneratedCode || "// Generate code using the Export Bar"}
      </pre>
    </div>
  );
}
