"use client";

export default function Slider({ label, value, onChange, min = 0, max = 1, step = 0.01 }) {
  return (
    <div className="space-y-1 text-sm">
      <div className="flex items-center justify-between text-xs text-white/50">
        <p>{label}</p>
        <span className="text-white/70">{value}</span>
      </div>
      <input
        type="range"
        value={value ?? 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full accent-violet-500"
      />
    </div>
  );
}
