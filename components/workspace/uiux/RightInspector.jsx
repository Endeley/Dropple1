"use client";

import React from "react";
import { useSelectionStore } from "@/stores/selectionStore";
import { useNodesStore } from "@/stores/nodesStore";
import InspectorDesignPanel from "./inspector/InspectorDesignPanel";
import InspectorPrototypePanel from "./inspector/InspectorPrototypePanel";
import InspectorCodePanel from "./inspector/InspectorCodePanel";

export default function RightInspector() {
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const nodes = useNodesStore((s) => s.nodes);

  const selectedNode = selectedIds.length === 1 ? nodes[selectedIds[0]] : null;

  if (selectedIds.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-slate-500">
        Nothing selected
      </div>
    );
  }

  if (selectedIds.length > 1) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-slate-500">
        {selectedIds.length} layers selected
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col text-xs">
      <Tabs selectedNode={selectedNode} />
    </div>
  );
}

function Tabs({ selectedNode }) {
  const [tab, setTab] = React.useState("design");

  return (
    <>
      <div className="flex border-b border-slate-900">
        {["design", "prototype", "code"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 border-b-2 py-1.5 text-[11px] transition ${
              tab === t
                ? "border-violet-500 bg-slate-900 text-slate-100"
                : "border-transparent text-slate-400 hover:bg-slate-900/70 hover:text-slate-100"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-3">
        {tab === "design" && <InspectorDesignPanel node={selectedNode} />}
        {tab === "prototype" && <InspectorPrototypePanel node={selectedNode} />}
        {tab === "code" && <InspectorCodePanel node={selectedNode} />}
      </div>
    </>
  );
}
