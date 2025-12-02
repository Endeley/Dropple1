"use client";

import { interpolateColor } from "@/utils/color/interpolateColor";
import { interpolateGradient } from "./interpolateGradient";

const lerp = (start = 0, end = 0, t = 0) => start + (end - start) * t;

export function interpolateStyles(a = {}, b = {}, t = 0) {
  if (!a && !b) return {};

  const next = { ...b };

  next.opacity = lerp(a?.opacity ?? 1, b?.opacity ?? 1, t);
  const gradient = interpolateGradient(a?.gradient, b?.gradient, t);
  next.gradient = gradient;
  next.fill =
    gradient === null
      ? interpolateColor(a?.fill, b?.fill, t) || b?.fill || a?.fill || null
      : undefined;
  next.stroke = interpolateColor(a?.stroke, b?.stroke, t) || b?.stroke || a?.stroke || null;
  next.strokeWidth = lerp(a?.strokeWidth ?? 0, b?.strokeWidth ?? 0, t);
  next.borderRadius = lerp(
    a?.borderRadius ?? a?.radius ?? 0,
    b?.borderRadius ?? b?.radius ?? 0,
    t
  );
  next.radius = next.borderRadius;

  // Text styling
  next.fontSize = lerp(a?.fontSize ?? a?.textSize ?? 16, b?.fontSize ?? b?.textSize ?? 16, t);
  next.lineHeight = lerp(a?.lineHeight ?? 1.3, b?.lineHeight ?? 1.3, t);
  next.letterSpacing = lerp(a?.letterSpacing ?? 0, b?.letterSpacing ?? 0, t);
  next.fontWeight = Math.round(lerp(a?.fontWeight ?? 400, b?.fontWeight ?? 400, t));
  next.color =
    interpolateColor(a?.color || a?.textColor, b?.color || b?.textColor, t) ||
    b?.color ||
    b?.textColor ||
    a?.color ||
    a?.textColor ||
    null;
  next.textColor = next.color;

  const shadow = interpolateShadow(a?.shadow, b?.shadow, t);
  if (shadow) {
    next.shadow = shadow;
  }

  return next;
}

function interpolateShadow(a, b, t) {
  if (!a && !b) return null;
  if (!a) return b;
  if (!b) return a;

  return {
    offsetX: lerp(a.offsetX ?? 0, b.offsetX ?? 0, t),
    offsetY: lerp(a.offsetY ?? 0, b.offsetY ?? 0, t),
    blur: lerp(a.blur ?? 0, b.blur ?? 0, t),
    color: interpolateColor(a.color, b.color, t) || b.color || a.color || null,
  };
}
