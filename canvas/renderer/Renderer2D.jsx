"use client";

import { useEffect, useRef } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import { drawText } from "./draw/drawText";
import { drawImageSlot } from "./draw/drawImage";
import { drawSurface } from "./draw/drawSurface";
import { drawColorSlot } from "./draw/drawColor";

export default function Renderer2D() {
  const canvasRef = useRef(null);
  const templateInstances = useTemplateStore((s) => s.templateInstances) || [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (width === 0 || height === 0) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = width;
      canvas.height = height;
      ctx.scale(dpr, dpr);
      renderScene(ctx, templateInstances);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [templateInstances]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderScene(ctx, templateInstances);
  }, [templateInstances]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

function renderScene(ctx, templateInstances) {
  const canvas = ctx.canvas;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  templateInstances.forEach((instance) => {
    drawTemplateInstance(ctx, instance);
  });
}

function drawTemplateInstance(ctx, instance) {
  const { transform, slots } = instance;
  if (!transform || !Array.isArray(slots)) return;

  ctx.save();
  ctx.translate(transform.x || 0, transform.y || 0);
  const scale = typeof transform.scale === "number" ? transform.scale : 1;
  ctx.scale(scale, scale);
  const rotation = (transform.rotation || 0) * (Math.PI / 180);
  if (rotation) ctx.rotate(rotation);

  slots.forEach((slot) => drawSlot(ctx, slot));

  ctx.restore();
}

function drawSlot(ctx, slot) {
  if (!slot) return;
  switch (slot.type) {
    case "text.heading":
    case "text.body":
      drawText(ctx, slot);
      break;
    case "image":
    case "logo":
      drawImageSlot(ctx, slot);
      break;
    case "surface":
      drawSurface(ctx, slot);
      break;
    case "color.background":
    case "color.primary":
      drawColorSlot(ctx, slot);
      break;
    default:
      break;
  }
}
