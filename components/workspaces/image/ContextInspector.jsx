"use client";

import { useEffect, useMemo, useState } from "react";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

const presetBackgrounds = ["#ffffff", "#f8fafc", "#0f172a", "#111827", "#f3e8ff", "#e0f2fe"];
const fontFamilies = ["Inter", "Arial", "Helvetica", "Times New Roman", "Poppins", "Roboto"];
const clamp = (val, min = -1, max = 1) => Math.min(Math.max(val, min), max);

export default function ContextInspector() {
  const selected = useImageWorkspaceStore((s) => s.selectedObject);
  const zoom = useImageWorkspaceStore((s) => s.zoom);
  const updateBackground = useImageWorkspaceStore((s) => s.updateCanvasBackground);
  const updateSelected = useImageWorkspaceStore((s) => s.updateSelectedObject);
  const activePageId = useImageWorkspaceStore((s) => s.activePageId);
  const pages = useImageWorkspaceStore((s) => s.pages);
  const activeBg = pages.find?.((p) => p.id === activePageId)?.background || "#f8fafc";
  const [bgColor, setBgColor] = useState(activeBg);
  const activeTool = useImageWorkspaceStore((s) => s.activeTool);

  useEffect(() => {
    setBgColor(activeBg);
  }, [activeBg]);

  const selectionType = useMemo(() => {
    if (!selected) return "none";
    if (selected.type === "image") return "image";
    if (["rect", "triangle", "circle", "path", "polygon"].includes(selected.type)) return "shape";
    if (["i-text", "text", "textbox"].includes(selected.type)) return "text";
    return "layer";
  }, [selected]);

  const handleBgChange = (value) => {
    setBgColor(value);
    updateBackground?.(value);
  };

  const updateNumeric = (key, value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    updateSelected?.((obj) => obj.set(key, num));
  };

  const updateFill = (color) => updateSelected?.((obj) => obj.set("fill", color));
  const updateStroke = (color) => updateSelected?.((obj) => obj.set("stroke", color));
  const updateStrokeWidth = (val) => updateNumeric("strokeWidth", val);
  const updateFontSize = (val) => updateNumeric("fontSize", val);
  const updateOpacity = (val) => updateSelected?.((obj) => obj.set("opacity", Number(val)));
  const updateRadius = (val) => {
    const num = Number(val);
    if (Number.isNaN(num)) return;
    updateSelected?.((obj) => {
      obj.rx = num;
      obj.ry = num;
    });
  };
  const updateLineHeight = (val) => updateNumeric("lineHeight", val);
  const updateFontFamily = (val) => updateSelected?.((obj) => obj.set("fontFamily", val));
  const updateFontWeight = (val) => updateSelected?.((obj) => obj.set("fontWeight", val));
  const updateTextAlign = (val) => updateSelected?.((obj) => obj.set("textAlign", val));
  const updateShadow = (color) => updateSelected?.((obj) => obj.setShadow?.({ color, blur: 8, offsetX: 2, offsetY: 2 }));
  const updateStrokeColorText = (color) => updateSelected?.((obj) => obj.set("stroke", color));
  const updateStrokeWidthText = (val) => updateNumeric("strokeWidth", val);
  const fabricModule = useImageWorkspaceStore((s) => s.fabricModule);
  const setActiveTool = useImageWorkspaceStore((s) => s.setActiveTool);
  const setCornerRadii = useImageWorkspaceStore((s) => s.setCornerRadii);

  const getFilterValue = (type) => {
    const filters = selected?.filters || [];
    const inst = filters.find((f) => f?.type === type.toUpperCase());
    if (!inst) return 0;
    if (type === "brightness") return inst.brightness || 0;
    if (type === "contrast") return inst.contrast || 0;
    if (type === "saturation") return inst.saturation || 0;
    return 0;
  };

  const applyImageFilter = (type, value) => {
    if (!selected || selected.type !== "image") return;
    const fabric = fabricModule;
    if (!fabric?.Image?.filters) return;
    const filters = [...(selected.filters || [])];
    const map = {
      brightness: fabric.Image.filters.Brightness,
      contrast: fabric.Image.filters.Contrast,
      saturation: fabric.Image.filters.Saturation,
    };
    const FilterCtor = map[type];
    if (!FilterCtor) return;
    const filteredVal = type === "saturation" ? clamp(value, -1, 1) : clamp(value, -1, 1);
    const existing = filters.findIndex((f) => f?.type === type.toUpperCase());
    const instance = new FilterCtor({ [type]: filteredVal });
    if (existing >= 0) {
      filters[existing] = instance;
    } else {
      filters.push(instance);
    }
    selected.filters = filters;
    selected.applyFilters?.();
    selected.canvas?.requestRenderAll?.();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">{selectionType === "none" ? "Canvas" : "Selection"}</h3>
          <span className="text-[11px] text-neutral-600">{Math.round(zoom * 100)}%</span>
        </div>
        {selectionType === "none" && (
          <div className="space-y-3 text-sm text-neutral-800">
            <div className="flex items-center justify-between">
              <span>Background</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => handleBgChange(e.target.value)}
                className="h-7 w-16 cursor-pointer rounded border border-neutral-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {presetBackgrounds.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleBgChange(c)}
                  className="h-7 w-7 rounded-full border border-neutral-200"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="text-xs text-neutral-500">Presets fit-to-screen; page resizing coming soon.</div>
            {activeTool === "crop" && (
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500"
                  onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))}
                >
                  Apply crop
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 shadow-sm hover:border-neutral-400"
                  onClick={() => {
                    setActiveTool("select");
                    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {selectionType === "text" && (
          <div className="space-y-3 text-sm text-neutral-800">
            <label className="flex items-center justify-between gap-2">
              <span>Font size</span>
              <input
                type="number"
                className="w-20 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={Math.round(selected?.fontSize || 16)}
                onChange={(e) => updateFontSize(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Line height</span>
              <input
                type="number"
                className="w-20 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={Number(selected?.lineHeight || 1.2)}
                step="0.05"
                onChange={(e) => updateLineHeight(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Font</span>
              <select
                className="w-32 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.fontFamily || "Inter"}
                onChange={(e) => updateFontFamily(e.target.value)}
              >
                {fontFamilies.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Weight</span>
              <select
                className="w-28 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.fontWeight || "400"}
                onChange={(e) => updateFontWeight(e.target.value)}
              >
                {[300, 400, 500, 600, 700].map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Align</span>
              <select
                className="w-28 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.textAlign || "left"}
                onChange={(e) => updateTextAlign(e.target.value)}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Color</span>
              <input
                type="color"
                className="h-7 w-16 rounded border border-neutral-200"
                value={typeof selected?.fill === "string" ? selected.fill : "#111111"}
                onChange={(e) => updateFill(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Shadow</span>
              <input
                type="color"
                className="h-7 w-16 rounded border border-neutral-200"
                value={typeof selected?.shadow === "string" ? selected.shadow : "#000000"}
                onChange={(e) => updateShadow(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Stroke</span>
              <input
                type="color"
                className="h-7 w-16 rounded border border-neutral-200"
                value={typeof selected?.stroke === "string" ? selected.stroke : "#000000"}
                onChange={(e) => updateStrokeColorText(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Stroke width</span>
              <input
                type="number"
                className="w-20 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.strokeWidth ?? 0}
                onChange={(e) => updateStrokeWidthText(e.target.value)}
              />
            </label>
          </div>
        )}

        {selectionType === "image" && (
          <div className="space-y-3 text-sm text-neutral-800">
            <label className="flex items-center justify-between gap-2">
              <span>Scale</span>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.05"
                value={Number(selected?.scaleX || 1).toFixed(2)}
                onChange={(e) => {
                  const s = Number(e.target.value);
                  updateSelected?.((obj) => {
                    obj.scaleX = s;
                    obj.scaleY = s;
                  });
                }}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Brightness</span>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.05"
                defaultValue={getFilterValue("brightness")}
                onChange={(e) => applyImageFilter("brightness", Number(e.target.value))}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Contrast</span>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.05"
                defaultValue={getFilterValue("contrast")}
                onChange={(e) => applyImageFilter("contrast", Number(e.target.value))}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Saturation</span>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.05"
                defaultValue={getFilterValue("saturation")}
                onChange={(e) => applyImageFilter("saturation", Number(e.target.value))}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Opacity</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={selected?.opacity ?? 1}
                onChange={(e) => updateOpacity(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Border radius</span>
              <input
                type="number"
                className="w-20 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.rx ?? selected?.ry ?? 0}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  updateSelected?.((obj) => {
                    obj.rx = num;
                    obj.ry = num;
                  });
                }}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Shadow</span>
              <input
                type="color"
                className="h-7 w-16 rounded border border-neutral-200"
                value={typeof selected?.shadow === "string" ? selected.shadow : "#000000"}
                onChange={(e) => updateShadow(e.target.value)}
              />
            </label>
          </div>
        )}

        {selectionType === "shape" && (
          <div className="space-y-3 text-sm text-neutral-800">
            <label className="flex items-center justify-between gap-2">
              <span>Fill</span>
              <input
                type="color"
                className="h-7 w-16 rounded border border-neutral-200"
                value={typeof selected?.fill === "string" ? selected.fill : "#4338ca"}
                onChange={(e) => updateFill(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Stroke</span>
              <input
                type="color"
                className="h-7 w-16 rounded border border-neutral-200"
                value={typeof selected?.stroke === "string" ? selected.stroke : "#111111"}
                onChange={(e) => updateStroke(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Stroke width</span>
              <input
                type="number"
                className="w-20 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.strokeWidth ?? 1}
                onChange={(e) => updateStrokeWidth(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Corner radius</span>
              <input
                type="number"
                className="w-20 rounded border border-neutral-200 px-2 py-1 text-xs"
                value={selected?.rx ?? 0}
                onChange={(e) => updateRadius(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-neutral-600">Per-corner (tl,tr,br,bl)</span>
              <input
                type="text"
                className="rounded border border-neutral-200 px-2 py-1 text-xs"
                placeholder="8,8,8,8"
                onBlur={(e) => {
                  const parts = e.target.value.split(",").map((n) => Number(n.trim()) || 0);
                  if (parts.length === 4) {
                    setCornerRadii?.({
                      tl: parts[0],
                      tr: parts[1],
                      br: parts[2],
                      bl: parts[3],
                    });
                  }
                }}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Opacity</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={selected?.opacity ?? 1}
                onChange={(e) => updateOpacity(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>Per-corner radius</span>
              <input
                type="text"
                className="w-28 rounded border border-neutral-200 px-2 py-1 text-xs"
                placeholder="tl,tr,br,bl"
                onBlur={(e) => {
                  const parts = e.target.value.split(",").map((n) => Number(n.trim()) || 0);
                  if (parts.length === 4) {
                    updateSelected?.((obj) => {
                      obj.rx = parts[0];
                      obj.ry = parts[1];
                    });
                  }
                }}
              />
            </label>
          </div>
        )}

        {selectionType === "layer" && (
          <div className="text-sm text-neutral-600">Layer properties coming soon.</div>
        )}
      </div>
    </div>
  );
}
