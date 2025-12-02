"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function TemplatePreview() {
  const generatedTemplateJSON = useAIStudioStore((s) => s.generatedTemplateJSON);

  if (!generatedTemplateJSON) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Generate a template to preview
      </div>
    );
  }

  return (
    <div className="p-4 w-full h-full overflow-auto bg-white/[0.05] border border-white/10 rounded-xl text-white">
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify(generatedTemplateJSON, null, 2)}
      </pre>
    </div>
  );
}
