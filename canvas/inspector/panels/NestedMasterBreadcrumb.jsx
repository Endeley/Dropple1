"use client";

import { useEditorMode } from "@/canvas/editor/editorModeStore";
import { useComponentStore } from "@/canvas/components/componentStore";

export default function NestedMasterBreadcrumb() {
  const stack = useEditorMode((state) => state.masterStack);
  const jumpTo = useEditorMode((state) => state.jumpToMasterIndex);
  const exit = useEditorMode((state) => state.exitMasterMode);
  const exitCanvas = useEditorMode((state) => state.exitToCanvas);
  const masters = useComponentStore((state) => state.masters);

  if (!stack || stack.length <= 1) return null;

  return (
    <div className="bg-neutral-900/80 border border-white/5 rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-neutral-400">
      {stack.map((id, index) => {
        const name = masters[id]?.name || id;
        const isLast = index === stack.length - 1;
        return (
          <button
            key={id}
            className={`flex items-center gap-1 ${
              isLast
                ? "text-violet-300 cursor-default"
                : "hover:text-white/80"
            }`}
            disabled={isLast}
            onClick={() => {
              if (!isLast) {
                jumpTo(index);
              }
            }}
          >
            {index > 0 && <span className="opacity-50">›</span>}
            <span>{name}</span>
          </button>
        );
      })}

      <div className="ml-auto flex items-center gap-2">
        <button
          className="bg-neutral-800 px-2 py-1 rounded hover:bg-neutral-700"
          onClick={exit}
        >
          Back
        </button>
        <button
          className="bg-neutral-800/70 px-2 py-1 rounded hover:bg-neutral-700"
          onClick={exitCanvas}
        >
          Exit
        </button>
      </div>
    </div>
  );
}
