"use client";

import { useState } from "react";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";
import AIReplacePrompt from "./AIReplacePrompt";

const getBlobFromCanvas = (canvas) =>
  new Promise((resolve) => {
    if (!canvas) return resolve(null);
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });

const dataUrlToBlob = async (url) => {
  const res = await fetch(url);
  return res.blob();
};

export default function AIEditToolbar() {
  const {
    brushSize,
    setBrushSize,
    editMode,
    setEditMode,
    maskCanvas,
    selectedResult,
    addHistory,
    setSelectedResult,
  } = useAIStudioStore((s) => ({
    brushSize: s.brushSize,
    setBrushSize: s.setBrushSize,
    editMode: s.editMode,
    setEditMode: s.setEditMode,
    maskCanvas: s.maskCanvas,
    selectedResult: s.selectedResult,
    addHistory: s.addHistory,
    setSelectedResult: s.setSelectedResult,
  }));

  const [replacePrompt, setReplacePrompt] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const applyEdit = async () => {
    if (!selectedResult || !maskCanvas) {
      console.warn("Smart edit: missing base image or mask");
      return;
    }

    setIsApplying(true);
    try {
      const [imageBlob, maskBlob] = await Promise.all([
        dataUrlToBlob(selectedResult),
        getBlobFromCanvas(maskCanvas),
      ]);

      const form = new FormData();
      form.append("image", imageBlob || new Blob(), "image.png");
      form.append("mask", maskBlob || new Blob(), "mask.png");

      let endpoint = "/api/ai/edit/remove";
      if (editMode === "replace") {
        endpoint = "/api/ai/edit/replace";
        form.append("prompt", replacePrompt);
      }
      if (editMode === "fill") {
        endpoint = "/api/ai/edit/inpaint";
      }

      const res = await fetch(endpoint, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Edit failed");
      }

      const resultImage =
        data?.image ||
        data?.result ||
        data?.output?.[0] ||
        data?.predictions?.[0]?.output?.[0];

      if (resultImage) {
        const formatted = resultImage.startsWith("data:")
          ? resultImage
          : `data:image/png;base64,${resultImage}`;
        addHistory({
          result: formatted,
          mode: "edit",
          prompt: replacePrompt,
          date: new Date(),
        });
        setSelectedResult(formatted);
        const ctx = maskCanvas.getContext("2d");
        ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      }
    } catch (error) {
      console.error("Apply edit failed", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col gap-3 w-48 text-sm">
      <div className="flex flex-col gap-2">
        {[
          { id: "remove", label: "Remove" },
          { id: "replace", label: "Replace" },
          { id: "fill", label: "Fill" },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setEditMode(tool.id)}
            className={`px-3 py-1 rounded transition ${
              editMode === tool.id
                ? "bg-violet-600 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {editMode === "replace" && (
        <AIReplacePrompt value={replacePrompt} onChange={setReplacePrompt} />
      )}

      <div>
        <label className="text-xs text-gray-300">
          Brush Size ({brushSize})
        </label>
        <input
          type="range"
          min="5"
          max="120"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
          className="w-full accent-violet-500"
        />
      </div>

      <button
        onClick={applyEdit}
        disabled={isApplying}
        className="mt-1 px-3 py-2 bg-violet-600 rounded-xl disabled:opacity-40"
      >
        {isApplying ? "Applying…" : "Apply Edit"}
      </button>
    </div>
  );
}
