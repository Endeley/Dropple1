"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function VideoPreview() {
  const videoPreview = useAIStudioStore((s) => s.videoPreview);

  if (!videoPreview) {
    return (
      <div className="flex items-center justify-center text-gray-400 h-full">
        Upload an image or video to generate animation
      </div>
    );
  }

  const isVideo = videoPreview.startsWith("data:video") || videoPreview.endsWith(".mp4");

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 w-full">
      {isVideo ? (
        <video src={videoPreview} controls className="w-full" />
      ) : (
        <img src={videoPreview} className="w-full" alt="video source" />
      )}
    </div>
  );
}
