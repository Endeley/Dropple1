"use client";

import { interpolateColor } from "@/utils/color/interpolateColor";

export function interpolateGradient(a, b, t = 0) {
  if (!a && !b) return null;
  if (!a) return b;
  if (!b) return a;

  if (a.type !== b.type) {
    return b;
  }

  return {
    type: a.type,
    angle: lerp(a.angle ?? 0, b.angle ?? 0, t),
    x1: lerp(a.x1 ?? 0, b.x1 ?? 0, t),
    y1: lerp(a.y1 ?? 0, b.y1 ?? 0, t),
    x2: lerp(a.x2 ?? 1, b.x2 ?? 1, t),
    y2: lerp(a.y2 ?? 0, b.y2 ?? 0, t),
    cx: lerp(a.cx ?? 0.5, b.cx ?? 0.5, t),
    cy: lerp(a.cy ?? 0.5, b.cy ?? 0.5, t),
    r: lerp(a.r ?? 0.5, b.r ?? 0.5, t),
    stops: interpolateStops(a.stops || [], b.stops || [], t),
  };
}

function interpolateStops(stopsA = [], stopsB = [], t) {
  const max = Math.max(stopsA.length, stopsB.length);
  const result = [];

  for (let i = 0; i < max; i += 1) {
    const a = stopsA[i] || stopsB[i];
    const b = stopsB[i] || stopsA[i];
    if (!a || !b) continue;

    result.push({
      position: lerp(a.position ?? 0, b.position ?? 0, t),
      color: interpolateColor(a.color, b.color, t),
    });
  }

  return result;
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}
