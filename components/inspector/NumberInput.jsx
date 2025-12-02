"use client";

export default function NumberInput({ label, value, onChange, min, max, step = 1 }) {
  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-white/50">{label}</p>
      <input
        type="number"
        value={value ?? 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-violet-500/50 outline-none"
      />
    </div>
  );
}
