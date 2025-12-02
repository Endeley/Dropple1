"use client";

export function getSlotText(slot) {
  const content = slot?.content || {};
  return content.text || content.label || "";
}

export function getSlotVisualStyles(slot, { isActive = false } = {}) {
  const content = slot?.content || {};
  const fill = content.fill || content.background || "transparent";
  const stroke = content.stroke || null;
  const strokeWidth = content.strokeWidth ?? (stroke ? 2 : 0);
  const borderRadius = content.borderRadius ?? content.radius ?? 0;
  const fallbackBorder = isActive
    ? "1px solid rgba(99,102,241,0.65)"
    : "1px solid rgba(99,102,241,0.2)";
  const gradientBackground = gradientToCSS(content.gradient);

  const shadow = content.shadow
    ? `${content.shadow.offsetX ?? 0}px ${content.shadow.offsetY ?? 0}px ${
        content.shadow.blur ?? 0
      }px ${content.shadow.color || "rgba(0,0,0,0.25)"}`
    : "none";
  const backgroundImage = gradientBackground
    ? gradientBackground
    : content.src
    ? `url(${content.src})`
    : undefined;

  return {
    container: {
      position: "absolute",
      inset: 0,
      borderRadius,
      pointerEvents: "none",
      backgroundColor: backgroundImage ? undefined : fill,
      backgroundImage,
      backgroundSize: content.objectFit === "contain" ? "contain" : "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: content.opacity ?? 1,
      border: stroke ? `${strokeWidth}px solid ${stroke}` : fallbackBorder,
      boxShadow: shadow,
      overflow: "hidden",
    },
    text: {
      pointerEvents: "none",
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: alignToItems(content.verticalAlign),
      justifyContent: alignToJustify(content.align),
      textAlign: content.align || "left",
      color: content.color || content.textColor || "#111827",
      fontSize: content.fontSize ?? content.textSize ?? 16,
      fontFamily: content.fontFamily || "Inter, sans-serif",
      fontWeight: content.fontWeight ?? 500,
      lineHeight: content.lineHeight ?? 1.2,
      letterSpacing: content.letterSpacing ?? 0,
      padding: content.padding ?? 12,
      whiteSpace: "pre-line",
      textTransform: content.uppercase ? "uppercase" : "none",
    },
  };
}

function alignToJustify(align = "left") {
  if (align === "center") return "center";
  if (align === "right") return "flex-end";
  return "flex-start";
}

function alignToItems(verticalAlign = "center") {
  if (verticalAlign === "top") return "flex-start";
  if (verticalAlign === "bottom") return "flex-end";
  return "center";
}

function gradientToCSS(gradient) {
  if (!gradient || !(gradient.stops || []).length) return null;
  const stops = (gradient.stops || [])
    .map((stop) => {
      const pct = Math.round(Math.max(0, Math.min(1, stop.position ?? 0)) * 100);
      return `${stop.color} ${pct}%`;
    })
    .join(", ");

  if (gradient.type === "radial") {
    const cx = Math.round((gradient.cx ?? 0.5) * 100);
    const cy = Math.round((gradient.cy ?? 0.5) * 100);
    return `radial-gradient(circle at ${cx}% ${cy}%, ${stops})`;
  }

  const angle = gradient.angle ?? 0;
  return `linear-gradient(${angle}deg, ${stops})`;
}
