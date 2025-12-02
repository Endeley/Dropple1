"use client";

import { useRef } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function VideoUploader() {
  const videoSource = useAIStudioStore((s) => s.videoSource);
  const setVideoSource = useAIStudioStore((s) => s.setVideoSource);
  const setVideoPreview = useAIStudioStore((s) => s.setVideoPreview);
  const inputRef = useRef(null);

  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoSource(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-white/80">Upload Image or Video</p>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full h-28 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-xs text-white/60 cursor-pointer hover:bg-white/[0.1]"
      >
        {videoSource ? videoSource.name : "Click to upload image or MP4"}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={upload}
      />
    </div>
  );
}
