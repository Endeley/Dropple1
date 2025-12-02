"use client";

import { useEffect, useMemo, useState } from "react";
import { subscribe, getState, setActiveDocument } from "@/lib/state/documentManager";

export default function DocumentSwitcher() {
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const update = (next) => setDocs(Object.values(next.documents || {}));
    update(getState());
    const unsub = subscribe(update);
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return docs;
    return docs.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  }, [docs, query]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <h3 className="text-purple-300">Document Switcher</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search open documents..."
        className="mt-2 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm"
      />
      <div className="mt-3 max-h-56 overflow-y-auto">
        {filtered.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setActiveDocument(doc.id)}
            className="flex w-full items-center justify-between rounded-md border border-white/10 bg-black/30 px-3 py-2 text-left text-sm hover:border-purple-400/40 hover:bg-purple-600/20"
          >
            <span>{doc.name}</span>
            <span className="text-xs text-white/50">{doc.dirty ? "Unsaved" : "Saved"}</span>
          </button>
        ))}
        {!filtered.length && <p className="text-xs text-white/50">No documents match.</p>}
      </div>
    </div>
  );
}
