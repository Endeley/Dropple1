"use client";

import Section from "@/components/inspector/Section";
import NumberInput from "@/components/inspector/NumberInput";
import Slider from "@/components/inspector/Slider";
import Toggle from "@/components/inspector/Toggle";
import ColorPicker from "@/components/inspector/ColorPicker";

export default function SmartEditInspector() {
  return (
    <div className="space-y-4">
      <Section title="Brush">
        <NumberInput label="Brush Size" value={20} onChange={() => {}} />
        <NumberInput label="Hardness" value={80} onChange={() => {}} />
        <Slider label="Feather" value={0.2} onChange={() => {}} />
      </Section>

      <Section title="Mask Tools">
        <Toggle label="Show Mask Outline" checked={true} onChange={() => {}} />
        <Toggle label="Show Original Underlay" checked={false} onChange={() => {}} />
      </Section>

      <Section title="Background Replace">
        <ColorPicker label="Solid Color" value="#000000" onChange={() => {}} />
        <Toggle label="Auto Shadow" checked={true} onChange={() => {}} />
        <Toggle label="Auto Edge Smooth" checked={true} onChange={() => {}} />
      </Section>

      <Section title="Enhancements">
        <Slider label="Sharpness" value={0} onChange={() => {}} />
        <Slider label="Noise Reduction" value={0.5} onChange={() => {}} />
        <Slider label="Contrast" value={0.1} onChange={() => {}} />
      </Section>
    </div>
  );
}
