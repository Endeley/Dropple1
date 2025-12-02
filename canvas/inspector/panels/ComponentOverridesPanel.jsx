"use client";

import { useComponentStore } from "@/canvas/components/componentStore";
import { useEditorMode } from "@/canvas/editor/editorModeStore";
import { useComponentDefinition } from "@/foundation/libraries/getComponentDefinition";

export default function ComponentOverridesPanel({ layer }) {
  const instances = useComponentStore((state) => state.instances);
  const instance = instances[layer.id];
  const enterMaster = useEditorMode((state) => state.enterMasterMode);
  const { master, source } = useComponentDefinition(instance?.masterId);
  if (!instance || !master) return null;

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-3">
      <div className="text-xs text-neutral-400 font-semibold">COMPONENT INSTANCE</div>
      <div className="text-xs text-white/70">
        Master: {master.name || "Unknown"}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          className={`rounded px-2 py-1 ${
            source?.type === "document"
              ? "bg-neutral-800/80 hover:bg-neutral-700"
              : "bg-neutral-800/40 text-neutral-500 cursor-not-allowed"
          }`}
          disabled={source?.type !== "document"}
          onClick={() =>
            source?.type === "document"
              ? enterMaster(master.id, { reset: true })
              : null
          }
        >
          {source?.type === "document" ? "Edit Master" : "Library Master"}
        </button>
        <button
          className="bg-neutral-800/80 rounded px-2 py-1 hover:bg-neutral-700"
          onClick={() => console.log("Detach instance", instance.id)}
        >
          Detach
        </button>
      </div>
    </div>
  );
}
