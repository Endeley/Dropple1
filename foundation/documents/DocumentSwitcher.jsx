"use client";

import { useMemo, useState } from "react";
import { useDocumentStore } from "./documentStore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DocumentSwitcher() {
  const documents = useDocumentStore((s) => s.documents);
  const currentId = useDocumentStore((s) => s.currentId);
  const setCurrent = useDocumentStore((s) => s.setCurrent);
  const createDocument = useDocumentStore((s) => s.createDocument);
  const [creating, setCreating] = useState(false);
  const createRemoteDocument = useMutation(api.documents.create);

  const docList = useMemo(() => Object.values(documents || {}), [documents]);

  async function handleCreate() {
    const nextName = `Untitled ${docList.length + 1}`;
    try {
      setCreating(true);
      const newId = await createRemoteDocument({ name: nextName });
      if (newId) {
        setCurrent(newId);
        return;
      }
    } catch (err) {
      console.warn("Convex create failed, falling back to local", err);
    } finally {
      setCreating(false);
    }
    const localId = createDocument(nextName);
    setCurrent(localId);
  }

  return (
    <div className="h-11 w-full flex items-center justify-between px-6 bg-[#0E0E14]/70 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-2 overflow-x-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
        {docList.length === 0 ? (
          <div className="text-xs text-white/60">No documents yet</div>
        ) : (
          docList.map((doc) => {
            const active = doc.id === currentId;
            return (
              <button
                key={doc.id}
                onClick={() => setCurrent(doc.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-[0_10px_30px_rgba(127,90,255,0.35)]"
                    : "bg-white/5 text-white/70 hover:text-white"
                }`}
              >
                {doc.name || "Untitled"}
              </button>
            );
          })
        )}
      </div>

      <button
        onClick={handleCreate}
        disabled={creating}
        className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/80 hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {creating ? "Creating..." : "+ New Document"}
      </button>
    </div>
  );
}
