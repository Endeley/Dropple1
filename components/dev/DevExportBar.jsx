"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";
import generateCodeFromDesign from "@/lib/dev/generateCodeFromDesign";

export default function DevExportBar() {
  const devExportType = useAIStudioStore((s) => s.devExportType);
  const setDevExportType = useAIStudioStore((s) => s.setDevExportType);
  const setDevGeneratedCode = useAIStudioStore((s) => s.setDevGeneratedCode);

  const generate = async () => {
    const code = await generateCodeFromDesign(devExportType);
    setDevGeneratedCode(code);
  };

  return (
    <div className="p-4 border-b border-white/10 flex items-center gap-3">
      <select
        value={devExportType}
        onChange={(e) => setDevExportType(e.target.value)}
        className="bg-black/20 border border-white/10 rounded-xl px-3 py-1 text-sm text-white/80"
      >
        <option value="html">HTML + CSS</option>
        <option value="tailwind">Tailwind</option>
        <option value="react">React Component</option>
        <option value="nextjs">Next.js Page</option>
        <option value="framer">Framer Motion</option>
        <option value="email">HTML Email</option>
      </select>

      <button
        onClick={generate}
        className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold"
      >
        Generate
      </button>
    </div>
  );
}
