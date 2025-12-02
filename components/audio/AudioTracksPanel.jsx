"use client";

import { useState } from "react";
import { createAudioTrack } from "@/lib/audio/core/track";
import { createAudioClip } from "@/lib/audio/core/clip";

export default function AudioTracksPanel() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  const addTrack = (type = "audio") => {
    const track = createAudioTrack({ name: `${type} track`, type });
    setTracks((prev) => [...prev, track]);
  };

  const addDummyClip = (trackId) => {
    const clip = createAudioClip({ start: 0, end: 5, bufferId: "sample", gain: 1 });
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, clips: [...t.clips, clip] } : t))
    );
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Audio Engine 2.0</h3>
        <div className="flex gap-2">
          <button
            onClick={() => addTrack("voice")}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Add Voice Track
          </button>
          <button
            onClick={() => addTrack("music")}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Add Music Track
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}

      <div className="mt-4 space-y-3">
        {tracks.map((t) => (
          <div key={t.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-white/50 text-xs">{t.type}</p>
              </div>
              <button
                onClick={() => addDummyClip(t.id)}
                className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                type="button"
              >
                Add Clip
              </button>
            </div>
            <div className="mt-2 space-y-1 text-xs">
              {t.clips.map((c) => (
                <div key={c.id} className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
                  Clip {c.id} — {c.start}s to {c.end}s — gain {c.gain}
                </div>
              ))}
              {!t.clips.length && <p className="text-white/50">No clips yet.</p>}
            </div>
          </div>
        ))}
        {!tracks.length && <p className="text-xs text-white/50">No tracks yet. Add a track to start.</p>}
      </div>
    </div>
  );
}
