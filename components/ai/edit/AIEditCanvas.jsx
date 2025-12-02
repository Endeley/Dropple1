"use client";

import { useEffect, useState } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";
import AIEditMaskLayer from "./AIEditMaskLayer";
import AIEditToolbar from "./AIEditToolbar";

export default function AIEditCanvas() {
  const selectedResult = useAIStudioStore((s) => s.selectedResult);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedResult) {
      setImage(selectedResult);
    }
  }, [selectedResult]);

  if (!image) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Drop or generate an image to begin editing.
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img src={image} className="max-w-full max-h-full rounded-xl" alt="editable" />
      <AIEditMaskLayer />
      <AIEditToolbar />
    </div>
  );
}
