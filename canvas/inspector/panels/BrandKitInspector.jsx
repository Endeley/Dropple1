"use client";
import { useBrandKitStore } from "@/stores/useBrandKitStore";
import { useTemplateStore } from "@/stores/useTemplateStore";

export default function BrandKitInspector() {
  const brandKit = useBrandKitStore((s) => s.brandKit);
  const updateBrandKit = useBrandKitStore((s) => s.updateBrandKit);

  const applyBrandToAll = useTemplateStore((s) => s.applyBrandToAllTemplates);

  const handlePrimaryChange = (e) => {
    updateBrandKit({
      colors: { primary: e.target.value },
    });
  };

  return (
    <div className="p-4 border-l border-neutral-200 dark:border-neutral-800 h-full">
      <h3 className="font-bold text-lg mb-4">Brand Kit</h3>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1">Primary Color</span>
          <input
            type="color"
            value={brandKit.colors.primary}
            onChange={handlePrimaryChange}
            className="h-8 w-16 p-0 border rounded"
          />
        </label>

        <button
          onClick={() => applyBrandToAll(brandKit)}
          className="bg-neutral-900 dark:bg-white text-white dark:text-black px-3 py-2 rounded-md"
        >
          Apply to All Templates
        </button>
      </div>
    </div>
  );
}
