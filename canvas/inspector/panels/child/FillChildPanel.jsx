"use client";

import OverrideField from "@/canvas/inspector/override/OverrideField";
import TokenValuePicker from "@/canvas/inspector/controls/TokenValuePicker";

export default function FillChildPanel() {
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 space-y-3">
      <OverrideField label="Fill" prop="fills[0].color">
        {({ value, onChange, disabled }) => (
          <TokenValuePicker value={value || "#ffffff"} onChange={onChange} disabled={disabled} />
        )}
      </OverrideField>

      <OverrideField label="Opacity" prop="opacity">
        {({ value, onChange, disabled }) => (
          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            disabled={disabled}
            className="w-full p-2 bg-neutral-800/80 rounded"
            value={value ?? 1}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        )}
      </OverrideField>
    </div>
  );
}
