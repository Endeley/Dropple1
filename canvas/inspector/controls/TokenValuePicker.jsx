"use client";

import { useEffect, useMemo, useState } from "react";
import { useTokenStore } from "@/foundation/tokens/tokenStore";

export default function TokenValuePicker({ value, onChange, disabled }) {
  const tokens = useTokenStore((state) => state.tokens);
  const normalizedValue = value ?? "#000000";
  const isToken = typeof normalizedValue === "string" && normalizedValue.startsWith("$");
  const [mode, setMode] = useState(isToken ? "token" : "value");

  useEffect(() => {
    setMode(isToken ? "token" : "value");
  }, [isToken, normalizedValue]);

  const tokenOptions = useMemo(() => Object.values(tokens || {}), [tokens]);
  const colorValue =
    typeof normalizedValue === "string" && normalizedValue.startsWith("#")
      ? normalizedValue
      : "#000000";

  if (disabled) {
    return (
      <input
        type="color"
        disabled
        className="w-full h-8 rounded bg-neutral-900/40 opacity-50 cursor-not-allowed"
        value={colorValue}
        readOnly
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          className={`px-2 py-1 rounded text-xs ${
            mode === "value" ? "bg-violet-600 text-white" : "bg-neutral-800 text-neutral-300"
          }`}
          onClick={() => {
            setMode("value");
            if (isToken) {
              onChange("#000000");
            }
          }}
        >
          Value
        </button>
        <button
          type="button"
          className={`px-2 py-1 rounded text-xs ${
            mode === "token" ? "bg-violet-600 text-white" : "bg-neutral-800 text-neutral-300"
          }`}
          onClick={() => {
            setMode("token");
            if (!isToken) {
              const firstToken = tokenOptions[0]?.id;
              onChange(firstToken ? `$${firstToken}` : "$primary.brand");
            }
          }}
        >
          Token
        </button>
      </div>

      {mode === "token" ? (
        <select
          className="bg-neutral-900/80 p-2 rounded w-full text-sm"
          value={isToken ? normalizedValue : ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select token…</option>
          {tokenOptions.map((token) => (
            <option key={token.id} value={`$${token.id}`}>
              {token.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="color"
          className="w-full h-8 rounded bg-neutral-800/80"
          value={colorValue}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
