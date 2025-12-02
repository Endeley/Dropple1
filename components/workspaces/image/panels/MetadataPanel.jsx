"use client";

export default function MetadataPanel() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-neutral-900">Metadata</h4>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-neutral-600">Soon</span>
      </div>
      <div className="mt-3 space-y-2 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <span>Filename</span>
          <span className="text-neutral-500">untitled.png</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Resolution</span>
          <span className="text-neutral-500">1500 x 900</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Profile</span>
          <span className="text-neutral-500">sRGB</span>
        </div>
      </div>
    </div>
  );
}
