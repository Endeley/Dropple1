"use client";

import Section from "@/components/inspector/Section";
import Input from "@/components/inspector/Input";
import NumberInput from "@/components/inspector/NumberInput";
import Select from "@/components/inspector/Select";
import Slider from "@/components/inspector/Slider";

export default function AIStudioInspector() {
  return (
    <div className="space-y-4">
      <Section title="Model">
        <Select
          label="Model"
          value="gpt4o-image"
          options={["gpt4o-image", "sdxl", "runway-gen3", "flux"]}
          onChange={() => {}}
        />
      </Section>

      <Section title="Generation Settings">
        <Input label="Prompt" value="A futuristic city…" onChange={() => {}} />
        <Select
          label="Style"
          value="cinematic"
          options={["cinematic", "illustration", "product", "anime", "portrait", "abstract"]}
          onChange={() => {}}
        />
      </Section>

      <Section title="Advanced">
        <NumberInput label="Width" value={1080} onChange={() => {}} />
        <NumberInput label="Height" value={1350} onChange={() => {}} />
        <Slider label="Guidance Scale" value={7.5} onChange={() => {}} />
        <NumberInput label="Seed" value={1234} onChange={() => {}} />
      </Section>
    </div>
  );
}
