"use client";

const tones = ["Luxury", "Minimal", "Playful", "Futuristic", "Bold", "Soft", "Creative"];

export default function NamingToneSelector({ value = "Luxury", onChange = () => {} }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white/70">Tone</label>

      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => {
          const selected = tone === value;
          return (
            <button
              key={tone}
              onClick={() => onChange(tone)}
              className={`rounded-full px-3 py-1 text-xs transition ${
                selected
                  ? "border border-purple-300/60 bg-purple-600/40 text-white shadow-lg shadow-purple-800/40"
                  : "border border-white/10 bg-white/5 text-white hover:border-purple-400/60 hover:bg-purple-600/30"
              }`}
              type="button"
            >
              {tone}
            </button>
          );
        })}
      </div>
    </div>
  );
}
