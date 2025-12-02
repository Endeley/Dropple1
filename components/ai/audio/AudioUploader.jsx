"use client";

import { useRef } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function AudioUploader() {
  const audioSource = useAIStudioStore((s) => s.audioSource);
  const setAudioSource = useAIStudioStore((s) => s.setAudioSource);
  const setAudioPreview = useAIStudioStore((s) => s.setAudioPreview);
  const inputRef = useRef(null);

  const onUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAudioSource(file);
    setAudioPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-white/80">Upload Audio File</p>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full h-24 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-xs text-white/60 cursor-pointer hover:bg-white/[0.1]"
      >
        {audioSource ? audioSource.name : "Click to upload audio (MP3, WAV, M4A)"}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={onUpload}
      />
    </div>
  );
}
