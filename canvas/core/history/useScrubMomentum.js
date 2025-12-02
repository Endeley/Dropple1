"use client";

import { useEffect, useRef } from "react";

export function useScrubMomentum({
  getValue,
  setValue,
  min = 0,
  max = 1,
  friction = 0.92,
  minVelocity = 0.0005,
  onRest,
}) {
  const velocityRef = useRef(0);
  const lastSampleTimeRef = useRef(0);
  const lastValueRef = useRef(0);
  const animFrameRef = useRef(null);
  const momentumTimeRef = useRef(0);

  const stopAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  useEffect(() => stopAnimation, []);

  const clampValue = (value) => Math.min(max, Math.max(min, value));

  const recordValue = (value) => {
    const now = performance.now();
    if (lastSampleTimeRef.current) {
      const dt = now - lastSampleTimeRef.current;
      if (dt > 0) {
        velocityRef.current = (value - lastValueRef.current) / dt;
      }
    }
    lastValueRef.current = value;
    lastSampleTimeRef.current = now;
  };

  const onScrubStart = () => {
    stopAnimation();
    velocityRef.current = 0;
    lastValueRef.current = getValue();
    lastSampleTimeRef.current = performance.now();
  };

  const finishMomentum = () => {
    stopAnimation();
    velocityRef.current = 0;
    onRest?.();
  };

  const onScrubEnd = () => {
    momentumTimeRef.current = performance.now();

    const step = () => {
      const now = performance.now();
      const dt = now - momentumTimeRef.current;
      momentumTimeRef.current = now;

      velocityRef.current *= friction;

      if (Math.abs(velocityRef.current) < minVelocity) {
        finishMomentum();
        return;
      }

      const delta = velocityRef.current * dt;
      const current = getValue();
      let next = clampValue(current + delta);

      setValue(next);

      if (next === min || next === max) {
        finishMomentum();
        return;
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  return {
    onScrubStart,
    onScrubEnd,
    recordValue,
  };
}
