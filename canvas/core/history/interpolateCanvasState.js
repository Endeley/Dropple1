"use client";

import { interpolateSnapshots } from "./interpolateSnapshots";

export function interpolateCanvasState(prevState, nextState, t = 0) {
  if (!prevState || !nextState) return prevState || nextState || null;
  return interpolateSnapshots(prevState, nextState, t);
}
