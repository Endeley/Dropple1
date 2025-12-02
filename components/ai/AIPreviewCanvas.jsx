"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";
import { aiModeConfig } from "@/lib/constants/aiModes";
import AIResultsGrid from "./AIResultsGrid";
import AIEditCanvas from "./edit/AIEditCanvas";
import VideoPreview from "./video/VideoPreview";
import AudioPreview from "./audio/AudioPreview";
import TemplatePreview from "./template/TemplatePreview";

export default function AIPreviewCanvas() {
  const { mode, isGenerating, selectedResult } = useAIStudioStore();

  const config = aiModeConfig[mode];

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    console.log("Dropped:", file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const renderPreviewContent = () => {
    if (mode === "edit" && selectedResult) {
      return <AIEditCanvas />;
    }

    if (mode === "video") {
      return <VideoPreview />;
    }

    if (mode === "audio") {
      return <AudioPreview />;
    }

    if (mode === "template") {
      return <TemplatePreview />;
    }

    return (
      <AnimatePresence mode="wait">
        {isGenerating && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-gray-300"
          >
            <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            <p className="text-sm">AI is generating…</p>
          </motion.div>
        )}

        {!isGenerating && selectedResult && (
          <motion.img
            key="result"
            src={selectedResult}
            className="max-w-full max-h-full rounded-xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {!isGenerating && !selectedResult && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-gray-400 text-center p-4 space-y-3"
          >
            <p className="text-xl font-semibold">{config?.name}</p>

            {mode === "image" && <p>Enter a prompt on the right or drop an image here.</p>}

            {mode === "edit" && <p>Use the brush to select areas to remove or replace.</p>}

            {mode === "bg" && <p>Upload an image to remove or replace its background.</p>}

            {mode === "mockup" && <p>Upload your design or enter a prompt to generate mockups.</p>}

            {mode === "text" && <p>Describe the text you want to generate.</p>}

            {mode === "video" && <p>Upload or generate an image to animate.</p>}

            {mode === "audio" && <p>Enter a script or upload audio to enhance.</p>}

            <div className="text-sm opacity-60">Or drag & drop files here</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div
      className="w-full h-full relative bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-4 flex flex-col overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex-1 relative rounded-xl border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden">
        {renderPreviewContent()}
      </div>

      <div className="mt-4">
        <AIResultsGrid />
      </div>
    </div>
  );
}
