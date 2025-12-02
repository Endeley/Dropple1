import { create } from "zustand";

const defaultAdjustments = {
  brightness: 0,
  contrast: 0,
  exposure: 0,
  highlights: 0,
  shadows: 0,
  saturation: 0,
  vibrance: 0,
  temperature: 0,
  tint: 0,
};

const defaultEffects = {
  blur: 0,
  vignette: 0,
  grain: 0,
};

const defaultBrush = {
  size: 16,
  hardness: 0.5,
  opacity: 1,
};

const defaultMask = {
  feather: 20,
  refine: 35,
  preview: true,
};

const defaultTransform = {
  rotate: 0,
  scale: 1,
  flipX: false,
  flipY: false,
};

const defaultFilters = {
  preset: "none",
  intensity: 50,
  tint: 0,
  fade: 20,
  grain: 0,
  mix: 50,
};

const defaultAssets = [
  {
    id: "asset-sample-1",
    name: "Sample Gradient",
    src: "https://via.placeholder.com/320x200/7c3aed/ffffff?text=Gradient",
    kind: "image",
    category: "elements",
  },
  {
    id: "asset-sample-2",
    name: "Poster Template",
    src: "https://via.placeholder.com/320x200/f97316/ffffff?text=Template",
    kind: "template",
    category: "templates",
  },
  {
    id: "asset-sample-3",
    name: "Brand Cover",
    src: "https://via.placeholder.com/320x200/0ea5e9/ffffff?text=Brand",
    kind: "brand",
    category: "brand",
  },
  {
    id: "asset-sample-4",
    name: "Icon Grid",
    src: "https://via.placeholder.com/320x200/16a34a/ffffff?text=Element",
    kind: "image",
    category: "elements",
  },
];

const createPage = (idx = 1) => ({
  id: `page-${Date.now()}-${idx}`,
  name: `Page ${idx}`,
  data: null,
  thumbnail: null,
  background: "#f1f3f7",
  width: null,
  height: null,
});

