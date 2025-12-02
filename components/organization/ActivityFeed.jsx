"use client";

import { useEffect, useState } from "react";

export default function ActivityFeed({ org }) {
  const [items, setItems] = useState(org?.activity || []);

  useEffect(() => {
    setItems(org?.activity || []);
  }, [org]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <h3 className="text-purple-300">Activity</h3>
      <div className="mt-3 space-y-2 max-h-64 overflow-y-auto text-sm">
        {items.map((a) => (
          <div key={a.id} className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
            <p className="font-semibold">{a.message}</p>
            <p className="text-xs text-white/50">
              {a.actor || "system"} • {new Date(a.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {!items.length && <p className="text-xs text-white/50">No activity yet.</p>}
      </div>
    </div>
  );
}
