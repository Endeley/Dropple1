"use client";

import { springValue } from "@/canvas/core/physics/springValue";
import { interpolateColor } from "@/utils/color/interpolateColor";

const DEFAULT_STATE = () => ({
  velocityX: 0,
  velocityY: 0,
  velocityScale: 0,
  velocityOpacity: 0,
  velocityWeight: 0,
});

const stateMap = new Map();

function getState(key) {
  if (!stateMap.has(key)) {
    stateMap.set(key, DEFAULT_STATE());
  }
  return stateMap.get(key);
}

export function resetCharacterPhysics() {
  stateMap.clear();
}

export function interpolateCharacterPhysics({
  key,
  prev = {},
  next = {},
  stiffnessMultiplier = 1,
}) {
  const state = getState(key);

  const xSpring = springValue({
    from: prev.x ?? next.x ?? 0,
    to: next.x ?? prev.x ?? 0,
    velocity: state.velocityX,
    stiffness: 260 * stiffnessMultiplier,
    damping: 18,
  });

  const ySpring = springValue({
    from: prev.y ?? next.y ?? 0,
    to: next.y ?? prev.y ?? 0,
    velocity: state.velocityY,
    stiffness: 260 * stiffnessMultiplier,
    damping: 18,
  });

  const scaleSpring = springValue({
    from: prev.scale ?? 1,
    to: next.scale ?? 1,
    velocity: state.velocityScale,
    stiffness: 380 * stiffnessMultiplier,
    damping: 20,
  });

  const opacitySpring = springValue({
    from: prev.opacity ?? 1,
    to: next.opacity ?? 1,
    velocity: state.velocityOpacity,
    stiffness: 240 * stiffnessMultiplier,
    damping: 20,
  });

  const weightSpring = springValue({
    from: prev.fontWeight ?? 400,
    to: next.fontWeight ?? 400,
    velocity: state.velocityWeight,
    stiffness: 420 * stiffnessMultiplier,
    damping: 22,
  });

  state.velocityX = xSpring.velocity;
  state.velocityY = ySpring.velocity;
  state.velocityScale = scaleSpring.velocity;
  state.velocityOpacity = opacitySpring.velocity;
  state.velocityWeight = weightSpring.velocity;

  return {
    char: next.char ?? prev.char ?? "",
    x: xSpring.value,
    y: ySpring.value,
    width: next.width ?? prev.width ?? 0,
    height: next.height ?? prev.height ?? 0,
    baseline: next.baseline ?? prev.baseline ?? 0,
    scale: scaleSpring.value,
    opacity: opacitySpring.value,
    fontWeight: weightSpring.value,
    color: interpolateColor(prev.color || next.color, next.color || prev.color, 0.5),
  };
}
