"use client";

import Section from "@/components/inspector/Section";
import Slider from "@/components/inspector/Slider";
import Toggle from "@/components/inspector/Toggle";
import NumberInput from "@/components/inspector/NumberInput";
import ColorPicker from "@/components/inspector/ColorPicker";

export default function MockupInspector() {
  return (
    <div className="space-y-4">
      <Section title="Surface">
        <Slider label="Glossiness" value={0.5} onChange={() => {}} />
        <Slider label="Roughness" value={0.2} onChange={() => {}} />
        <ColorPicker label="Surface Tint" value="#ffffff" onChange={() => {}} />
      </Section>

      <Section title="Perspective">
        <NumberInput label="Skew X" value={0} onChange={() => {}} />
        <NumberInput label="Skew Y" value={0} onChange={() => {}} />
        <Slider label="Perspective Depth" value={0.3} onChange={() => {}} />
      </Section>

      <Section title="Lighting">
        <Slider label="Light Intensity" value={1.0} onChange={() => {}} />
        <Slider label="Shadow Strength" value={0.5} onChange={() => {}} />
        <ColorPicker label="Light Color" value="#ffffff" onChange={() => {}} />
      </Section>

      <Section title="Replace Art">
        <Toggle label="Auto-Fit Artwork" checked={true} onChange={() => {}} />
      </Section>
    </div>
  );
}
