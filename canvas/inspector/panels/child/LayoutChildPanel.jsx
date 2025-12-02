"use client";

import OverrideField from "@/canvas/inspector/override/OverrideField";

export default function LayoutChildPanel() {
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 space-y-3">
      <OverrideField label="Spacing" prop="spacing">
        {({ value, onChange, disabled }) => (
          <input
            type="number"
            disabled={disabled}
            className="w-full p-2 bg-neutral-800/80 rounded"
            value={value ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        )}
      </OverrideField>

      <OverrideField label="Padding Top" prop="padding.top">
        {({ value, onChange, disabled }) => (
          <input
            type="number"
            disabled={disabled}
            className="w-full p-2 bg-neutral-800/80 rounded"
            value={value ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        )}
      </OverrideField>
    </div>
  );
}
