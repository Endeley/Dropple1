"use client";

export default function Select({ label, value, onChange, options = [] }) {
  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-white/50">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:border-violet-500/50 outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#0C0C12] text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
