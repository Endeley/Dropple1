"use client";

import Section from "@/components/inspector/Section";
import ColorPicker from "@/components/inspector/ColorPicker";
import Input from "@/components/inspector/Input";
import Select from "@/components/inspector/Select";
import Slider from "@/components/inspector/Slider";

export default function TemplateInspector() {
  return (
    <div className="space-y-4">
      <Section title="Global Theme">
        <ColorPicker label="Primary Color" value="#7A5CFF" onChange={() => {}} />
        <ColorPicker label="Secondary Color" value="#B77FFF" onChange={() => {}} />
        <Select
          label="Typography System"
          value="Manrope"
          onChange={() => {}}
          options={["Manrope", "Inter", "Satoshi"]}
        />
      </Section>

      <Section title="Auto Layout">
        <Input label="Spacing" value="32px" onChange={() => {}} />
        <Input label="Padding" value="24px" onChange={() => {}} />
        <Select
          label="Content Layout"
          value="Centered"
          options={["Centered", "Left-aligned", "Split"]}
          onChange={() => {}}
        />
      </Section>

      <Section title="AI Template Refinement">
        <Slider label="Creativity" value={0.6} onChange={() => {}} />
        <Slider label="Balance" value={0.8} onChange={() => {}} />
      </Section>
    </div>
  );
}
