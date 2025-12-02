"use client";

export default function MeasurementOverlay({ measure }) {
  if (!measure) return null;
  const { target, distances } = measure;

  return (
    <>
      {distances.map((distance) => (
        <div
          key={distance.id}
          className="absolute text-xs text-red-500 pointer-events-none bg-black/60 px-1 rounded"
          style={{
            left: target.x + target.width / 2,
            top: target.y - 12,
          }}
        >
          {Math.round(distance.horizontal)}px / {Math.round(distance.vertical)}px
        </div>
      ))}
    </>
  );
}
