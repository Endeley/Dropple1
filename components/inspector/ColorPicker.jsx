"use client";

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-white/50">{label}</p>
      <input
        type="color"
        value={value || "#ffffff"}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-10 rounded-lg bg-transparent border border-white/10 cursor-pointer"
      />
    </div>
  );
}
