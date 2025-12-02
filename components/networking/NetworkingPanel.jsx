"use client";

import { useState } from "react";
import { createTransport, connect, send } from "@/lib/networking/core/transportLayer";
import { createSyncEngine, registerEntity, applyUpdate } from "@/lib/networking/core/syncEngine";
import { setPresence } from "@/lib/networking/collaboration/presenceSystem";
import { updateCursorRemote, getCursors } from "@/lib/networking/realtime/cursorSync";

export default function NetworkingPanel() {
  const [transport, setTransport] = useState(createTransport({ url: "wss://demo" }));
  const [sync, setSync] = useState(createSyncEngine());
  const [log, setLog] = useState([]);

  const connectNow = () => {
    const t = connect(transport);
    setTransport(t);
    setLog((l) => [...l, `Transport connected`]);
  };

  const addEntity = () => {
    const id = `entity_${Math.random().toString(36).slice(2, 5)}`;
    const s = registerEntity(sync, id, { x: Math.random(), y: Math.random() });
    setSync(s);
    setLog((l) => [...l, `Registered ${id}`]);
  };

  const patchEntity = () => {
    const first = sync.entities.keys().next().value;
    if (!first) return;
    const s = applyUpdate(sync, first, { x: Math.random(), y: Math.random() });
    setSync(s);
    send(transport, { type: "update", id: first });
    setLog((l) => [...l, `Patched ${first}`]);
  };

  const updatePresence = () => {
    const p = setPresence("me", { mode: "edit", scene: "demo" });
    setLog((l) => [...l, `Presence: ${p.length}`]);
  };

  const updateCursor = () => {
    const c = updateCursorRemote("me", { x: Math.random() * 500, y: Math.random() * 500 });
    setLog((l) => [...l, `Cursors: ${c.length}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Networking Engine</h3>
        <button
          onClick={connectNow}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Connect
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={addEntity} className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20" type="button">
          Add Entity
        </button>
        <button onClick={patchEntity} className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20" type="button">
          Patch Entity
        </button>
        <button onClick={updatePresence} className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20" type="button">
          Presence
        </button>
        <button onClick={updateCursor} className="rounded-md bg-white/10 px-3 py-1 text-xs hover:bg-white/20" type="button">
          Cursor
        </button>
      </div>

      <p className="mt-3 text-xs text-white/60">Transport: {transport.status}</p>
      <p className="text-xs text-white/60">Entities: {sync.entities.size}</p>
      <p className="text-xs text-white/60">Cursors: {getCursors().length}</p>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
