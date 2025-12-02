"use client";

import Section from "@/components/inspector/Section";
import Input from "@/components/inspector/Input";
import Toggle from "@/components/inspector/Toggle";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";
import { useLayersStore } from "@/stores/useLayersStore";

export default function DevInspector() {
  const devSelectedLayer = useAIStudioStore((s) => s.devSelectedLayer);
  const layers = useLayersStore((s) => s.layers);
  const layer = layers.find((l) => l.id === devSelectedLayer);

  if (!layer) {
    return <p className="text-white/40">Select a layer to inspect.</p>;
  }

  return (
    <div className="space-y-4 text-sm">
      <Section title="Layer Properties">
        <Input label="Layer ID" value={layer.id} onChange={() => {}} />
        <Input label="Type" value={layer.type} onChange={() => {}} />
      </Section>

      <Section title="Semantic Mapping">
        <Input label="HTML Tag" value="div" onChange={() => {}} />
        <Input label="Role" value="presentation" onChange={() => {}} />
      </Section>

      <Section title="Code Options">
        <Toggle label="Export as Component" checked={true} onChange={() => {}} />
        <Toggle label="Merge with Parent" checked={false} onChange={() => {}} />
      </Section>

      <Section title="Debug JSON">
        <pre className="text-xs text-white/70 whitespace-pre-wrap bg-white/5 p-3 rounded-lg border border-white/10">
          {JSON.stringify(layer, null, 2)}
        </pre>
      </Section>
    </div>
  );
}
