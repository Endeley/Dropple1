"use client";

import { useComponentLibraryUI } from "./componentLibraryUI";

export default function ComponentLibraryToggle() {
  const toggle = useComponentLibraryUI((state) => state.toggle);
  const isOpen = useComponentLibraryUI((state) => state.isOpen);

  return (
    <button
      onClick={toggle}
      className="absolute top-2 left-2 z-40 bg-neutral-900/90 text-white text-xs px-3 py-1 rounded border border-white/10 hover:bg-neutral-800"
    >
      {isOpen ? "Hide Components" : "Show Components"}
    </button>
  );
}
