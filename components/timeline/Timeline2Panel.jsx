"use client";

import { useState } from "react";
import { createTimeline } from "@/lib/timeline-engine-2.0/core/timelineManager";
import { addTrack } from "@/lib/timeline-engine-2.0/core/trackSystem";
import { addClip } from "@/lib/timeline-engine-2.0/core/clipEngine";
import { addKeyframe } from "@/lib/timeline-engine-2.0/core/keyframeEngine";
import { setCurve } from "@/lib/timeline-engine-2.0/core/curveEditor";
import { createVideoTrack } from "@/lib/timeline-engine-2.0/tracks/videoTrack";
import { createAudioTrack } from "@/lib/timeline-engine-2.0/tracks/audioTrack";
import { createAnimationTrack } from "@/lib/timeline-engine-2.0/tracks/animationTrack";
import { analyzeTimeline } from "@/lib/timeline-engine-2.0/ai/timelineAI";
import { suggestPacing } from "@/lib/timeline-engine-2.0/ai/pacingEngine";
import { ripple } from "@/lib/timeline-engine-2.0/editing/rippleEdit";

export default function Timeline2Panel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const tl = createTimeline("Demo TL");
    const v = createVideoTrack("Video A");
    const a = createAudioTrack("Music");
    const anim = createAnimationTrack("Motion");
    addTrack(tl, v);
    addTrack(tl, a);
    addTrack(tl, anim);
    addClip(v, { start: 0, end: 5 });
    addKeyframe(anim, 0, 0);
    addKeyframe(anim, 1, 1);
    setCurve(anim, "easeInOut");
    ripple(tl, 0.2);
    const analysis = analyzeTimeline(tl);
    const pacing = suggestPacing(tl);

    setLog((l) => [
      ...l,
      `Timeline: ${tl.name}`,
      `Tracks: ${tl.tracks.length}`,
      `Video clips: ${v.clips.length}`,
      `Anim keys: ${anim.keyframes.length}`,
      `Curve: ${anim.curve}`,
      `Analysis suggestion: ${analysis.suggestion}`,
      `Pacing: ${pacing.suggestion}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Timeline Engine 2.0</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
