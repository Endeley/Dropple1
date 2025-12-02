"use client";

import { useLayersStore } from "@/stores/useLayersStore";
import Section from "@/components/inspector/Section";
import NumberInput from "@/components/inspector/NumberInput";
import Input from "@/components/inspector/Input";
import ColorPicker from "@/components/inspector/ColorPicker";
import Select from "@/components/inspector/Select";

export default function DesignInspector() {
  const { layers, activeLayerId, updateLayer } = useLayersStore();
  const layer = layers.find((l) => l.id === activeLayerId) || layers[0];

  if (!layer) {
    return <p className="text-white/40 text-sm">Select a layer to edit.</p>;
  }

  const update = (props) => updateLayer(layer.id, props);

  return (
    <div className="space-y-4">
      <Section title="Layout">
        <div className="grid grid-cols-2 gap-2">
          <NumberInput label="X" value={layer.x || 0} onChange={(v) => update({ x: v })} />
          <NumberInput label="Y" value={layer.y || 0} onChange={(v) => update({ y: v })} />
          <NumberInput label="Width" value={layer.width || 0} onChange={(v) => update({ width: v })} />
          <NumberInput label="Height" value={layer.height || 0} onChange={(v) => update({ height: v })} />
          <NumberInput label="Rotation" value={layer.rotation || 0} onChange={(v) => update({ rotation: v })} />
        </div>
      </Section>

      <Section title="Appearance">
        <ColorPicker label="Fill" value={layer.fill || "#ffffff"} onChange={(v) => update({ fill: v })} />
        <NumberInput label="Opacity" value={layer.opacity ?? 1} step={0.05} onChange={(v) => update({ opacity: v })} />
      </Section>

      {layer.type === "text" && (
        <Section title="Typography">
          <Input label="Font Family" value={layer.fontFamily || "Manrope"} onChange={(v) => update({ fontFamily: v })} />
          <NumberInput label="Font Size" value={layer.fontSize || 16} onChange={(v) => update({ fontSize: v })} />
          <Select
            label="Font Weight"
            value={String(layer.fontWeight || 400)}
            onChange={(v) => update({ fontWeight: Number(v) })}
            options={["200", "300", "400", "500", "600", "700", "800"]}
          />
          <Select
            label="Alignment"
            value={layer.textAlign || "left"}
            onChange={(v) => update({ textAlign: v })}
            options={["left", "center", "right"]}
          />
        </Section>
      )}
    </div>
  );
}
