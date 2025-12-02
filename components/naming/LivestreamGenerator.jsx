"use client";

import { useState } from "react";

export default function LivestreamGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("YouTube Live");
  const [duration, setDuration] = useState(60);
  const [style, setStyle] = useState("Friendly, Engaging");
  const [hostType, setHostType] = useState("Solo");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/livestream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platform,
          duration: Number(duration) || 60,
          style,
          hostType,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate livestream outline");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate livestream outline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Livestream Outline Engine</h2>

      <input
        placeholder="Livestream Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>YouTube Live</option>
        <option>TikTok Live</option>
        <option>Instagram Live</option>
        <option>Twitch</option>
        <option>Facebook Live</option>
        <option>Webinar</option>
      </select>

      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Tone & Style"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <select
        value={hostType}
        onChange={(e) => setHostType(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>Solo</option>
        <option>Co-Host</option>
        <option>Interview Format</option>
        <option>Panel</option>
        <option>Live Class</option>
      </select>

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Livestream Outline"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <h3 className="text-purple-300">Run of Show</h3>
          {result.run_of_show?.map((seg, i) => (
            <div key={`seg-${i}`} className="rounded-lg bg-white/10 p-4">
              <h4 className="font-semibold text-purple-200">
                {seg.start_time} → {seg.end_time} — {seg.segment_title}
              </h4>
              <p className="mt-2">
                <strong>Talking Points:</strong>
              </p>
              <ul className="ml-5 list-disc">
                {seg.talking_points?.map((p, j) => (
                  <li key={`tp-${i}-${j}`}>{p}</li>
                ))}
              </ul>

              <p className="mt-2">
                <strong>Chat Prompts:</strong>
              </p>
              <ul className="ml-5 list-disc">
                {seg.chat_prompts?.map((p, j) => (
                  <li key={`cp-${i}-${j}`}>{p}</li>
                ))}
              </ul>

              <p className="mt-2">
                <strong>Overlays:</strong>
              </p>
              <ul className="ml-5 list-disc">
                {seg.overlay_suggestions?.map((o, j) => (
                  <li key={`ov-${i}-${j}`}>{o}</li>
                ))}
              </ul>

              <p className="mt-2">
                <strong>Notes:</strong> {seg.notes}
              </p>
            </div>
          ))}

          <h3 className="text-purple-300">CTA Blocks</h3>
          <pre className="whitespace-pre-wrap">{(result.cta_blocks || []).join("\n")}</pre>

          <h3 className="text-purple-300">Interaction Prompts</h3>
          <ul className="ml-5 list-disc">
            {result.interaction_prompts?.map((p, i) => (
              <li key={`ip-${i}`}>{p}</li>
            ))}
          </ul>

          <h3 className="text-purple-300">Technical Checklist</h3>
          <ul className="ml-5 list-disc">
            {result.technical_checklist?.map((t, i) => (
              <li key={`tech-${i}`}>{t}</li>
            ))}
          </ul>

          <h3 className="text-purple-300">Sponsor Block</h3>
          <pre className="whitespace-pre-wrap">{result.sponsor_block}</pre>

          <h3 className="text-purple-300">Closing Script</h3>
          <pre className="whitespace-pre-wrap">{result.closing_script}</pre>

          <h3 className="text-purple-300">Scene Switch List</h3>
          <ul className="ml-5 list-disc">
            {result.scene_switch_list?.map((s, i) => (
              <li key={`scene-${i}`}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
