'use client';

export function SpacingSection({ textObject, selectedWords = [] }) {
  const props = textObject?.props || {};

  const updateStyle = (style) => {
    if (!textObject) return;
    if (typeof textObject.updateStyle === "function") {
      textObject.updateStyle(style, selectedWords);
    } else if (textObject.props) {
      Object.assign(textObject.props, style);
      if (typeof textObject.markDirty === "function") textObject.markDirty("layout");
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Spacing</h3>

      <label className="text-xs text-gray-500">Line Height</label>
      <input
        type="number"
        step="0.1"
        className="w-full border rounded p-1 mb-3"
        value={props.lineHeight ?? 1.2}
        onChange={(e) => updateStyle({ lineHeight: Number(e.target.value) })}
      />

      <label className="text-xs text-gray-500">Letter Spacing</label>
      <input
        type="number"
        step="0.1"
        className="w-full border rounded p-1 mb-3"
        value={props.letterSpacing ?? 0}
        onChange={(e) => updateStyle({ letterSpacing: Number(e.target.value) })}
      />
    </div>
  );
}
