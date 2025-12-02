"use client";

export default function ReplaceImageModal({ onConfirm, onCancel }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[360px] rounded-lg border border-neutral-200 bg-white p-4 shadow-2xl">
        <h3 className="text-base font-semibold text-neutral-900">Replace image</h3>
        <p className="mt-2 text-sm text-neutral-700">Drop in a new upload or choose from assets to swap the active layer.</p>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            className="w-full rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-3 py-3 text-sm font-semibold text-neutral-700 hover:border-violet-400 hover:bg-white"
          >
            Upload new image
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-neutral-200 bg-white px-3 py-3 text-sm font-semibold text-neutral-700 hover:border-violet-400 hover:text-violet-700"
          >
            Browse assets
          </button>
        </div>
        <label className="mt-3 flex items-center justify-between text-sm">
          <span className="text-neutral-700">Retain transforms</span>
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-violet-600" />
        </label>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  );
}
