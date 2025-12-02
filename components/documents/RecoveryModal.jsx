"use client";

import { useEffect, useState } from "react";
import { listAutosaves } from "@/lib/state/autosaveManager";
import { newDocument } from "@/lib/state/documentManager";

export default function RecoveryModal() {
  const [open, setOpen] = useState(false);
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const items = listAutosaves();
    if (items.length) {
      setAutos(items);
      setOpen(true);
    }
  }, []);

  const restore = (item) => {
    if (!item?.data) return;
    newDocument({
      name: item.name || "Recovered",
      model: item.data,
    });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-lg font-semibold text-purple-300">Recovery</h3>
        <p className="mt-2 text-sm text-white/70">We found autosaved versions of your documents.</p>
        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          {autos.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3">
              <div>
                <p className="font-semibold">{a.name || a.id}</p>
                <p className="text-xs text-white/50">{new Date(a.timestamp).toLocaleTimeString()}</p>
              </div>
              <button
                onClick={() => restore(a)}
                className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
              >
                Restore
              </button>
            </div>
          ))}
          {!autos.length && <p className="text-xs text-white/50">No autosaves found.</p>}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={() => setOpen(false)} className="text-sm text-white/60 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
