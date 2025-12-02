'use client';

export function ColorSection({ textObject, selectedWords = [] }) {
  const props = textObject?.props || {};

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
      <h3 className="text-sm font-semibold">Color</h3>
      <input
        type="color"
        className="w-full h-8 mb-3"
        value={props.color || "#111111"}
        onChange={(e) => updateStyle({ color: e.target.value })}
      />
    </div>
  );
}
