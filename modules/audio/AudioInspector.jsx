"use client";

import Section from "@/components/inspector/Section";
import Slider from "@/components/inspector/Slider";
import Toggle from "@/components/inspector/Toggle";
import NumberInput from "@/components/inspector/NumberInput";

export default function AudioInspector() {
  return (
    <div className="space-y-4">
      <Section title="Waveform Edit">
        <NumberInput label="Trim Start (s)" value={0} onChange={() => {}} />
        <NumberInput label="Trim End (s)" value={10} onChange={() => {}} />
      </Section>

      <Section title="Volume">
        <Slider label="Gain" value={1.0} onChange={() => {}} />
        <Toggle label="Mute" checked={false} onChange={() => {}} />
      </Section>

      <Section title="Effects">
        <Slider label="EQ Low" value={0.5} onChange={() => {}} />
        <Slider label="EQ Mid" value={0.5} onChange={() => {}} />
        <Slider label="EQ High" value={0.5} onChange={() => {}} />
        <Slider label="Reverb" value={0.0} onChange={() => {}} />
        <Slider label="Echo" value={0.0} onChange={() => {}} />
      </Section>

      <Section title="Enhancements">
        <Toggle label="Clean Noise" checked={false} onChange={() => {}} />
        <Toggle label="Enhance Voice" checked={false} onChange={() => {}} />
      </Section>
    </div>
  );
}
