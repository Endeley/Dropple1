"use client";

export default function HighlightChanges({ diffs }) {
  if (!diffs) return null;

  return (
    <>
      {(diffs.moved || []).map((d) => (
        <div
          key={`move-${d.id}`}
          className="absolute pointer-events-none animate-movePulse"
          style={{
            left: d.frame?.x || 0,
            top: d.frame?.y || 0,
            width: d.frame?.width || 0,
            height: d.frame?.height || 0,
            border: "2px solid rgba(59,130,246,0.8)",
            borderRadius: 6,
            zIndex: 3200,
          }}
        />
      ))}

      {(diffs.resized || []).map((d) => (
        <div
          key={`resize-${d.id}`}
          className="absolute pointer-events-none animate-resizePulse"
          style={{
            left: d.frame?.x || 0,
            top: d.frame?.y || 0,
            width: d.frame?.width || 0,
            height: d.frame?.height || 0,
            border: "2px solid rgba(34,197,94,0.8)",
            borderRadius: 6,
            zIndex: 3200,
          }}
        />
      ))}

      {(diffs.style || []).map((d) => (
        <div
          key={`style-${d.id}`}
          className="absolute pointer-events-none animate-stylePulse"
          style={{
            left: d.frame?.x || 0,
            top: d.frame?.y || 0,
            width: d.frame?.width || 0,
            height: d.frame?.height || 0,
            boxShadow: "0 0 18px rgba(168,85,247,0.9)",
            borderRadius: 10,
            zIndex: 3200,
          }}
        />
      ))}

      {(diffs.text || []).map((d) => (
        <div
          key={`text-${d.id}`}
          className="absolute pointer-events-none animate-textPulse"
          style={{
            left: d.frame?.x || 0,
            top: (d.frame?.y || 0) + (d.frame?.height || 0) - 4,
            width: d.frame?.width || 0,
            height: 3,
            background: "rgba(234,179,8,1)",
            borderRadius: 2,
            zIndex: 3200,
          }}
        />
      ))}
    </>
  );
}
