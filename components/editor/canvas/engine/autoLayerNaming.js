import { autoNameLayer } from "@/lib/design/layerNaming/autoNameLayer";

const EVENTS = ["object:added", "object:modified"];

export const attachAutoLayerNaming = (canvas) => {
  if (!canvas) return () => {};

  const handler = (e) => {
    const obj = e?.target || e?.object;
    if (!obj) return;
    autoNameLayer(canvas, obj);
  };

  EVENTS.forEach((evt) => canvas.on(evt, handler));

  return () => {
    EVENTS.forEach((evt) => canvas.off(evt, handler));
  };
};
