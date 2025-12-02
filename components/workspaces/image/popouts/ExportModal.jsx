"use client";

import { useState } from "react";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function ExportModal({ onConfirm, onCancel }) {
  const exportImage = useImageWorkspaceStore((s) => s.exportImage);
  const exportPDF = useImageWorkspaceStore((s) => s.exportPDF);
  const exportAllPages = useImageWorkspaceStore((s) => s.exportAllPages);

  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.9);
  const [multiplier, setMultiplier] = useState(2);
  const [transparent, setTransparent] = useState(false);
  const [name, setName] = useState("dropple-export");
  const [working, setWorking] = useState(false);
  const [batch, setBatch] = useState(false);

  const handleExport = async () => {
    try {
      setWorking(true);
      if (format === "pdf") {
        await exportPDF({ multiplier, filename: name });
        onConfirm?.();
        return;
      }
      const res = await exportImage({
        format,
        quality,
        multiplier,
        transparent,
        filename: name || "dropple-export",
      });
      if (res?.url) {
        const link = document.createElement("a");
        link.href = res.url;
        link.download = res.filename || `dropple-export.${format}`;
        link.click();
        res.revoke?.();
      }
      if (batch) {
        const all = await exportAllPages({
          format,
          quality,
          multiplier,
          transparent,
          filename: name || "dropple-export",
        });
        all?.forEach((item) => {
          const link = document.createElement("a");
          link.href = item.url;
          link.download = item.filename || `dropple-export.${format}`;
          link.click();
          item.revoke?.();
        });
      }
      onConfirm?.();
    } finally {
      setWorking(false);
    }
  };

  const showQuality = format === "jpg" || format === "webp";
  const allowTransparent = format === "png";

  return (
    <div>
      <h2 className="nw-modal-title">Export Image</h2>

      <div className="nw-field">
        <label>Filename</label>
        <input
          type="text"
          className="nw-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="dropple-export"
        />
      </div>

      <div className="nw-field">
        <label>Format</label>
        <select className="nw-select" value={format} onChange={(e) => setFormat(e.target.value.toLowerCase())}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
          <option value="svg">SVG</option>
          <option value="pdf">PDF</option>
        </select>
      </div>

      {showQuality && (
        <div className="nw-field">
          <label>Quality ({Math.round(quality * 100)}%)</label>
          <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="nw-slider" />
        </div>
      )}

      {allowTransparent && (
        <div className="nw-field">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={transparent} onChange={() => setTransparent(!transparent)} />
            Transparent background
          </label>
        </div>
      )}

      {format !== "svg" && format !== "pdf" && (
        <div className="nw-field">
          <label>Resolution</label>
          <select className="nw-select" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))}>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
            <option value={4}>4×</option>
          </select>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
          onClick={handleExport}
          disabled={working}
        >
          {working ? "Exporting..." : "Download"}
        </button>
        <button
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-400"
          onClick={onCancel}
          disabled={working}
        >
          Cancel
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={batch} onChange={() => setBatch(!batch)} id="batchExport" />
        <label htmlFor="batchExport">Export all pages</label>
      </div>
    </div>
  );
}
