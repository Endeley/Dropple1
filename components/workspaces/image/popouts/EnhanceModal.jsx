"use client";

export default function EnhanceModal({ onConfirm, onCancel }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[360px] rounded-lg border border-neutral-200 bg-white p-4 shadow-2xl">
        <h3 className="text-base font-semibold text-neutral-900">AI Quick Enhance</h3>
        <p className="mt-2 text-sm text-neutral-700">Preview before/after, then apply balanced exposure and detail lift.</p>
        <div className="mt-3 space-y-2 text-sm">
          <label className="flex items-center justify-between">
            <span>Strength</span>
            <input type="range" min={0} max={100} defaultValue={65} className="w-40 accent-violet-500" />
          </label>
          <label className="flex items-center justify-between">
            <span>Preserve skin</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-violet-600" />
          </label>
          <label className="flex items-center justify-between">
            <span>Before / After</span>
            <input type="range" min={0} max={100} defaultValue={50} className="w-40 accent-violet-500" />
          </label>
        </div>
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
            Enhance
          </button>
        </div>
      </div>
    </div>
  );
}
