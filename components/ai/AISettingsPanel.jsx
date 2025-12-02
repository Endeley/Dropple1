"use client";

import { useState } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";
import { aiModeConfig } from "@/lib/constants/aiModes";
import { aiEngine } from "@/lib/ai/AIEngine";
import MockupDesignUploader from "./mockups/MockupDesignUploader";
import MockupTypeSelector from "./mockups/MockupTypeSelector";
import MockupStyleSelector from "./mockups/MockupStyleSelector";
import VideoUploader from "./video/VideoUploader";
import VideoSettings from "./video/VideoSettings";
import AudioUploader from "./audio/AudioUploader";
import VoiceStyleSelector from "./audio/VoiceStyleSelector";
import AudioTools from "./audio/AudioTools";
import TemplateCategorySelector from "./template/TemplateCategorySelector";
import TemplateSizeSelector from "./template/TemplateSizeSelector";
import Section from "@/components/inspector/Section";
import Input from "@/components/inspector/Input";
import NumberInput from "@/components/inspector/NumberInput";
import Select from "@/components/inspector/Select";
import Slider from "@/components/inspector/Slider";

export default function AISettingsPanel() {
  const {
    mode,
    isGenerating,
    setGenerating,
    addHistory,
    setSelectedResult,
    mockupType,
    mockupStyle,
    uploadedDesign,
    videoSource,
    videoModel,
    videoDuration,
    videoMotion,
    setVideoPreview,
    audioSource,
    audioModel,
    voiceStyle,
    setAudioPreview,
    setAudioModel,
    templateCategory,
    setTemplateCategory,
    templateSize,
    setTemplateSize,
    setGeneratedTemplateJSON,
  } = useAIStudioStore();

  const config = aiModeConfig[mode];

  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("sdxl");
  const [style, setStyle] = useState("none");
  const [size, setSize] = useState("1024x1024");
  const [seed, setSeed] = useState("");
  const [guidance, setGuidance] = useState(7);
  const [strength, setStrength] = useState(0.8);
  const [numOutputs, setNumOutputs] = useState(4);

  const generate = async () => {
    setGenerating(true);
    try {
      let result;

      if (mode === "template") {
        result = await aiEngine.generateTemplate({
          prompt,
          category: templateCategory,
          size: templateSize,
        });
        setGeneratedTemplateJSON(result);
      } else if (mode === "audio") {
        result = await aiEngine.generateAudio({
          prompt,
          file: audioSource,
          model: audioModel,
          style: voiceStyle,
        });
        setAudioPreview(result);
      } else if (mode === "mockup") {
        result = await aiEngine.generateMockup({
          design: uploadedDesign,
          mockupType,
          mockupStyle,
        });
      } else if (mode === "video") {
        result = await aiEngine.generateVideo({
          file: videoSource,
          prompt,
          model: videoModel,
          duration: videoDuration,
          motion: videoMotion,
        });
        setVideoPreview(result);
      } else {
        result = await aiEngine.generateImage({
          prompt,
          negativePrompt,
          model,
          size,
          seed,
          guidance,
          strength,
          numOutputs,
          mode,
          style,
        });
      }

      addHistory({
        result,
        mode,
        prompt,
        style,
        date: new Date(),
      });

      if (mode !== "template") {
        setSelectedResult(result);
      }
    } catch (error) {
      console.error("AI error:", error);
    }
    setGenerating(false);
  };

  const stylePresets = [
    { id: "3d", label: "3D Render" },
    { id: "anime", label: "Anime" },
    { id: "real", label: "Realistic" },
    { id: "cinematic", label: "Cinematic" },
    { id: "vibrant", label: "Vibrant Colors" },
    { id: "line-art", label: "Line Art" },
  ];

  return (
    <div className="space-y-4">
      {config.showPrompt && (
        <Section title="Prompt">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-violet-500/50 outline-none"
            placeholder="Describe what to create..."
          />
          <textarea
            rows={2}
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-violet-500/50 outline-none"
            placeholder="Negative prompt"
          />
        </Section>
      )}

      {config.showStyles && (
        <Section title="Style Presets">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {stylePresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setStyle(preset.id)}
                className={`px-3 py-2 rounded-lg border ${
                  style === preset.id ? "bg-violet-600 border-violet-500" : "bg-white/5 border-white/10"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </Section>
      )}

      {config.showModelSelector && mode !== "audio" && mode !== "video" && mode !== "template" && (
        <Section title="Model & Output">
          <Select
            label="Model"
            value={model}
            onChange={setModel}
            options={["sdxl", "playground-v2", "turbovision", "sd-15"]}
          />
          <Select
            label="Size"
            value={size}
            onChange={setSize}
            options={["1024x1024", "768x1024", "1024x768", "512x512"]}
          />
          <Slider label="Guidance" value={guidance} min={1} max={20} step={0.1} onChange={setGuidance} />
          <Slider label="Strength" value={strength} min={0} max={1} step={0.01} onChange={setStrength} />
          <NumberInput label="Seed" value={seed} onChange={setSeed} />
          <NumberInput label="Outputs" value={numOutputs} onChange={setNumOutputs} />
        </Section>
      )}

      {mode === "mockup" && (
        <Section title="Mockup Settings">
          <MockupDesignUploader />
          <MockupTypeSelector />
          <MockupStyleSelector />
        </Section>
      )}

      {mode === "video" && (
        <Section title="Video Settings">
          <VideoUploader />
          <VideoSettings />
        </Section>
      )}

      {mode === "audio" && (
        <Section title="Audio Settings">
          <AudioUploader />
          <Select
            label="Provider"
            value={audioModel}
            onChange={setAudioModel}
            options={["elevenlabs", "clean"]}
          />
          <VoiceStyleSelector />
          <AudioTools />
        </Section>
      )}

      {mode === "template" && (
        <Section title="Template Options">
          <TemplateCategorySelector value={templateCategory} onChange={setTemplateCategory} />
          <TemplateSizeSelector value={templateSize} onChange={setTemplateSize} />
        </Section>
      )}

      <button
        onClick={generate}
        disabled={isGenerating}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 font-semibold disabled:opacity-40"
      >
        {isGenerating ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
