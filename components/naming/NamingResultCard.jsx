"use client";

export default function NamingResultCard({ data }) {
  const name = data?.name || "Untitled";
  const meaning = data?.meaning || "Modern & versatile.";
  const toneScore = data?.tone_match_score ?? data?.score ?? 0;
  const memoScore = data?.memorability_score ?? 0;
  const reasoning = data?.reasoning || "";

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-purple-300">{name}</h3>
      <p className="mt-1 text-xs text-white/60">{meaning}</p>
      {reasoning && <p className="mt-1 text-[11px] text-white/45">Why: {reasoning}</p>}
      <p className="mt-2 text-xs text-white/40">
        Tone: {toneScore} • Memorability: {memoScore}
      </p>

      <button
        className="mt-3 w-full rounded-md bg-purple-700 py-1 text-sm font-semibold text-white transition hover:bg-purple-600"
        type="button"
      >
        Use Name
      </button>
    </div>
  );
}
