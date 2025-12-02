"use client";

import MotionTrailFrame from "./MotionTrailFrame";
import { interpolateCanvasState } from "@/canvas/core/history/interpolateCanvasState";

export default function MotionTrails({
  prevState,
  nextState,
  progress,
  isPreviewing,
  trailCount = 6,
  step = 0.05,
}) {
  if (!isPreviewing || !prevState || !nextState || progress === null || progress === undefined) {
    return null;
  }

  const ghosts = [];

  for (let i = 1; i <= trailCount; i += 1) {
    const ghostT = progress - i * step;
    if (ghostT <= 0) continue;
    const ghostState = interpolateCanvasState(prevState, nextState, Math.max(0, ghostT));
    if (!ghostState) continue;

    ghosts.push(
      <MotionTrailFrame
        key={`trail-${i}`}
        state={ghostState}
        opacity={0.22 / i}
        blur={i * 1.2}
        scale={1 - i * 0.005}
      />
    );
  }

  if (!ghosts.length) return null;

  return <div className="absolute inset-0 pointer-events-none z-[3050]">{ghosts}</div>;
}
