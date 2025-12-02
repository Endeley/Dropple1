"use client";

import { useState } from "react";

const sampleBlueprint = `{
  "size": "1:1",
  "layout": {
    "grid": "12-col",
    "blocks": [
      { "type": "heading", "x": 2, "y": 2, "w": 8, "h": 2 },
      { "type": "image", "x": 2, "y": 4, "w": 8, "h": 6 }
    ]
  },
  "colors": {
    "primary": ["#8B5CF6", "#22d3ee"],
    "background": "#0b0b12",
    "text": "#ffffff"
  },
  "typography": {
    "display": { "font": "Inter", "weight": 700 },
    "body": { "font": "Inter", "weight": 400 }
  },
  "effects": {
    "backgroundGradient": "violet-to-cyan"
  }
}`;

export default function TemplateAutoRenderer() {
  const [json, setJson] = useState(sampleBlueprint);
  const [variant, setVariant] = useState("1:1");
  const [mode, setMode] = useState("light");
  const [format, setFormat] = useState("png");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const parsed = JSON.parse(json);
      const res = await fetch("/api/render/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed, size: variant, theme: mode, format }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Render failed");
      }
      setImage(data.image);
    } catch (err) {
      setError(err?.message || "Failed to render template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-3 text-xl text-purple-300">Template Auto-Renderer</h2>
      <p className="text-sm text-white/60">Paste template JSON → get instant preview thumbnails.</p>

      <div className="mt-4 grid gap-3">
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="min-h-[200px] rounded-md border border-white/10 bg-white/5 p-3 text-sm font-mono"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          >
            <option value="1:1">1:1</option>
            <option value="9:16">9:16</option>
            <option value="16:9">16:9</option>
            <option value="4:5">4:5</option>
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          >
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
          </select>

          <button
            onClick={run}
            className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
            type="button"
          >
            {loading ? "Rendering…" : "Render Preview"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {image && (
        <div className="mt-6">
          <h3 className="text-purple-300">Preview</h3>
          <div className="mt-3 flex items-center justify-center rounded-lg border border-white/10 bg-black/40 p-3">
            <img src={image} alt="Template preview" className="max-h-[420px] max-w-full rounded-md" />
          </div>
          <p className="mt-2 text-xs text-white/60 break-all">Data URL: {image.slice(0, 120)}...</p>
        </div>
      )}
    </div>
  );
}
