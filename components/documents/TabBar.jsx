"use client";

import { useEffect, useState } from "react";
import {
  subscribe,
  getState,
  setActiveDocument,
  closeDocument,
  duplicateDocument,
  renameDocument,
} from "@/lib/state/documentManager";

export default function TabBar() {
  const [docs, setDocs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const update = (next) => {
      setDocs(Object.values(next.documents || {}));
      setActive(next.activeDocumentId);
    };
    update(getState());
    const unsub = subscribe(update);
    return () => unsub();
  }, []);

  const handleRename = (id) => {
    const next = prompt("Rename document", getState().documents[id]?.name || "");
    if (next) renameDocument(id, next);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-white/10 bg-black/30 p-2 text-white">
      {docs.map((doc) => (
        <div
          key={doc.id}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
            doc.id === active ? "bg-purple-600/40 border border-purple-400/40" : "bg-white/5 border border-white/10"
          }`}
        >
          <button onClick={() => setActiveDocument(doc.id)} className="font-semibold">
            {doc.name}
          </button>
          <span className="text-xs text-white/50">{doc.dirty ? "●" : ""}</span>
          <div className="flex items-center gap-1 text-xs text-white/60">
            <button onClick={() => handleRename(doc.id)}>Rename</button>
            <button onClick={() => duplicateDocument(doc.id)}>Duplicate</button>
            <button onClick={() => closeDocument(doc.id)}>✕</button>
          </div>
        </div>
      ))}
      {!docs.length && <p className="text-xs text-white/50">No documents open.</p>}
    </div>
  );
}
