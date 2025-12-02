"use client";

import { LayerType } from "@/canvas/core/layerTypes";
import { useEditorMode } from "@/canvas/editor/editorModeStore";
import { useComponentStore } from "@/canvas/components/componentStore";

export default function MasterStructurePanel({ master }) {
  const layers = master.layers || {};
  const roots = master.rootLayerIds || [];

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">LAYERS</div>

      {roots.length === 0 && (
        <div className="text-xs text-neutral-500">No layers inside component.</div>
      )}

      {roots.map((id) => (
        <LayerNode key={id} id={id} layers={layers} depth={0} />
      ))}
    </div>
  );
}

function LayerNode({ id, layers, depth }) {
  const enterMaster = useEditorMode((state) => state.enterMasterMode);
  const layer = layers[id];
  const canEditNested = useComponentStore((state) =>
    layer?.masterId ? Boolean(state.masters[layer.masterId]) : false
  );
  if (!layer) return null;

  const isComponent = layer.type === LayerType.COMPONENT_INSTANCE;
  const label = layer.name || layer.type || id;

  return (
    <div className="space-y-1">
      <div
        className="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-neutral-800/60"
        style={{ paddingLeft: depth * 12 }}
      >
        <span className="text-xs">{label}</span>
        {isComponent && layer.masterId && canEditNested && (
          <button
            className="text-[10px] px-2 py-0.5 rounded bg-violet-600/40 text-violet-100 hover:bg-violet-600/60"
            onClick={() => enterMaster(layer.masterId)}
          >
            Edit
          </button>
        )}
      </div>

      {layer.children?.map((childId) => (
        <LayerNode
          key={childId}
          id={childId}
          layers={layers}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
