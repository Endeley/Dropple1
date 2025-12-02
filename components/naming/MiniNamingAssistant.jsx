"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function MiniNamingAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full bg-purple-600 p-3 text-white shadow-lg transition hover:bg-purple-700"
        type="button"
      >
        <Sparkles size={20} />
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-72 rounded-2xl border border-white/10 bg-black/50 p-4 shadow-xl backdrop-blur-xl">
          <p className="text-sm text-white/60">Name something quickly:</p>

          <input
            placeholder="Type here..."
            className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
          />

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-white/40 transition hover:text-white"
              type="button"
            >
              Close
            </button>
            <button
              className="rounded-md bg-purple-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-purple-600"
              type="button"
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </>
  );
}