export const useImageWorkspaceStore = create((set) => ({
  canvas: null,
  canvasContainer: null,
  assets: defaultAssets,
  selectedObject: null,
  showGrid: false,
  gridSize: 16,
  snapToGrid: false,
  showSafeGuides: false,
  bleedPercent: 0.05,
  fabricModule: null,
  brushSettings: { size: 20, opacity: 1 },
  aiBusy: false,
  assetsPersisted: false,
  saveStatus: "saved",
  lastSavedAt: null,
  activeTool: "select",
  zoom: 1,
  beforeAfter: false,
  adjustments: defaultAdjustments,
  effects: defaultEffects,
  brush: defaultBrush,
  mask: defaultMask,
  transform: defaultTransform,
  filters: defaultFilters,
  pages: [createPage(1)],
  activePageId: null,

  // UI toggles
  cropSlideout: false,
  filterSlideout: false,
  brushSlideout: false,
  showBgRemoveConfirm: false,
  showMaskInvertConfirm: false,
  assetBrowserOpen: false,
  filterBrowserOpen: false,
  effectBrowserOpen: false,
  templatesBrowserOpen: false,
  stylesSlideoutOpen: false,
  presetsSlideoutOpen: false,
  showExportModal: false,
  showEnhanceModal: false,
  showReplaceModal: false,
  showCropConfirm: false,
  maskSlideoutOpen: false,
  filterSettingsOpen: false,
  aiSettingsOpen: false,

  setCanvasInstance: (canvas) =>
    set((state) => ({
      canvas,
      // initialize active page if missing
      activePageId: state.activePageId || state.pages?.[0]?.id || null,
    })),

  setCanvasContainer: (el) => set({ canvasContainer: el }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setGridSize: (value) => set({ gridSize: Math.max(4, Number(value) || 8) }),
  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  toggleSafeGuides: () => set((state) => ({ showSafeGuides: !state.showSafeGuides })),
  setBleedPercent: (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    set({ bleedPercent: Math.min(Math.max(num, 0), 0.2) });
  },
  setFabricModule: (fabric) => set({ fabricModule: fabric }),
  setBrushSetting: (key, value) =>
    set((state) => ({
      brushSettings: { ...(state.brushSettings || { size: 20, opacity: 1 }), [key]: value },
    })),
  clearMaskSelected: () => {
    const obj = useImageWorkspaceStore.getState().selectedObject;
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!obj || obj.type !== "image" || !canvas) return;
    obj.clipPath = null;
    canvas.requestRenderAll?.();
  },
  invertMaskSelected: () => {
    const obj = useImageWorkspaceStore.getState().selectedObject;
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!obj || obj.type !== "image" || !canvas || !obj.clipPath) return;
    obj.clipPath.inverted = !obj.clipPath.inverted;
    canvas.requestRenderAll?.();
  },
  setCornerRadii: (corners) => {
    const obj = useImageWorkspaceStore.getState().selectedObject;
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!obj || obj.type !== "rect" || !canvas) return;
    const normalized = {
      tl: Math.max(0, Number(corners.tl) || 0),
      tr: Math.max(0, Number(corners.tr) || 0),
      br: Math.max(0, Number(corners.br) || 0),
      bl: Math.max(0, Number(corners.bl) || 0),
    };
    obj.cornerRadii = normalized;
    obj.rx = 0;
    obj.ry = 0;
    obj._render = function renderRounded(ctx) {
      const w = this.width;
      const h = this.height;
      const r = this.cornerRadii || normalized;
      ctx.beginPath();
      ctx.moveTo(r.tl, 0);
      ctx.lineTo(w - r.tr, 0);
      ctx.quadraticCurveTo(w, 0, w, r.tr);
      ctx.lineTo(w, h - r.br);
      ctx.quadraticCurveTo(w, h, w - r.br, h);
      ctx.lineTo(r.bl, h);
      ctx.quadraticCurveTo(0, h, 0, h - r.bl);
      ctx.lineTo(0, r.tl);
      ctx.quadraticCurveTo(0, 0, r.tl, 0);
      ctx.closePath();
      this._renderFill(ctx);
      this._renderStroke(ctx);
    };
    obj.dirty = true;
    obj.setCoords?.();
    canvas.requestRenderAll?.();
  },

  persistAssetsBackend: async (assets) => {
    try {
      const res = await fetch("/api/assets/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assets }),
      });
      if (res.ok) {
        set({ assetsPersisted: true });
      }
    } catch (err) {
      console.warn("Asset save failed, using local fallback", err);
    }
  },

  loadAssetsBackend: async () => {
    try {
      const res = await fetch("/api/assets/list");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json?.assets)) {
          set({ assets: json.assets, assetsPersisted: true });
          return true;
        }
      }
    } catch (err) {
      console.warn("Asset load failed, using local fallback", err);
    }
    return false;
  },
  setSaveStatus: (status) => set({ saveStatus: status }),
  setActiveTool: (activeTool) => set({ activeTool }),

  setSelectedObject: (obj) => set({ selectedObject: obj || null }),

  addAsset: (asset) =>
    set((state) => {
      const next = [...(state.assets || []), { id: `asset-${Date.now()}`, ...asset }];
      try {
        localStorage.setItem("dropple-image-assets", JSON.stringify(next));
        useImageWorkspaceStore.getState().persistAssetsBackend(next);
      } catch {}
      return { assets: next };
    }),

  addAssetFromFile: async (file) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    const name = file.name || "Uploaded image";
    const asset = { id: `asset-${Date.now()}`, src: url, name, kind: "image", category: "uploads" };
    set((state) => {
      const next = [...(state.assets || []), asset];
      try {
        localStorage.setItem("dropple-image-assets", JSON.stringify(next));
        useImageWorkspaceStore.getState().persistAssetsBackend(next);
      } catch {}
      return { assets: next };
    });
    return asset;
  },

  hydrateAssets: () => {
    useImageWorkspaceStore
      .getState()
      .loadAssetsBackend()
      .then((ok) => {
        if (ok) return;
        try {
          const raw = localStorage.getItem("dropple-image-assets");
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            set({ assets: parsed });
          }
        } catch {
          // ignore
        }
      });
  },

  setZoom: (zoom) => set({ zoom }),

  toggleBeforeAfter: () => set((state) => ({ beforeAfter: !state.beforeAfter })),

  setAdjustment: (key, value) =>
    set((state) => ({
      adjustments: { ...state.adjustments, [key]: value },
    })),

  setEffect: (key, value) =>
    set((state) => ({
      effects: { ...state.effects, [key]: value },
    })),

  setBrush: (key, value) =>
    set((state) => ({
      brush: { ...state.brush, [key]: value },
    })),

  setMask: (key, value) =>
    set((state) => ({
      mask: { ...state.mask, [key]: value },
    })),

  setTransform: (key, value) =>
    set((state) => ({
      transform: { ...state.transform, [key]: value },
    })),

  setFilters: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetAdjustments: () =>
    set({
      adjustments: defaultAdjustments,
      effects: defaultEffects,
      filters: defaultFilters,
      transform: defaultTransform,
    }),

  toggleCropSlideout: () => set((s) => ({ cropSlideout: !s.cropSlideout })),
  toggleFilterSlideout: () => set((s) => ({ filterSlideout: !s.filterSlideout })),
  toggleBrushSlideout: () => set((s) => ({ brushSlideout: !s.brushSlideout })),
  setBgRemoveConfirm: (visible) => set({ showBgRemoveConfirm: visible }),
  setMaskInvertConfirm: (visible) => set({ showMaskInvertConfirm: visible }),
  toggleAssetBrowser: () =>
    set((s) => ({
      assetBrowserOpen: !s.assetBrowserOpen,
      filterBrowserOpen: false,
      stylesSlideoutOpen: false,
      presetsSlideoutOpen: false,
    })),
  toggleFilterBrowser: () =>
    set((s) => ({
      filterBrowserOpen: !s.filterBrowserOpen,
      assetBrowserOpen: false,
      stylesSlideoutOpen: false,
      presetsSlideoutOpen: false,
    })),
  toggleEffectBrowser: () =>
    set((s) => ({
      effectBrowserOpen: !s.effectBrowserOpen,
      assetBrowserOpen: false,
      filterBrowserOpen: false,
      templatesBrowserOpen: false,
      stylesSlideoutOpen: false,
      presetsSlideoutOpen: false,
    })),
  toggleTemplatesBrowser: () =>
    set((s) => ({
      templatesBrowserOpen: !s.templatesBrowserOpen,
      assetBrowserOpen: false,
      filterBrowserOpen: false,
      effectBrowserOpen: false,
      stylesSlideoutOpen: false,
      presetsSlideoutOpen: false,
    })),
  toggleStylesSlideout: () =>
    set((s) => ({
      stylesSlideoutOpen: !s.stylesSlideoutOpen,
      assetBrowserOpen: false,
      filterBrowserOpen: false,
      presetsSlideoutOpen: false,
    })),
  togglePresetSlideout: () =>
    set((s) => ({
      presetsSlideoutOpen: !s.presetsSlideoutOpen,
      assetBrowserOpen: false,
      filterBrowserOpen: false,
      stylesSlideoutOpen: false,
    })),
  setExportModal: (visible) => set({ showExportModal: visible }),
  setEnhanceModal: (visible) => set({ showEnhanceModal: visible }),
  setReplaceModal: (visible) => set({ showReplaceModal: visible }),
  setCropConfirm: (visible) => set({ showCropConfirm: visible }),
  setMaskSlideout: (visible) =>
    set((s) => ({
      maskSlideoutOpen: visible,
      filterSettingsOpen: visible ? false : s.filterSettingsOpen,
      aiSettingsOpen: visible ? false : s.aiSettingsOpen,
    })),
  setFilterSettings: (visible) =>
    set((s) => ({
      filterSettingsOpen: visible,
      maskSlideoutOpen: visible ? false : s.maskSlideoutOpen,
      aiSettingsOpen: visible ? false : s.aiSettingsOpen,
    })),
  setAiSettings: (visible) =>
    set((s) => ({
      aiSettingsOpen: visible,
      maskSlideoutOpen: visible ? false : s.maskSlideoutOpen,
      filterSettingsOpen: visible ? false : s.filterSettingsOpen,
    })),

  saveActivePageSnapshot: () => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const activePageId = useImageWorkspaceStore.getState().activePageId;
    if (!canvas || !activePageId) return;

    let thumbnail = null;
    try {
      thumbnail = canvas.toDataURL({ format: "png", multiplier: 0.25 });
    } catch (err) {
      // ignore thumbnail failure
    }

    const data = canvas.toJSON(["id", "name", "layerId"]);
    const width = canvas.getWidth?.() || null;
    const height = canvas.getHeight?.() || null;

    set((state) => ({
      pages: (state.pages || []).map((p) =>
        p.id === activePageId ? { ...p, data, thumbnail, width, height } : p
      ),
    }));
  },

  loadPageToCanvas: (pageId) => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const page = useImageWorkspaceStore.getState().pages.find((p) => p.id === pageId);
    if (!canvas || !page) return;

    canvas.clear();
    canvas.backgroundColor = page.background || "#f1f3f7";

    if (page.data) {
      canvas.loadFromJSON(page.data, () => {
        canvas.renderAll?.();
      });
    } else {
      canvas.requestRenderAll?.();
    }

    set({ activePageId: pageId, selectedObject: null });
  },

  loadActivePageCanvas: () => {
    const activePageId = useImageWorkspaceStore.getState().activePageId;
    if (activePageId) {
      useImageWorkspaceStore.getState().loadPageToCanvas(activePageId);
    } else {
      const first = useImageWorkspaceStore.getState().pages?.[0];
      if (first) {
        useImageWorkspaceStore.getState().loadPageToCanvas(first.id);
      }
    }
  },

  addPage: () => {
    const state = useImageWorkspaceStore.getState();
    const idx = (state.pages?.length || 0) + 1;
    const newPage = createPage(idx);
    state.saveActivePageSnapshot();
    set((prev) => ({
      pages: [...(prev.pages || []), newPage],
      activePageId: newPage.id,
    }));
    // render new blank page
    setTimeout(() => {
      useImageWorkspaceStore.getState().loadPageToCanvas(newPage.id);
    }, 0);
  },

  duplicatePage: (pageId) => {
    const state = useImageWorkspaceStore.getState();
    const page = (state.pages || []).find((p) => p.id === pageId);
    if (!page) return;
    state.saveActivePageSnapshot();
    const dup = {
      ...page,
      id: `page-${Date.now()}`,
      name: `${page.name} Copy`,
    };
    set((prev) => ({
      pages: [...(prev.pages || []), dup],
      activePageId: dup.id,
    }));
    setTimeout(() => {
      useImageWorkspaceStore.getState().loadPageToCanvas(dup.id);
    }, 0);
  },

  deletePage: (pageId) => {
    const state = useImageWorkspaceStore.getState();
    const pages = state.pages || [];
    if (pages.length <= 1) return;
    state.saveActivePageSnapshot();
    const filtered = pages.filter((p) => p.id !== pageId);
    const nextActive = filtered[0]?.id || null;
    set({
      pages: filtered,
      activePageId: nextActive,
    });
    if (nextActive) {
      setTimeout(() => {
        useImageWorkspaceStore.getState().loadPageToCanvas(nextActive);
      }, 0);
    }
  },

  switchPage: (pageId) => {
    const state = useImageWorkspaceStore.getState();
    if (!pageId || state.activePageId === pageId) return;
    state.saveActivePageSnapshot();
    state.loadPageToCanvas(pageId);
  },

  autosaveNow: async () => {
    const doSave = async () => {
      useImageWorkspaceStore.getState().setSaveStatus("saving");
      useImageWorkspaceStore.getState().saveActivePageSnapshot();
      set({ saveStatus: "saved", lastSavedAt: Date.now() });
    };
    return doSave();
  },

  exportImage: async (options = {}) => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!canvas) return null;
    const {
      format = "png",
      quality = 1,
      multiplier = 1,
      transparent = false,
      filename = "dropple-export",
    } = options;

    const fmt = String(format).toLowerCase();

    if (fmt === "pdf") {
      await useImageWorkspaceStore.getState().exportPDF({ multiplier, filename });
      return null;
    }

    if (fmt === "svg") {
      const svg = canvas.toSVG();
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      return { url, filename: `${filename}.svg`, revoke: () => URL.revokeObjectURL(url) };
    }

    const finalFormat = fmt === "jpg" ? "jpeg" : fmt;
    const originalBg = canvas.backgroundColor;
    if (transparent && fmt === "png") {
      canvas.setBackgroundColor(null);
    }
    const dataURL = canvas.toDataURL({
      format: finalFormat,
      quality,
      multiplier,
      enableRetinaScaling: true,
      propertiesToInclude: [
        "selectable",
        "hasControls",
        "id",
        "name",
        "locked",
        "visible",
        "globalCompositeOperation",
      ],
    });
    if (transparent && fmt === "png") {
      canvas.setBackgroundColor(originalBg);
    }
    return { url: dataURL, filename: `${filename}.${fmt === "jpeg" ? "jpg" : fmt}` };
  },

  exportPDF: async (options = {}) => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!canvas || typeof window === "undefined") return;
    const { multiplier = 1, filename = "dropple-export" } = options;
    const dataURL = canvas.toDataURL({
        format: "png",
        multiplier,
        enableRetinaScaling: true,
    });
    const jsPDF = (await import("jspdf")).jsPDF;
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.getWidth?.() || 800, canvas.getHeight?.() || 600],
    });
    pdf.addImage(
        dataURL,
        "PNG",
        0,
        0,
        canvas.getWidth?.() || 800,
        canvas.getHeight?.() || 600
    );
    pdf.save(`${filename}.pdf`);
  },

  applyAITransform: async (kind = "enhance") => {
    const obj = useImageWorkspaceStore.getState().selectedObject;
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!obj || obj.type !== "image" || !canvas) return;
    set({ aiBusy: true });
    try {
      // Stub: in real use, POST to /api/ai/{kind} with image dataURL
      const dataURL = obj.toDataURL?.() || canvas.toDataURL({ format: "png", multiplier: 1 });
      const res = await fetch(`/api/ai/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataURL, kind }),
      }).catch(() => null);
      let url = null;
      if (res && res.ok) {
        const json = await res.json().catch(() => ({}));
        url = json?.url || json?.image || json?.result || null;
      }
      // Fallback: reuse original image to avoid no-op UI
      if (!url) url = dataURL;
      await new Promise((resolve) => {
        obj.setSrc?.(url, () => {
          obj.dirty = true;
          obj.setCoords?.();
          canvas.requestRenderAll?.();
          resolve();
        });
      });
    } catch (err) {
      console.error("AI transform failed", err);
    } finally {
      set({ aiBusy: false });
    }
  },

  exportAllPages: async (options = {}) => {
    const { format = "png", quality = 1, multiplier = 1, transparent = false, filename = "dropple-export" } = options;
    const state = useImageWorkspaceStore.getState();
    const canvas = state.canvas;
    const pages = state.pages || [];
    const active = state.activePageId;
    const results = [];
    if (!canvas) return results;
    state.saveActivePageSnapshot();
    for (const page of pages) {
      state.loadPageToCanvas(page.id);
      const res = await state.exportImage({
        format,
        quality,
        multiplier,
        transparent,
        filename: `${filename}-${page.name || page.id}`,
      });
      if (res) results.push(res);
    }
    if (active) {
      state.loadPageToCanvas(active);
    }
    return results;
  },

  updateCanvasBackground: (color) => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const activePageId = useImageWorkspaceStore.getState().activePageId;
    if (canvas && color) {
      canvas.backgroundColor = color;
      canvas.renderAll?.();
    }
    if (activePageId) {
      set((state) => ({
        pages: (state.pages || []).map((p) => (p.id === activePageId ? { ...p, background: color } : p)),
      }));
    }
  },

  updateSelectedObject: (updater) => {
    const obj = useImageWorkspaceStore.getState().selectedObject;
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!obj || !canvas || typeof updater !== "function") return;
    updater(obj);
    obj.setCoords?.();
    canvas.requestRenderAll?.();
  },

  addImageToCanvas: (src, point = null) => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    if (!canvas || !src) return;
    import("fabric").then((mod) => {
      const fabric = mod?.fabric || mod?.default || mod;
      if (!fabric) return;
      fabric.Image.fromURL(
        src,
        (img) => {
          if (!img || !canvas) return;
          const centerX = point?.x ?? canvas.getWidth() / 2;
          const centerY = point?.y ?? canvas.getHeight() / 2;
          img.set({
            originX: "center",
            originY: "center",
            left: centerX,
            top: centerY,
            selectable: true,
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.requestRenderAll();
        },
        { crossOrigin: "anonymous" }
      );
    });
  },

  addImageFromFile: async (file, point = null) => {
    const asset = await useImageWorkspaceStore.getState().addAssetFromFile(file);
    if (asset?.src) {
      useImageWorkspaceStore.getState().addImageToCanvas(asset.src, point);
    }
  },

  addImageFromUrl: (url, point = null) => {
    if (!url) return;
    const asset = { id: `asset-${Date.now()}`, src: url, name: "Imported image", kind: "image" };
    set((state) => ({
      assets: [...(state.assets || []), asset],
    }));
    useImageWorkspaceStore.getState().addImageToCanvas(url, point);
  },

  placeAssetOnCanvas: (assetId, point = null) => {
    const asset = useImageWorkspaceStore.getState().assets.find((a) => a.id === assetId);
    if (asset?.src) {
      useImageWorkspaceStore.getState().addImageToCanvas(asset.src, point);
    }
  },

  deleteSelected: () => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const obj = useImageWorkspaceStore.getState().selectedObject;
    if (!canvas || !obj) return;
    canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    set({ selectedObject: null });
  },

  duplicateSelected: () => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const obj = useImageWorkspaceStore.getState().selectedObject;
    if (!canvas || !obj || !obj.clone) return;
    obj.clone((clone) => {
      clone.set({
        left: (obj.left || 0) + 20,
        top: (obj.top || 0) + 20,
        evented: true,
      });
      canvas.add(clone);
      canvas.setActiveObject(clone);
      canvas.requestRenderAll();
      set({ selectedObject: clone });
    });
  },

  bringForwardSelected: () => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const obj = useImageWorkspaceStore.getState().selectedObject;
    if (!canvas || !obj || !canvas.bringForward) return;
    canvas.bringForward(obj);
    canvas.requestRenderAll();
  },

  sendBackwardSelected: () => {
    const canvas = useImageWorkspaceStore.getState().canvas;
    const obj = useImageWorkspaceStore.getState().selectedObject;
    if (!canvas || !obj || !canvas.sendBackwards) return;
    canvas.sendBackwards(obj);
    canvas.requestRenderAll();
  },
}));
