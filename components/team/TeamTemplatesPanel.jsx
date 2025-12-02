"use client";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function TeamTemplatesPanel() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Team Templates</h3>
        <button className="rounded border border-neutral-300 px-3 py-1 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700">
          Submit Template
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Team template preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-24 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview shared templates on your Dropple UI background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Publish and manage team templates with locked brand elements, categories, and shared brand kits. Roles: Admin
        (publish/lock), Designer (submit), Member (use).
      </p>
    </div>
  );
}
