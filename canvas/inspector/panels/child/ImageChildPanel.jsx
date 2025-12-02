"use client";

import OverrideField from "@/canvas/inspector/override/OverrideField";

export default function ImageChildPanel() {
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 space-y-3">
      <OverrideField label="Image Source" prop="src">
        {({ value, onChange, disabled }) => (
          <input
            type="text"
            disabled={disabled}
            className="w-full p-2 bg-neutral-800/80 rounded"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL"
          />
        )}
      </OverrideField>
    </div>
  );
}
