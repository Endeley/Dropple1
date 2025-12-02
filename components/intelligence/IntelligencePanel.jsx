"use client";

import { useState } from "react";
import { createKnowledgeGraph, addNode, addEdge } from "@/lib/intelligence/core/knowledgeGraph";
import { createPlan, addStep } from "@/lib/intelligence/core/planner";
import { createBeliefs, addBelief } from "@/lib/intelligence/agents/beliefSystem";
import { decideAction } from "@/lib/intelligence/agents/decisionAI";
import { checkContinuity } from "@/lib/intelligence/world/continuityChecker";

export default function IntelligencePanel() {
  const [graph, setGraph] = useState(createKnowledgeGraph());
  const [plan, setPlan] = useState(createPlan({ goal: "Tell story" }));
  const [beliefs, setBeliefs] = useState(createBeliefs());
  const [decision, setDecision] = useState(null);
  const [continuity, setContinuity] = useState(null);

  const seed = () => {
    let g = addNode(graph, { id: "Lara", type: "character" });
    g = addNode(g, { id: "Milo", type: "character" });
    g = addEdge(g, "Lara", "friends", "Milo");
    setGraph(g);

    let p = addStep(plan, { desc: "Introduce characters" });
    p = addStep(p, { desc: "Raise stakes" });
    setPlan(p);

    let b = addBelief(beliefs, "Lara trusts Milo");
    b = addBelief(b, "Milo fears the storm");
    setBeliefs(b);
  };

  const runDecision = () => {
    const d = decideAction({ beliefs, goals: ["protect", "explore"] });
    setDecision(d);
  };

  const runContinuity = () => {
    const c = checkContinuity({ graph, events: plan.steps || [] });
    setContinuity(c);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Intelligence Engine</h3>
        <button
          onClick={seed}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Seed
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={runDecision}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Decide Action
        </button>
        <button
          onClick={runContinuity}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Check Continuity
        </button>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <p className="text-purple-300 font-semibold">Knowledge Graph</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(graph, null, 2)}</pre>

        <p className="text-purple-300 font-semibold">Plan</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(plan, null, 2)}</pre>

        <p className="text-purple-300 font-semibold">Beliefs</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(beliefs, null, 2)}</pre>

        {decision && (
          <>
            <p className="text-purple-300 font-semibold">Decision</p>
            <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(decision, null, 2)}</pre>
          </>
        )}

        {continuity && (
          <>
            <p className="text-purple-300 font-semibold">Continuity</p>
            <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(continuity, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
