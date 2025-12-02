"use client";

import Section from "@/components/inspector/Section";
import NumberInput from "@/components/inspector/NumberInput";
import Slider from "@/components/inspector/Slider";
import Select from "@/components/inspector/Select";
import Toggle from "@/components/inspector/Toggle";
import ColorPicker from "@/components/inspector/ColorPicker";

export default function VideoInspector() {
  return (
    <div className="space-y-4">
      <Section title="Clip Transform">
        <NumberInput label="X" value={100} onChange={() => {}} />
        <NumberInput label="Y" value={60} onChange={() => {}} />
        <NumberInput label="Scale" value={100} onChange={() => {}} />
        <NumberInput label="Rotation" value={0} onChange={() => {}} />
      </Section>

      <Section title="Speed & Duration">
        <NumberInput label="Playback Speed" value={1.0} onChange={() => {}} />
        <NumberInput label="Duration (s)" value={12} onChange={() => {}} />
      </Section>

      <Section title="Color Grading">
        <Slider label="Exposure" value={0} onChange={() => {}} />
        <Slider label="Contrast" value={0} onChange={() => {}} />
        <Slider label="Saturation" value={1} onChange={() => {}} />
        <ColorPicker label="Tint" value="#ffffff" onChange={() => {}} />
      </Section>

      <Section title="Audio">
        <Slider label="Volume" value={1.0} onChange={() => {}} />
        <Toggle label="Mute Clip" checked={false} onChange={() => {}} />
      </Section>

      <Section title="Keyframes">
        <Toggle label="Enable Keyframes" checked={false} onChange={() => {}} />
        <Select
          label="Interpolation"
          value="linear"
          options={["linear", "ease-in", "ease-out", "ease-in-out", "cubic"]}
          onChange={() => {}}
        />
      </Section>
    </div>
  );
}
