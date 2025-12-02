"use client";

import { interpolateFrame } from "./interpolateFrame";
import { easeInOutQuad } from "@/utils/easings";
import { interpolateStyles } from "./interpolateStyles";
import { interpolateCharacters } from "./interpolateCharacters";
import { interpolateEnterExit } from "./interpolateEnterExit";

export function interpolateSnapshots(prev, next, t = 0) {
  if (!prev || !next) return prev || next;
  const tt = easeInOutQuad(Math.max(0, Math.min(1, t)));

  const prevMap = Object.fromEntries((prev.slots || []).map((slot) => [slot.id, slot]));
  const nextMap = Object.fromEntries((next.slots || []).map((slot) => [slot.id, slot]));

  const interpolatedSlots = [];
  const allIds = new Set([
    ...Object.keys(prevMap),
    ...Object.keys(nextMap),
  ]);

  allIds.forEach((id) => {
    const before = prevMap[id];
    const after = nextMap[id];
    const enterExit = interpolateEnterExit(before, after, tt);
    if (enterExit) {
      interpolatedSlots.push(enterExit);
      return;
    }
    if (!before || !after) return;

    const content = interpolateStyles(before.content, after.content, tt);
    const characters = interpolateCharacters(
      id,
      before.content?._layout?.characters || [],
      after.content?._layout?.characters || [],
      tt
    );
    if (characters.length) {
      content._layout = { characters };
    }

    interpolatedSlots.push({
      ...after,
      frame: interpolateFrame(before.frame, after.frame, tt),
      content,
    });
  });

  return {
    ...next,
    slots: interpolatedSlots,
  };
}
