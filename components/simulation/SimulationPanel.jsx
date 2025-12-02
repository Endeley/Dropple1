"use client";

import { useState } from "react";
import { createAgent, updateAgent } from "@/lib/simulation/core/agentSystem";
import { computeFlocking } from "@/lib/simulation/crowds/flocking";
import { simulateWeather } from "@/lib/simulation/environment/weatherSimulation";
import { findPath } from "@/lib/simulation/core/pathfinding";

export default function SimulationPanel() {
  const [agents, setAgents] = useState([]);
  const [weather, setWeather] = useState(simulateWeather({ preset: "clear" }));
  const [log, setLog] = useState([]);

  const addAgent = () => {
    const a = createAgent({ personality: ["curious"], goals: ["explore"], behavior: "wander" });
    setAgents((prev) => [...prev, a]);
  };

  const stepAgents = () => {
    const updated = agents.map((a) => updateAgent(a, 1 / 30));
    setAgents(updated);
    const flock = computeFlocking(updated);
    setLog((l) => [...l, `Flocking: ${flock.note}`]);
  };

  const changeWeather = (preset) => {
    const w = simulateWeather({ preset });
    setWeather(w);
    setLog((l) => [...l, `Weather preset: ${preset}`]);
  };

  const demoPath = () => {
    const p = findPath([0, 0, 0], [5, 0, 5], []);
    setLog((l) => [...l, `Path: ${JSON.stringify(p)}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Simulation Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={addAgent}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Add Agent
          </button>
          <button
            onClick={stepAgents}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Step Agents
          </button>
          <button
            onClick={() => changeWeather("rain")}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Rain
          </button>
          <button
            onClick={() => changeWeather("fog")}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Fog
          </button>
          <button
            onClick={demoPath}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Path
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-white/60">Agents: {agents.length}</p>
      <p className="text-xs text-white/60">Weather: {JSON.stringify(weather)}</p>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
