"use client";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function CollabPreviewPanel() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Multi-User Cursor Chat</h3>
      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Collab preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-24 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 px-4 text-center text-[11px] font-semibold text-white">
          Preview cursors, chat bubbles, and comment pins on your template background.
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Real-time cursors, chat, and comment pins will sync via Convex tables (cursors, comments, presence). This panel
        previews how collaboration overlays sit on your design.
      </p>
    </div>
  );
}
