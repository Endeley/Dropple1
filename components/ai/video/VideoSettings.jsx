"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function VideoSettings() {
  const videoModel = useAIStudioStore((s) => s.videoModel);
  const setVideoModel = useAIStudioStore((s) => s.setVideoModel);
  const videoDuration = useAIStudioStore((s) => s.videoDuration);
  const setVideoDuration = useAIStudioStore((s) => s.setVideoDuration);
  const videoMotion = useAIStudioStore((s) => s.videoMotion);
  const setVideoMotion = useAIStudioStore((s) => s.setVideoMotion);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-white/80">Video Model</label>
        <select
          value={videoModel}
          onChange={(e) => setVideoModel(e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-violet-500/50"
        >
          <option value="svd">Stable Video Diffusion</option>
          <option value="pika">Pika Labs</option>
          <option value="runway">Runway Gen-2</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-white/80">Duration ({videoDuration}s)</label>
        <input
          type="range"
          min="2"
          max="8"
          value={videoDuration}
          onChange={(e) => setVideoDuration(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/80">Motion Type</label>
        <select
          value={videoMotion}
          onChange={(e) => setVideoMotion(e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-violet-500/50"
        >
          <option value="camera-pan">Camera Pan</option>
          <option value="camera-zoom">Zoom In</option>
          <option value="rotate">Rotate</option>
          <option value="loop">Animated Loop</option>
          <option value="cinematic">Cinematic Motion</option>
          <option value="animate">Animate Subject</option>
        </select>
      </div>
    </div>
  );
}
