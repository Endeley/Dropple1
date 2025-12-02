"use client";

import { useOverride } from "./OverrideContext";

export default function OverrideField({ prop, label, children, disabled }) {
  const ctx = useOverride();
  if (!ctx) return null;

  const overridden = ctx.isOverridden(prop);
  const masterValue = ctx.getMasterValue(prop);
  const overrideValue = ctx.getOverrideValue(prop);
  const value = overrideValue ?? masterValue;
  const locked =
    disabled || ctx.masterLayers?.[ctx.masterLayerId]?.locks?.[prop];

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span>
          {label}
          {overridden && <span className="ml-1 text-violet-400">⚡</span>}
        </span>
        {overridden && (
          <button
            className="text-violet-400 hover:text-violet-300"
            onClick={() => ctx.resetOverride(prop)}
          >
            Reset
          </button>
        )}
      </div>

      {children({
        value,
        disabled: Boolean(locked),
        overridden,
        onChange: (val) => ctx.setOverride(prop, val),
      })}
    </div>
  );
}
