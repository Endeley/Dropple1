"use client";

import { useState } from "react";
import { saveEpisodic, saveSemantic, saveProcedural, savePreference, getMemorySnapshot } from "@/lib/memory-engine/core/memoryManager";
import { logUserAction } from "@/lib/memory-engine/user/userHistory";
import { rememberStyle, lastStyle } from "@/lib/memory-engine/user/styleMemory";
import { trackSkill, getSkills } from "@/lib/memory-engine/user/skillTracker";
import { logProjectStep } from "@/lib/memory-engine/project/projectTimeline";
import { logDecision } from "@/lib/memory-engine/project/decisionMemory";
import { rememberWorldEvent } from "@/lib/memory-engine/universe/worldMemory";
import { storeAIInteraction, recallAI } from "@/lib/memory-engine/ai/aiMemoryStore";

export default function MemoryPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    saveEpisodic({ action: "edit_layer" });
    saveSemantic("palette", "Vibrant");
    saveProcedural("align");
    savePreference("curve", "easeInOut");
    logUserAction("added_text");
    rememberStyle("neon");
    trackSkill("animation", 2);
    logProjectStep("proj_1", "import_asset");
    logDecision("proj_1", "kept neon background");
    rememberWorldEvent("world_1", "rain_started");
    storeAIInteraction("user_1", "make it purple", "done");

    const snap = getMemorySnapshot();
    const skills = getSkills();
    const ai = recallAI("user_1");

    setLog((l) => [
      ...l,
      `Episodic count: ${snap.episodic.length}`,
      `Semantic keys: ${snap.semantic.length}`,
      `Last style: ${lastStyle()}`,
      `Skills: ${skills.length}`,
      `AI recalls: ${ai.length}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Memory Engine</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
