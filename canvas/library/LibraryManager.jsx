"use client";

import { createComponentInstance } from "@/canvas/components/createComponentInstance";
import { useDocumentStore } from "@/foundation/documents/documentStore";
import { useLibraryStore } from "@/foundation/libraries/libraryStore";

export default function LibraryManager() {
  const libraries = useLibraryStore((state) => state.libraries);
  const installLibrary = useDocumentStore((state) => state.installLibrary);
  const removeLibrary = useDocumentStore((state) => state.removeLibrary);
  const installed = useDocumentStore((state) => {
    const doc = state.documents[state.currentId];
    return doc?.installedLibraries || [];
  });

  const hasLibraries = Object.keys(libraries).length > 0;

  return (
    <div className="border-t border-white/5 mt-3 pt-3 space-y-3">
      <div className="text-xs text-neutral-400 font-semibold">
        SHARED LIBRARIES
      </div>

      {!hasLibraries && (
        <div className="text-neutral-500 text-xs">
          No libraries available yet.
        </div>
      )}

      {Object.values(libraries).map((library) => {
        const isInstalled = installed.includes(library.id);
        return (
          <div
            key={library.id}
            className="bg-neutral-900/60 border border-white/5 rounded-md p-3 space-y-2"
          >
            <div className="flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-sm">{library.name}</div>
                <div className="text-neutral-500">v{library.version}</div>
              </div>
              <button
                className={`px-2 py-1 rounded ${
                  isInstalled
                    ? "bg-red-500/20 text-red-200 hover:bg-red-500/30"
                    : "bg-violet-500/30 text-violet-100 hover:bg-violet-500/40"
                }`}
                onClick={() =>
                  isInstalled
                    ? removeLibrary(library.id)
                    : installLibrary(library.id)
                }
              >
                {isInstalled ? "Remove" : "Install"}
              </button>
            </div>

            {isInstalled && (
              <div className="space-y-2">
                {Object.values(library.components || {}).length === 0 && (
                  <div className="text-xs text-neutral-500">
                    No components published yet.
                  </div>
                )}

                {Object.values(library.components || {}).map((component) => (
                  <button
                    key={component.id}
                    className="w-full bg-neutral-800/70 rounded px-2 py-1 text-left text-xs hover:bg-neutral-800"
                    onClick={() => createComponentInstance(component.id)}
                  >
                    {component.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
