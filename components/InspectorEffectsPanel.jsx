"use client";

import { useEffect, useState } from "react";
import { useEffectsStore } from "@/stores/useEffectsStore";
import { EFFECT_TYPES } from "@/engines/effects/effectTypes";
import { applyEffects } from "@/engines/effects/applyEffects";

export default function InspectorEffectsPanel({ canvas }) {
  const [refresh, setRefresh] = useState(0);
  const [selectedObject, setSelectedObject] = useState(
    canvas?.getActiveObject() ?? null
  );
  const effectsStore = useEffectsStore();

  useEffect(() => {
    if (!canvas) return;
    const update = () => setSelectedObject(canvas.getActiveObject());
    canvas.on("selection:created", update);
    canvas.on("selection:updated", update);
    canvas.on("selection:cleared", () => setSelectedObject(null));
    return () => {
      canvas.off("selection:created", update);
      canvas.off("selection:updated", update);
      canvas.off("selection:cleared");
    };
  }, [canvas]);

  if (!selectedObject) {
    return (
      <div className="text-sm text-zinc-400">Select an object to add effects.</div>
    );
  }

  const objectId = selectedObject.__objectId;
  const effects = effectsStore.effects[objectId] || [];

  const addEffect = (type) => {
    const effect = {
      id: crypto.randomUUID(),
      type,
      ...defaultParams(type),
    };

    effectsStore.addEffect(objectId, effect);
    applyEffects(canvas, objectId);
    setRefresh((n) => n + 1);
  };

  const removeEffect = (id) => {
    effectsStore.removeEffect(objectId, id);
    applyEffects(canvas, objectId);
    setRefresh((n) => n + 1);
  };

  return (
    <div className="p-3 bg-zinc-900 text-white rounded-lg space-y-4">
      <h3 className="text-lg font-bold">Effects</h3>

      <div className="space-y-2">
        <button
          onClick={() => addEffect(EFFECT_TYPES.SHADOW)}
          className="w-full bg-zinc-700 p-2 rounded"
        >
          Add Drop Shadow
        </button>

        <button
          onClick={() => addEffect(EFFECT_TYPES.BLUR)}
          className="w-full bg-zinc-700 p-2 rounded"
        >
          Add Blur
        </button>

        <button
          onClick={() => addEffect(EFFECT_TYPES.OUTER_GLOW)}
          className="w-full bg-zinc-700 p-2 rounded"
        >
          Add Outer Glow
        </button>

        <button
          onClick={() => addEffect(EFFECT_TYPES.BLEND_MODE)}
          className="w-full bg-zinc-700 p-2 rounded"
        >
          Add Blend Mode
        </button>
      </div>

      <div className="space-y-3 mt-4">
        {effects.map((e) => (
          <div
            key={e.id}
            className="p-3 bg-zinc-800 rounded flex justify-between"
          >
            <span>{e.type}</span>
            <button
              className="text-red-400"
              onClick={() => removeEffect(e.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const defaultParams = (type) => {
  switch (type) {
    case EFFECT_TYPES.SHADOW:
      return { blur: 10, x: 5, y: 5, color: "rgba(0,0,0,0.4)" };
    case EFFECT_TYPES.BLUR:
      return { amount: 0.2 };
    case EFFECT_TYPES.OUTER_GLOW:
      return { blur: 20, color: "rgba(255,255,255,0.8)" };
    case EFFECT_TYPES.BLEND_MODE:
      return { mode: "multiply" };
    default:
      return {};
  }
};
