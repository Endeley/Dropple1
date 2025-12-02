"use client";

import { useNodesStore } from "@/stores/nodesStore";

export default function InspectorDesignPanel({ node }) {
  const updateNode = useNodesStore((s) => s.updateNode);

  const update = (patch) => {
    updateNode(node.id, patch);
  };

  return (
    <div className="space-y-4 text-[11px]">
      <div>
        <div className="mb-1 text-[10px] uppercase tracking-widest text-slate-500">Name</div>
        <input
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-2 py-1.5 outline-none"
          defaultValue={node.name}
          onChange={(e) => update({ name: e.target.value })}
        />
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase text-slate-500">Position</div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="X" value={node.x} onChange={(v) => update({ x: v })} />
          <Field label="Y" value={node.y} onChange={(v) => update({ y: v })} />
        </div>
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase text-slate-500">Size</div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="W" value={node.width} onChange={(v) => update({ width: v })} />
          <Field label="H" value={node.height} onChange={(v) => update({ height: v })} />
        </div>
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase text-slate-500">Fill</div>
        <input
          type="color"
          className="h-8 w-16 rounded-md border border-slate-700"
          value={node.fills?.[0]?.color || "#000000"}
          onChange={(e) =>
            update({
              fills: [{ type: "solid", color: e.target.value }],
            })
          }
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-500">{label}</span>
      <input
        type="number"
        className="flex-1 rounded-md border border-slate-800 bg-slate-950 px-1 py-1 outline-none"
        defaultValue={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
