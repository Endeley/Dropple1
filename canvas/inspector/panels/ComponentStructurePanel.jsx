"use client";

import { useResolvedLayerTree } from "@/canvas/components/getResolvedLayerTree";
import { useLayerSelectionStore } from "@/canvas/selection/layerSelectionStore";
import { useComponentStore } from "@/canvas/components/componentStore";
import { useEditorMode } from "@/canvas/editor/editorModeStore";
import { LayerType } from "@/canvas/core/layerTypes";
import { useComponentStore } from "@/canvas/components/componentStore";

export default function ComponentStructurePanel({ instanceLayer }) {
  const selected = useLayerSelectionStore((s) => s.selected);
  const resolved = useResolvedLayerTree(instanceLayer.id);
  if (!resolved) return null;
  const { layers, rootLayerIds } = resolved;
  const instance = useComponentStore((state) => state.instances[instanceLayer.id]);
  const overrides = instance?.overrides || {};

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">COMPONENT STRUCTURE</div>
      {rootLayerIds.map((id) => (
        <LayerNode
          key={id}
          layerId={id}
          layers={layers}
          depth={0}
          instanceId={instanceLayer.id}
          selected={selected}
          overrides={overrides}
        />
      ))}
    </div>
  );
}

function LayerNode({ layerId, layers, depth, instanceId, selected, overrides }) {
  const layer = layers[layerId];
  const enterMaster = useEditorMode((state) => state.enterMasterMode);
  const canEditNested = useComponentStore((state) =>
    layer?.masterId ? Boolean(state.masters[layer.masterId]) : false
  );
  if (!layer) return null;
  const selectChild = useLayerSelectionStore((s) => s.selectInstanceChild);
  const isSelected =
    selected?.type === "instance-child" &&
    selected.instanceId === instanceId &&
    selected.layerId === layerId;
  const hasOverride = Object.keys(overrides).some((key) => key.startsWith(`${layerId}:`));
  const isComponent = layer.type === LayerType.COMPONENT_INSTANCE;

  return (
    <div>
      <div
        className={`w-full flex items-center gap-2 text-left text-xs px-2 py-1 rounded ${
          isSelected ? "bg-violet-600/30 text-violet-200" : "hover:bg-neutral-800/70"
        }`}
        style={{ paddingLeft: depth * 12 }}
      >
        <button className="flex-1 text-left" onClick={() => selectChild(instanceId, layerId)}>
          <span>{layer.name || layer.type}</span>
          {hasOverride && <span className="text-violet-400 ml-1">⚡</span>}
        </button>

        {isComponent && layer.masterId && canEditNested && (
          <button
            className="text-[10px] px-2 py-0.5 rounded bg-violet-600/40 text-violet-100 hover:bg-violet-600/60"
            onClick={() => enterMaster(layer.masterId, { reset: true })}
          >
            Edit
          </button>
        )}
      </div>
      {layer.children?.map((childId) => (
        <LayerNode
          key={childId}
          layerId={childId}
          layers={layers}
          depth={depth + 1}
          instanceId={instanceId}
          selected={selected}
          overrides={overrides}
        />
      ))}
    </div>
  );
}
