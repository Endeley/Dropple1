"use client";

export default function SnapGuides({ guides = [], scale = 1 }) {
  if (!guides.length) return null;

  return guides.map((guide, index) => {
    const style = {
      position: "absolute",
      background: "rgba(139, 92, 246, 1)",
      pointerEvents: "none",
      zIndex: 999,
    };

    if (guide.x1 === guide.x2) {
      style.left = guide.x1 * scale;
      style.top = guide.y1 * scale;
      style.width = 1;
      style.height = (guide.y2 - guide.y1) * scale;
    } else if (guide.y1 === guide.y2) {
      style.top = guide.y1 * scale;
      style.left = guide.x1 * scale;
      style.height = 1;
      style.width = (guide.x2 - guide.x1) * scale;
    }

    return <div key={index} style={style} />;
  });
}
