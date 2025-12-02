"use client";

import { interpolateColor } from "@/utils/color/interpolateColor";
import {
  interpolateCharacterPhysics,
} from "@/canvas/core/history/interpolateCharacterPhysics";

const ENABLE_CHARACTER_PHYSICS = true;

export function interpolateCharacters(slotId, aChars = [], bChars = [], t = 0) {
  const max = Math.max(aChars.length, bChars.length);
  const result = [];

  for (let i = 0; i < max; i += 1) {
    const a = aChars[i];
    const b = bChars[i];
    const key = `${slotId}-${i}-${b?.char || a?.char || ""}`;

    if (!a && b) {
      if (ENABLE_CHARACTER_PHYSICS) {
        const ghost = interpolateCharacterPhysics({
          key,
          prev: {
            ...b,
            opacity: 0,
            scale: 0.6,
            y: (b.y ?? 0) + 10,
          },
          next: b,
        });
        result.push(ghost);
      } else {
        result.push({
          ...b,
          opacity: (b.opacity ?? 1) * t,
          scale: (b.scale ?? 1) * t,
        });
      }
      continue;
    }

    if (!b && a) {
      if (ENABLE_CHARACTER_PHYSICS) {
        const ghost = interpolateCharacterPhysics({
          key,
          prev: a,
          next: {
            ...a,
            opacity: 0,
            scale: 0.6,
            y: (a.y ?? 0) - 8,
          },
        });
        result.push(ghost);
      } else {
        result.push({
          ...a,
          opacity: (a.opacity ?? 1) * (1 - t),
          scale: (a.scale ?? 1) * (1 - t),
        });
      }
      continue;
    }

    if (!a || !b) continue;

    if (ENABLE_CHARACTER_PHYSICS) {
      const physicsResult = interpolateCharacterPhysics({
        key,
        prev: a,
        next: b,
      });
      result.push(physicsResult);
      continue;
    }

    result.push({
      char: b.char,
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      width: lerp(a.width, b.width, t),
      height: lerp(a.height, b.height, t),
      baseline: lerp(a.baseline, b.baseline, t),
      fontWeight: lerp(a.fontWeight ?? 400, b.fontWeight ?? 400, t),
      opacity: lerp(a.opacity ?? 1, b.opacity ?? 1, t),
      scale: lerp(a.scale ?? 1, b.scale ?? 1, t),
      color: interpolateColor(a.color || null, b.color || null, t) || b.color || a.color,
      index: b.index ?? i,
    });
  }

  return result;
}

function lerp(start = 0, end = 0, t = 0) {
  return start + (end - start) * t;
}
