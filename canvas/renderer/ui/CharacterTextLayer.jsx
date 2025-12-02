"use client";

export default function CharacterTextLayer({
  characters = [],
  content,
  opacityMultiplier = 1,
  blur = 0,
}) {
  if (!characters?.length) return null;
  const fontFamily = content?.fontFamily || "Inter, sans-serif";
  const baseSize = content?.fontSize ?? content?.textSize ?? 16;

  return (
    <>
      {characters.map((char, index) => {
        if (char.char === "\n") {
          return null;
        }
        const top = (char.y ?? 0) - (char.height ?? baseSize);
        const left = char.x ?? 0;
        const scale = char.scale ?? 1;
        const opacity = (char.opacity ?? 1) * opacityMultiplier;
        const fontSize = char.height ?? baseSize;
        const fontWeight = char.fontWeight ?? content?.fontWeight ?? 400;
        const color = char.color || content?.color || content?.textColor || "#111827";
        return (
          <span
            key={`${char.char}-${index}-${char.x}-${char.y}`}
            className="absolute"
            style={{
              left,
              top,
              transformOrigin: "left top",
              transform: `scale(${scale})`,
              opacity,
              fontFamily,
              fontSize,
              fontWeight,
              lineHeight: 1,
              color,
              whiteSpace: "pre",
              pointerEvents: "none",
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
          >
            {char.char === " " ? "\u00A0" : char.char}
          </span>
        );
      })}
    </>
  );
}
