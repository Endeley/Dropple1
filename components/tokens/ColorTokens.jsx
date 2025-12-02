"use client";

export default function ColorTokens({ scope, tokens = {}, onChange }) {
  const entries = Object.entries(tokens || {}).filter(([k]) => k.startsWith("color."));
  const update = (key, value) => {
    onChange && onChange({ [key]: value });
  };

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <h3 className="text-purple-300 text-sm font-semibold">Colors ({scope})</h3>
      <div className="mt-2 space-y-2">
        {entries.length === 0 && <p className="text-xs text-white/50">No colors set. Add tokens via assistant or code.</p>}
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <span className="w-32 font-mono">{key}</span>
            <input
              type="text"
              value={value}
              onChange={(e) => update(key, e.target.value)}
              className="flex-1 rounded-md border border-white/10 bg-white/5 p-1"
            />
            <div className="h-4 w-8 rounded border border-white/20" style={{ background: value }} />
          </div>
        ))}
      </div>
    </div>
  );
}
