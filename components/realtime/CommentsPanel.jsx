"use client";

import { useEffect, useState } from "react";
import { addComment, listComments } from "@/lib/realtime/commentManager";
import { getActiveDocument } from "@/lib/state/documentManager";

export default function CommentsPanel() {
  const [docId, setDocId] = useState(null);
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const doc = getActiveDocument();
    if (doc) {
      setDocId(doc.id);
      setItems(listComments(doc.id));
    }
  }, []);

  const submit = () => {
    if (!docId || !text.trim()) return;
    addComment(docId, { author: "me", text });
    setItems(listComments(docId));
    setText("");
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <h3 className="text-purple-300">Comments</h3>
      <div className="mt-3 space-y-3 max-h-64 overflow-y-auto">
        {items.map((c) => (
          <div key={c.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <p className="text-sm font-semibold">{c.author}</p>
            <p className="text-sm text-white/80">{c.text}</p>
            {c.replies?.length ? (
              <div className="mt-2 space-y-1">
                {c.replies.map((r, i) => (
                  <p key={i} className="text-xs text-white/60">
                    {r.author}: {r.text}
                  </p>
                ))}
              </div>
            ) : null}
            {c.resolved && <span className="text-xs text-emerald-400">Resolved</span>}
          </div>
        ))}
        {!items.length && <p className="text-xs text-white/50">No comments yet.</p>}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment..."
          className="flex-1 rounded-md border border-white/10 bg-white/5 p-2 text-sm"
        />
        <button
          onClick={submit}
          className="rounded-md bg-purple-600 px-3 py-2 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Post
        </button>
      </div>
    </div>
  );
}
