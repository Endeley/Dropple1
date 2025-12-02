'use client';

import { presets } from "@/engine/text/animation/presets";

export function AnimationSection({ textObject, selectedWords = [] }) {
  const anim = textObject?.animations;

  const apply = (presetFn) => {
    if (!anim || typeof anim.addPreset !== "function") return;
    const words = selectedWords.length ? selectedWords : textObject?.lines?.flatMap((l) => l.words) || [];
    const frames = presetFn(0, 500, 40); // start, duration, optional distance
    anim.addPreset(words, frames);
    if (typeof textObject?.markDirty === "function") textObject.markDirty("animation");
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Animation</h3>
      <div className="flex flex-col gap-2">
        <button onClick={() => apply(presets.fadeIn)} className="border rounded p-2 text-sm">
          Fade In
        </button>
        <button onClick={() => apply(presets.slideUp)} className="border rounded p-2 text-sm">
          Slide Up
        </button>
        <button onClick={() => apply(presets.popIn)} className="border rounded p-2 text-sm">
          Pop
        </button>
      </div>
    </div>
  );
}
