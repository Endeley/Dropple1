"use client";

import { useState } from "react";
import { addAction, getRecentActions, clearActions } from "@/lib/context/core/actionTracker";
import { analyzeScene } from "@/lib/context/core/sceneAnalyzer";
import { getBehaviorProfile, learnFromActions, resetBehavior } from "@/lib/context/core/behaviorModel";
import { predictIntent } from "@/lib/context/prediction/intentPredictor";
import { predictTool } from "@/lib/context/prediction/toolPredictor";
import { getSmartSuggestions } from "@/lib/context/suggestions/smartSuggest";
import { applyAdaptiveUI } from "@/lib/context/ui/adaptiveInterface";
import { reconfigurePanels } from "@/lib/context/ui/panelReconfig";
import { getHints, addHint, clearHints } from "@/lib/context/ui/hintSystem";
import { computeSceneComplexity } from "@/lib/context/analysis/sceneComplexity";

const sampleState = {
  mode: "design",
  brand: "Dropple",
  layers: [
    { id: "1", name: "Hero Text", type: "text" },
    { id: "2", name: "CTA Button", type: "ui" },
    { id: "3", name: "BG Image", type: "image" },
  ],
  selection: [{ id: "1", type: "text" }, { id: "2", type: "ui" }],
};

export default function ContextPanel() {
  const [log, setLog] = useState([]);
  const [state, setState] = useState(sampleState);

  const simulateAction = () => {
    addAction("select", { tool: "text", color: "#8B5CF6" });
    addAction("align", { tool: "align", layout: "grid" });
    learnFromActions(getRecentActions());
    addHint("Auto-align applied");
    const analysis = analyzeScene(state);
    const intent = predictIntent(state);
    const tool = predictTool({ recentActions: getRecentActions(), selection: state.selection });
    const suggestions = getSmartSuggestions(state);
    const ui = applyAdaptiveUI({ mode: state.mode, selection: state.selection });
    const panels = reconfigurePanels({ mode: state.mode, hasTimeline: false });
    const complexity = computeSceneComplexity(state);
    const profile = getBehaviorProfile();

    setLog((l) => [
      ...l,
      `Intent: ${intent.intent} (${intent.reason})`,
      `Suggested tool: ${tool}`,
      `Next actions: ${suggestions.nextActions.join(", ")}`,
      `Templates: ${suggestions.templates.join(", ")}`,
      `Styles: ${suggestions.styles.join(", ")}`,
      `UI panels: ${panels.join(" / ")} | density: ${ui.density}`,
      `Complexity: ${complexity}`,
      `Behavior: ${JSON.stringify(profile)}`,
      `Hints: ${getHints()
        .map((h) => h.text)
        .join("; ")}`,
      `Scene analysis: layers=${analysis.layerCount}, selection=${analysis.selectionCount}`,
    ]);
  };

  const reset = () => {
    clearActions();
    resetBehavior();
    clearHints();
    setLog([]);
    setState(sampleState);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Context Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={simulateAction}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Predict
          </button>
          <button
            onClick={reset}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
