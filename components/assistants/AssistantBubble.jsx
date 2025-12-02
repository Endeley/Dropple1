"use client";

import { useState } from "react";
import AssistantPanel from "./AssistantPanel";

export default function AssistantBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-purple-600 p-3 text-white shadow-lg hover:bg-purple-700"
      >
        ✨
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-96">
          <AssistantPanel onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
