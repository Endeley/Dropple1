'use client';

import { useMemo } from "react";

export function TypographySection({ textObject, selectedWords = [] }) {
  const props = useMemo(() => textObject?.props || {}, [textObject]);

  const updateStyle = (style) => {
    if (!textObject) return;
    if (typeof textObject.updateStyle === "function") {
      textObject.updateStyle(style, selectedWords);
    } else if (textObject.props) {
      Object.assign(textObject.props, style);
      if (typeof textObject.markDirty === "function") textObject.markDirty("style");
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Typography</h3>

      <label className="text-xs text-gray-500">Font</label>
      <select
        onChange={(e) => updateStyle({ fontFamily: e.target.value })}
        className="w-full mt-1 mb-3 border rounded p-1"
        value={props.fontFamily || "Inter"}
      >
        <option>Inter</option>
        <option>Roboto</option>
        <option>Montserrat</option>
        <option>Poppins</option>
      </select>

      <label className="text-xs text-gray-500">Font Size</label>
      <input
        type="number"
        className="w-full border rounded p-1 mt-1 mb-3"
        value={props.fontSize || 16}
        onChange={(e) => updateStyle({ fontSize: Number(e.target.value) || 0 })}
      />

      <label className="text-xs text-gray-500">Weight</label>
      <select
        className="w-full mt-1 mb-3 border rounded p-1"
        value={props.weight || 400}
        onChange={(e) => updateStyle({ weight: Number(e.target.value) })}
      >
        <option value="300">Light</option>
        <option value="400">Regular</option>
        <option value="600">Semi Bold</option>
        <option value="700">Bold</option>
      </select>
    </div>
  );
}
