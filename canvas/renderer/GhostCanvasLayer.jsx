"use client";

export default function GhostCanvasLayer({ definition, opacity = 0.25 }) {
  if (!definition) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-150"
      style={{ opacity }}
    >
      {(definition.slots || []).map((slot) => (
        <div
          key={slot.id}
          className="absolute rounded border border-dashed border-indigo-400/60 bg-indigo-200/10"
          style={{
            left: slot.frame?.x || 0,
            top: slot.frame?.y || 0,
            width: slot.frame?.width || 0,
            height: slot.frame?.height || 0,
          }}
        />
      ))}
    </div>
  );
}
