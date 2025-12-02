"use client";

import { useState } from "react";
import { on, emit } from "@/lib/interaction/core/eventSystem";
import { createStateMachine, addTransition, applyEvent } from "@/lib/interaction/core/stateMachine";
import { setVar, getAllVars } from "@/lib/interaction/core/variableStore";
import { executeAction } from "@/lib/interaction/core/actionSystem";
import { createChoice, resolveChoice } from "@/lib/interaction/logic/storyBranching";

export default function InteractionPanel() {
  const [machine, setMachine] = useState(createStateMachine("scene1"));
  const [log, setLog] = useState([]);

  const setup = () => {
    let m = addTransition(machine, "scene1", "clickDoor", "scene2");
    m = addTransition(m, "scene2", "chooseA", "sceneA");
    m = addTransition(m, "scene2", "chooseB", "sceneB");
    setMachine(m);
    setLog((l) => [...l, "Transitions set"]);
  };

  const trigger = (event) => {
    const next = applyEvent(machine, event);
    setMachine(next);
    setLog((l) => [...l, `Event: ${event} -> state ${next.state}`]);
  };

  const runAction = () => {
    const res = executeAction({ type: "playAnimation", params: { id: "slideIn" } }, { setVar });
    setLog((l) => [...l, `Action: ${res.note || res.ok}`]);
  };

  const choice = createChoice({
    id: "c1",
    options: [
      { label: "Help", goTo: "sceneHelp" },
      { label: "Ignore", goTo: "sceneIgnore" },
    ],
  });

  const choose = (label) => {
    const target = resolveChoice(choice, label);
    if (target) {
      setMachine((m) => ({ ...m, state: target }));
      setLog((l) => [...l, `Choice "${label}" -> ${target}`]);
    }
  };

  // Demo event listener
  on("demo", (payload) => setLog((l) => [...l, `Event received: ${payload}`]));

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Interaction Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={setup}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Setup
          </button>
          <button
            onClick={() => emit("demo", "Hello")}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Emit Event
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => trigger("clickDoor")}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Click Door
        </button>
        <button
          onClick={() => trigger("chooseA")}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Choose A
        </button>
        <button
          onClick={() => trigger("chooseB")}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Choose B
        </button>
        <button
          onClick={runAction}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Play Action
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => choose("Help")}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Choice: Help
        </button>
        <button
          onClick={() => choose("Ignore")}
          className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          type="button"
        >
          Choice: Ignore
        </button>
      </div>

      <p className="mt-3 text-xs text-white/60">State: {machine.state}</p>
      <p className="text-xs text-white/60">Variables: {JSON.stringify(getAllVars())}</p>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
