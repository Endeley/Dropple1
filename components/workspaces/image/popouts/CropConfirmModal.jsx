"use client";

export default function CropConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[320px] rounded-lg border border-neutral-200 bg-white p-4 shadow-2xl">
        <h3 className="text-base font-semibold text-neutral-900">Apply crop?</h3>
        <p className="mt-2 text-sm text-neutral-700">Confirm the crop region. You can undo from the history panel.</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-neutral-700">Reset crop</span>
          <button
            type="button"
            className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
            onClick={() => onCancel()}
          >
            Reset
          </button>
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
            Apply crop
          </button>
        </div>
      </div>
    </div>
  );
}
