"use client";

import { useState } from "react";
import { interpretGoal } from "@/lib/intelligence2/planner/goalInterpreter";
import { planWorkflow } from "@/lib/intelligence2/planner/workflowPlanner";
import { resolveDependencies } from "@/lib/intelligence2/planner/dependencyResolver";
import { reasonOverPlan } from "@/lib/intelligence2/neural/reasoningModel";
import { sequenceNext } from "@/lib/intelligence2/neural/sequenceModel";
import { fuseAgents } from "@/lib/intelligence2/neural/multiAgentFusion";
import { buildPipeline } from "@/lib/intelligence2/orchestration/pipelineBuilder";
import { coordinateEngines } from "@/lib/intelligence2/orchestration/engineCoordinator";
import { routeTask } from "@/lib/intelligence2/orchestration/taskRouter";
import { autoFix } from "@/lib/intelligence2/runtime/autoFixer";
import { debugWorkflow } from "@/lib/intelligence2/runtime/workflowDebugger";
import { optimizePipeline } from "@/lib/intelligence2/runtime/adaptiveOptimizer";
import { runSceneAgent } from "@/lib/intelligence2/agents/sceneAgent";
import { runAnimationAgent } from "@/lib/intelligence2/agents/animationAgent";
import { runVFXAgent } from "@/lib/intelligence2/agents/vfxAgent";
import { runAudioAgent } from "@/lib/intelligence2/agents/audioAgent";
import { runRenderAgent } from "@/lib/intelligence2/agents/renderAgent";
import { runBrandAgent } from "@/lib/intelligence2/agents/brandAgent";

export default function Intelligence2Panel() {
  const [log, setLog] = useState([]);
  const [goal] = useState("Create a 10s brand intro video");

  const runPlanning = () => {
    const interpreted = interpretGoal(goal);
    const plan = planWorkflow(interpreted.tasks);
    const deps = resolveDependencies(plan);
    const reasoning = reasonOverPlan(deps);
    const next = sequenceNext(deps);
    const pipeline = buildPipeline(interpreted.tasks);
    const coordinated = coordinateEngines(pipeline);
    const optimized = optimizePipeline(coordinated);
    const debug = debugWorkflow(optimized);

    const agents = [
      runSceneAgent("layout"),
      runAnimationAgent("motion"),
      runVFXAgent("glow"),
      runAudioAgent("music"),
      runRenderAgent("export"),
      runBrandAgent("style", "Dropple"),
    ];
    const fusion = fuseAgents(agents);

    setLog((l) => [
      ...l,
      `Goal: ${goal}`,
      `Tasks: ${interpreted.tasks.join(", ")}`,
      `Next step: ${next?.action || "done"}`,
      `Routing sample: ${routeTask("add vfx pass")}`,
      `Reasoning issues: ${reasoning.issues.join(", ") || "none"}`,
      `Debug: ${debug.status}`,
      `Agents fused: ${fusion.count}`,
      `Auto-fix: ${autoFix("missing_asset").note}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Intelligence 2.0</h3>
        <button
          onClick={runPlanning}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Plan
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
