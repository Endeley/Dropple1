"use client";

import OverrideField from "@/canvas/inspector/override/OverrideField";

export default function TextChildPanel() {
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 space-y-3">
      <OverrideField label="Text" prop="text">
        {({ value, onChange, disabled }) => (
          <textarea
            disabled={disabled}
            className={`w-full p-2 rounded bg-neutral-800/80 text-sm ${
              disabled ? "opacity-40" : ""
            }`}
            rows={3}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </OverrideField>

      <OverrideField label="Font Size" prop="fontSize">
        {({ value, onChange, disabled }) => (
          <input
            type="number"
            disabled={disabled}
            className="w-full p-2 rounded bg-neutral-800/80"
            value={value || 16}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        )}
      </OverrideField>
    </div>
  );
}
