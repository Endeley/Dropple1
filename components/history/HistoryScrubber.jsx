"use client";

import { useHistoryStore } from "@/stores/useHistoryStore";
import { useState, useRef, useEffect } from "react";
import { useScrubMomentum } from "@/canvas/core/history/useScrubMomentum";

export default function HistoryScrubber() {
  const past = useHistoryStore((state) => state.past);
  const isPreviewing = useHistoryStore((state) => state.isPreviewing);
  const previewIndex = useHistoryStore((state) => state.previewIndex);
  const previewScrubT = useHistoryStore((state) => state.previewScrubT);
  const startPreview = useHistoryStore((state) => state.startPreview);
  const stopPreview = useHistoryStore((state) => state.stopPreview);
  const setPreviewIndex = useHistoryStore((state) => state.setPreviewIndex);
  const setScrubT = useHistoryStore((state) => state.setScrubT);
  const [hoverIndex, setHoverIndex] = useState(null);
  const sliderRef = useRef(null);
  const scrubValueRef = useRef(0);

  if (!past.length) return null;

  const sliderValue =
    previewIndex !== null
      ? previewIndex + (previewScrubT || 0)
      : Math.max(0, past.length - 1);
  useEffect(() => {
    scrubValueRef.current = sliderValue;
  }, [sliderValue]);

  const hoveredSnapshot =
    hoverIndex !== null && hoverIndex >= 0 && hoverIndex < past.length
      ? past[hoverIndex]
      : null;
  const hoveredThumbnail = hoveredSnapshot?.meta?.thumbnail;

  const maxValue = Math.max(0, past.length - 1);

  const applyScrubValue = (value) => {
    const clamped = Math.min(Math.max(value, 0), maxValue);
    const baseIndex = Math.min(Math.max(0, Math.floor(clamped)), maxValue);
    const fractional = baseIndex >= maxValue ? 0 : Number((clamped - baseIndex).toFixed(4));
    setPreviewIndex(baseIndex);
    setScrubT(fractional);
    scrubValueRef.current = clamped;
    return clamped;
  };

  const snapToNearest = () => {
    const current = scrubValueRef.current || 0;
    applyScrubValue(Math.round(current));
  };

  const momentum = useScrubMomentum({
    getValue: () => scrubValueRef.current || 0,
    setValue: applyScrubValue,
    min: 0,
    max: maxValue,
    onRest: snapToNearest,
  });

  const handleSliderUpdate = (event) => {
    const rawValue = Number(event.target.value);
    const clamped = applyScrubValue(rawValue);
    momentum.recordValue(clamped);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[5500] flex flex-col items-center gap-2">
      {isPreviewing && hoveredThumbnail && (
        <div className="absolute -top-44 flex flex-col items-center gap-1">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl">
            <img src={hoveredThumbnail} alt="Snapshot preview" className="w-40 h-auto rounded-t-lg" />
          </div>
          <div className="text-[11px] opacity-70 bg-black/60 text-white px-2 py-0.5 rounded">
            {hoveredSnapshot?.meta?.label || "Snapshot"}
          </div>
        </div>
      )}
      <div className="flex gap-2">
        {!isPreviewing ? (
          <button
            className="px-3 py-1 rounded bg-black text-white text-xs uppercase tracking-wide"
            onClick={startPreview}
          >
            Time Travel
          </button>
        ) : (
          <button
            className="px-3 py-1 rounded bg-red-600 text-white text-xs uppercase tracking-wide"
            onClick={stopPreview}
          >
            Back to Live
          </button>
        )}
      </div>
      {isPreviewing && (
        <input
          type="range"
          min={0}
          max={Math.max(0, past.length - 1)}
          step={0.001}
          value={sliderValue}
          onChange={handleSliderUpdate}
          onPointerMove={(event) =>
            setHoverIndex(
              Math.min(
                past.length - 1,
                Math.max(0, Math.round(Number(event.target.value)))
              )
            )
          }
          onPointerLeave={() => setHoverIndex(null)}
          className="w-[600px]"
          ref={sliderRef}
          onInput={handleSliderUpdate}
          onPointerDown={() => {
            momentum.onScrubStart();
            momentum.recordValue(scrubValueRef.current || 0);
          }}
          onPointerUp={() => momentum.onScrubEnd()}
          onPointerCancel={() => momentum.onScrubEnd()}
        />
      )}
    </div>
  );
}
