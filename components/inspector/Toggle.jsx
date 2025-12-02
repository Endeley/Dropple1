"use client";

export default function Toggle({ label, checked, value, onChange }) {
  const isActive = checked ?? value ?? false;
  return (
    <label className="flex items-center justify-between text-sm">
      <span className="text-white/70">{label}</span>
      <button
        type="button"
        onClick={() => onChange?.(!isActive)}
        className={`w-12 h-6 rounded-full p-1 transition ${
          isActive ? "bg-violet-600" : "bg-white/10"
        }`}
      >
        <span
          className={`block w-4 h-4 rounded-full bg-white transition-transform ${
            isActive ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}
