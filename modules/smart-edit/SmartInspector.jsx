"use client";

import Section from "@/components/inspector/Section";
import Slider from "@/components/inspector/Slider";
import NumberInput from "@/components/inspector/NumberInput";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function SmartInspector() {
  const {
    brushSize,
    setBrushSize,
    maskSoftness,
    setMaskSoftness,
    maskBrushSize,
    setMaskBrushSize,
    editMode,
    setEditMode,
  } = useAIStudioStore();

  return (
    <div className="space-y-4">
      <Section title="Tools">
        <select
          value={editMode}
          onChange={(e) => setEditMode(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white"
        >
          <option value="remove">Remove</option>
          <option value="replace">Replace</option>
          <option value="fill">Fill</option>
        </select>
      </Section>

      <Section title="Brush">
        <NumberInput label="Brush Size" value={brushSize} min={1} max={400} onChange={setBrushSize} />
        <Slider label="Mask Size" value={maskBrushSize} min={5} max={200} onChange={setMaskBrushSize} />
        <Slider label="Feather" value={maskSoftness} min={0} max={1} step={0.01} onChange={setMaskSoftness} />
      </Section>
    </div>
  );
}
