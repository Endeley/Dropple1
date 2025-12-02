"use client";

import OverrideField from "@/canvas/inspector/override/OverrideField";
import TokenValuePicker from "@/canvas/inspector/controls/TokenValuePicker";

export default function ShadowChildPanel() {
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 space-y-3">
      <OverrideField label="Shadow Color" prop="shadows[0].color">
        {({ value, onChange, disabled }) => (
          <TokenValuePicker value={value || "#000000"} onChange={onChange} disabled={disabled} />
        )}
      </OverrideField>

      <div className="grid grid-cols-3 gap-2">
        <OverrideField label="X" prop="shadows[0].x">
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
        <OverrideField label="Y" prop="shadows[0].y">
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
        <OverrideField label="Blur" prop="shadows[0].blur">
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
    </div>
  );
}
