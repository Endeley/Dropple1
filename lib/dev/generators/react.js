export default function generateReact({ layers }) {
  const mapLayer = (layer, index) => {
    if (layer.type === "text") {
      return `      <p key="layer-${index}" style={{ fontSize: ${layer.fontSize || 16}, fontWeight: ${
        layer.fontWeight || 400
      }, color: "${layer.fill || "#111"}" }}>
        {` + "`" + (layer.text || "Lorem ipsum") + "`" + `}
      </p>`;
    }
    if (layer.type === "rect") {
      return `      <div key="layer-${index}" style={{ width: ${layer.width || 100}, height: ${
        layer.height || 100
      }, background: "${layer.fill || "#e5e7eb"}", borderRadius: ${layer.radius || 0} }} />`;
    }
    return "";
  };

  const children = layers.map(mapLayer).join("\n");

  return `import React from "react";

export default function DroppleComponent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
${children}
    </div>
  );
}`;
}
