"use client";

import { useRef } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function MockupDesignUploader() {
  const uploadedDesign = useAIStudioStore((s) => s.uploadedDesign);
  const setUploadedDesign = useAIStudioStore((s) => s.setUploadedDesign);
  const inputRef = useRef(null);

  return (
    <div className="space-y-2">
      <p className="text-sm text-white/80">Upload Your Design</p>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full h-28 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-xs text-white/60 cursor-pointer hover:bg-white/[0.1]"
      >
        {uploadedDesign ? uploadedDesign.name : "Click to upload PNG, SVG, JPG"}
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*, .svg"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) setUploadedDesign(file);
        }}
      />
    </div>
  );
}
