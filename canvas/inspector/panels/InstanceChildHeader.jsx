"use client";

export default function InstanceChildHeader({ layer }) {
  if (!layer) return null;
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3">
      <div className="text-xs text-neutral-400 font-semibold">COMPONENT LAYER</div>
      <div className="text-sm text-white mt-1">{layer.name || layer.type}</div>
    </div>
  );
}
