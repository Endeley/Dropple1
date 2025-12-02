"use client";

import { useState } from "react";
import { createAgent, listAgents } from "@/lib/agent-framework/core/agentManager";
import { registerAgent, getAgent } from "@/lib/agent-framework/core/agentRegistry";
import { setStatus } from "@/lib/agent-framework/core/agentState";
import { addAgentMemory, getAgentMemories } from "@/lib/agent-framework/core/agentMemory";
import { designAgentTask } from "@/lib/agent-framework/types/designAgent";
import { animationAgentTask } from "@/lib/agent-framework/types/animationAgent";
import { vfxAgentTask } from "@/lib/agent-framework/types/vfxAgent";
import { orchestrate } from "@/lib/agent-framework/orchestration/agentOrchestrator";
import { coordinate } from "@/lib/agent-framework/orchestration/multiAgentCoordinator";
import { resolveAgentConflicts } from "@/lib/agent-framework/orchestration/agentConflictResolver";

export default function AgentFrameworkPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const agent = createAgent("Ava", "design");
    registerAgent(agent);
    setStatus(agent, "busy");
    addAgentMemory(agent.id, "Fixed layout spacing");
    const memories = getAgentMemories(agent.id);
    const taskDesign = designAgentTask("fix layout");
    const taskAnim = animationAgentTask("add intro motion");
    const taskVfx = vfxAgentTask("add glow");
    const plan = orchestrate([taskDesign, taskAnim, taskVfx]);
    const coord = coordinate([agent]);
    const conflicts = resolveAgentConflicts(plan);

    setLog((l) => [
      ...l,
      `Agent created: ${agent.id}`,
      `Agents count: ${listAgents().length}`,
      `Memories: ${memories.length}`,
      `Plan steps: ${plan.length}`,
      `Coord status: ${coord.status}`,
      `Conflict resolution: ${conflicts.resolution}`,
      `Fetch registered: ${getAgent(agent.id)?.id}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Agent Framework</h3>
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
