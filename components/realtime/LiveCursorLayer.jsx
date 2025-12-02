"use client";

import { useEffect, useState } from "react";
import { onCursors, getCursors } from "@/lib/realtime/cursorManager";

export default function LiveCursorLayer() {
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const update = (list) => setCursors(list || []);
    update(getCursors());
    const unsub = onCursors(update);
    return () => unsub && unsub();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {cursors.map((c) => (
        <div
          key={c.userId}
          className="absolute flex items-center gap-1 text-xs font-semibold text-white drop-shadow"
          style={{ left: c.x, top: c.y, transform: "translate(-50%, -50%)" }}
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: c.color || "#a855f7" }}
          />
          <span className="rounded-md bg-black/60 px-2 py-1">{c.name || c.userId}</span>
        </div>
      ))}
    </div>
  );
}
