"use client";

import { useEffect, useState } from "react";
import { onPresence, getPresence } from "@/lib/realtime/presenceManager";

const colors = ["#a855f7", "#22d3ee", "#f59e0b", "#10b981", "#ef4444"];

export default function PresenceBar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const update = (list) => setUsers(list || []);
    update(getPresence());
    const unsub = onPresence(update);
    return () => unsub && unsub();
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-white">
      {users.length === 0 && <p className="text-xs text-white/60">No collaborators online</p>}
      {users.map((u, idx) => (
        <div key={u.userId} className="flex items-center gap-1 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: u.color || colors[idx % colors.length] }}
          />
          <span className="font-semibold">{u.name || u.userId}</span>
          <span className="text-white/50">{u.status || "online"}</span>
        </div>
      ))}
    </div>
  );
}
