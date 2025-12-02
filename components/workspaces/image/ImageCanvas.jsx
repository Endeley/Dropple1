"use client";

import { useEffect, useRef, useState } from "react";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function ImageCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fabricRef = useRef(null);
  const zoom = useImageWorkspaceStore((s) => s.zoom);
  const pages = useImageWorkspaceStore((s) => s.pages);
  const activePageId = useImageWorkspaceStore((s) => s.activePageId);
  const setZoom = useImageWorkspaceStore((s) => s.setZoom);
  const placeAsset = useImageWorkspaceStore((s) => s.placeAssetOnCanvas);
  const addImageFromUrl = useImageWorkspaceStore((s) => s.addImageFromUrl);
  const setSelectedObject = useImageWorkspaceStore((s) => s.setSelectedObject);
  const setCanvasContainer = useImageWorkspaceStore((s) => s.setCanvasContainer);
  const dropPreviewRef = useRef(null);
  const guideLinesRef = useRef({ vertical: [], horizontal: [] });
  const showGrid = useImageWorkspaceStore((s) => s.showGrid);
  const gridSize = useImageWorkspaceStore((s) => s.gridSize);
  const snapToGrid = useImageWorkspaceStore((s) => s.snapToGrid);
  const showSafeGuides = useImageWorkspaceStore((s) => s.showSafeGuides);
  const bleedPercent = useImageWorkspaceStore((s) => s.bleedPercent);
  const fabricModuleRef = useRef(null);
  const activeTool = useImageWorkspaceStore((s) => s.activeTool);
  const cropOverlayRef = useRef(null);
  const [cropBounds, setCropBounds] = useState(null);
  const lassoPointsRef = useRef([]);
  const lassoOverlayRef = useRef(null);
  const brushSettings = useImageWorkspaceStore((s) => s.brushSettings);
  const clearMaskSelected = useImageWorkspaceStore((s) => s.clearMaskSelected);

  useEffect(() => {
    let disposed = false;
    let resizeObserver;
    const spacePanningRef = { current: false };
    const panStartRef = { current: null };
    const prevInteractionRef = { current: { selection: true, skipTargetFind: false } };
    let handleKeyDown;
    let handleKeyUp;
    let handleDragOver;
    let handleDrop;
    let handleDragLeave;
    const moveOriginRef = { current: null };
    const cropConfirmRef = { current: null };

    async function init() {
      const mod = await import("fabric");
      const fabric = mod?.fabric || mod?.default || mod;
      if (disposed || !canvasRef.current || !containerRef.current) return;
      if (!fabric) return;
      fabricModuleRef.current = fabric;
      useImageWorkspaceStore.getState().setFabricModule?.(fabric);

      // global control styling
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = "#7c3aed";
      fabric.Object.prototype.cornerStyle = "circle";
      fabric.Object.prototype.borderColor = "#7c3aed";
      fabric.Object.prototype.cornerSize = 10;
      fabric.Object.prototype.padding = 4;
      fabric.Object.prototype.borderScaleFactor = 1.1;

      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "#f1f3f7",
        preserveObjectStacking: true,
        selection: true,
        selectionColor: "rgba(124,58,237,0.08)",
        selectionBorderColor: "#7c3aed",
        selectionLineWidth: 1.5,
      });
      fabricRef.current = canvas;

      const resize = () => {
        if (!containerRef.current || !fabricRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        fabricRef.current.setWidth(clientWidth);
        fabricRef.current.setHeight(clientHeight);
        fabricRef.current.requestRenderAll();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(containerRef.current);

      // Expose the canvas to the store and load the active page
      const store = useImageWorkspaceStore.getState();
      store.setCanvasInstance(canvas);
      store.setCanvasContainer(containerRef.current);
      store.loadActivePageCanvas?.();

      // If no data on the active page, drop a friendly placeholder image
      const activePage = (store.pages || []).find((p) => p.id === store.activePageId);
      const hasData = Boolean(activePage?.data);
      if (!hasData) {
        const placeholder = "/seed/templates/placeholder.png";
        fabric.Image.fromURL(
          placeholder,
          (img) => {
            if (!img || !fabricRef.current) return;
            img.set({
              originX: "center",
              originY: "center",
              left: fabricRef.current.getWidth() / 2,
              top: fabricRef.current.getHeight() / 2,
              selectable: true,
            });
            fabricRef.current.add(img);
            fabricRef.current.setActiveObject(img);
            fabricRef.current.requestRenderAll();
          },
          { crossOrigin: "anonymous" }
        );
      }

      const handleWheel = (opt) => {
        const delta = opt.e?.deltaY || 0;
        let nextZoom = canvas.getZoom?.() || 1;
        nextZoom *= 0.999 ** delta;
        nextZoom = Math.min(Math.max(nextZoom, 0.25), 4);
        const point = { x: opt.e?.offsetX ?? 0, y: opt.e?.offsetY ?? 0 };
        canvas.zoomToPoint(point, nextZoom);
        setZoom(nextZoom);
        opt.e?.preventDefault?.();
        opt.e?.stopPropagation?.();
      };

      const handleDblClick = (opt) => {
        if (opt?.target) return;
        canvas.setZoom(1);
        canvas.absolutePan?.({ x: 0, y: 0 });
        setZoom(1);
      };

      handleKeyDown = (e) => {
        if (e.code === "Space") {
          e.preventDefault();
          spacePanningRef.current = true;
          prevInteractionRef.current = {
            selection: canvas.selection,
            skipTargetFind: canvas.skipTargetFind,
          };
          canvas.selection = false;
          canvas.skipTargetFind = true;
          canvas.defaultCursor = "grab";
        }
      };

      handleKeyUp = (e) => {
        if (e.code === "Space") {
          spacePanningRef.current = false;
          panStartRef.current = null;
          canvas.defaultCursor = "default";
          canvas.selection = prevInteractionRef.current.selection;
          canvas.skipTargetFind = prevInteractionRef.current.skipTargetFind;
        }

        if (e.key === "Enter" && cropConfirmRef.current) {
          cropConfirmRef.current();
        }
        if (e.key === "Escape" && cropBounds) {
          if (cropOverlayRef.current && fabricRef.current) {
            fabricRef.current.remove(cropOverlayRef.current);
            cropOverlayRef.current = null;
            setCropBounds(null);
            useImageWorkspaceStore.getState().setActiveTool("select");
            fabricRef.current.requestRenderAll?.();
          }
        }
      };

      const handleMouseDown = (opt) => {
        const pointer = canvas.getPointer(opt.e);

        // Place new objects when tool is drawing and click is on empty canvas
        const target = opt.target;
        const currentTool = useImageWorkspaceStore.getState().activeTool;
        if (!target) {
          if (currentTool === "text") {
            const text = new fabric.IText("Text", {
              left: pointer.x,
              top: pointer.y,
              originX: "center",
              originY: "center",
              fontSize: 28,
              fill: "#111827",
            });
            canvas.add(text);
            canvas.setActiveObject(text);
            setSelectedObject(text);
            canvas.requestRenderAll();
            return;
          }
          if (currentTool === "rect") {
            const rect = new fabric.Rect({
              left: pointer.x - 60,
              top: pointer.y - 40,
              width: 120,
              height: 80,
              fill: "#c7d2fe",
              stroke: "#7c3aed",
              strokeWidth: 1,
            });
            canvas.add(rect);
            canvas.setActiveObject(rect);
            setSelectedObject(rect);
            canvas.requestRenderAll();
            return;
          }
          if (currentTool === "circle") {
            const circle = new fabric.Circle({
              left: pointer.x - 40,
              top: pointer.y - 40,
              radius: 40,
              fill: "#bbf7d0",
              stroke: "#16a34a",
              strokeWidth: 1,
            });
            canvas.add(circle);
            canvas.setActiveObject(circle);
            setSelectedObject(circle);
            canvas.requestRenderAll();
            return;
          }
          if (currentTool === "triangle") {
            const tri = new fabric.Triangle({
              left: pointer.x - 50,
              top: pointer.y - 50,
              width: 100,
              height: 100,
              fill: "#fde68a",
              stroke: "#f59e0b",
              strokeWidth: 1,
            });
            canvas.add(tri);
            canvas.setActiveObject(tri);
            setSelectedObject(tri);
            canvas.requestRenderAll();
            return;
          }
          if (currentTool === "lasso") {
            lassoPointsRef.current.push({ x: pointer.x, y: pointer.y });
            if (lassoOverlayRef.current) {
              canvas.remove(lassoOverlayRef.current);
              lassoOverlayRef.current = null;
            }
            if (lassoPointsRef.current.length >= 2) {
              const poly = new fabric.Polyline(lassoPointsRef.current, {
                stroke: "#22c55e",
                strokeWidth: 2,
                fill: "rgba(34,197,94,0.1)",
                selectable: false,
                evented: false,
              });
              lassoOverlayRef.current = poly;
              canvas.add(poly);
              canvas.requestRenderAll();
            }
            return;
          }
          if (currentTool === "erase") {
            canvas.isDrawingMode = true;
            const brush = fabric.EraserBrush ? new fabric.EraserBrush(canvas) : new fabric.PencilBrush(canvas);
            brush.width = brushSettings.size || 20;
            const alpha = Math.min(Math.max(brushSettings.opacity || 1, 0.05), 1);
            brush.color = `rgba(0,0,0,${alpha})`;
            canvas.freeDrawingBrush = brush;
            return;
          }
        }

        if (!spacePanningRef.current) return;
        panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY };
        canvas.setCursor("grabbing");
      };

      const handleMouseMove = (opt) => {
        if (!spacePanningRef.current || !panStartRef.current) return;
        const vpt = canvas.viewportTransform;
        if (!vpt) return;
        vpt[4] += opt.e.clientX - panStartRef.current.x;
        vpt[5] += opt.e.clientY - panStartRef.current.y;
        canvas.setViewportTransform(vpt);
        panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY };
      };

      const handleMouseUp = () => {
        if (!spacePanningRef.current) return;
        canvas.setCursor("grab");
        panStartRef.current = null;
      };

      const snapDistance = 8;
      const clearGuides = () => {
        guideLinesRef.current.vertical.forEach((l) => canvas.remove(l));
        guideLinesRef.current.horizontal.forEach((l) => canvas.remove(l));
        guideLinesRef.current = { vertical: [], horizontal: [] };
      };

      const addGuide = ({ x1, y1, x2, y2 }, orientation) => {
        const line = new fabric.Line([x1, y1, x2, y2], {
          stroke: "#3b82f6",
          strokeWidth: 1,
          selectable: false,
          evented: false,
          strokeDashArray: [4, 4],
        });
        canvas.add(line);
        guideLinesRef.current[orientation].push(line);
      };

      const handleMoving = (e) => {
        const active = e.target;
        if (!active) return;
        const shift = e?.e?.shiftKey;
        if (shift && moveOriginRef.current) {
          const dx = (active.left ?? 0) - moveOriginRef.current.x;
          const dy = (active.top ?? 0) - moveOriginRef.current.y;
          if (Math.abs(dx) > Math.abs(dy)) {
            active.top = moveOriginRef.current.y;
          } else {
            active.left = moveOriginRef.current.x;
          }
        }
        clearGuides();
        const cw = canvas.getWidth();
        const ch = canvas.getHeight();
        const aw = active.getScaledWidth ? active.getScaledWidth() : (active.width || 0) * (active.scaleX || 1);
        const ah = active.getScaledHeight ? active.getScaledHeight() : (active.height || 0) * (active.scaleY || 1);
        const ax = active.left ?? 0;
        const ay = active.top ?? 0;
        const acx = ax + aw / 2;
        const acy = ay + ah / 2;
        const ccx = cw / 2;
        const ccy = ch / 2;

        // Snap to canvas center
        if (Math.abs(acx - ccx) < snapDistance) {
          active.left = ccx - aw / 2;
          addGuide({ x1: ccx, y1: 0, x2: ccx, y2: ch }, "vertical");
        }
        if (Math.abs(acy - ccy) < snapDistance) {
          active.top = ccy - ah / 2;
          addGuide({ x1: 0, y1: ccy, x2: cw, y2: ccy }, "horizontal");
        }

        // Snap to other objects
        const objects = canvas.getObjects().filter((o) => o !== active);
        objects.forEach((obj) => {
          const ow = obj.getScaledWidth ? obj.getScaledWidth() : (obj.width || 0) * (obj.scaleX || 1);
          const oh = obj.getScaledHeight ? obj.getScaledHeight() : (obj.height || 0) * (obj.scaleY || 1);
          const ox = obj.left ?? 0;
          const oy = obj.top ?? 0;
          const ocx = ox + ow / 2;
          const ocy = oy + oh / 2;
          const or = ox + ow;
          const ob = oy + oh;

          // left edges
          if (Math.abs(ax - ox) < snapDistance) {
            active.left = ox;
            addGuide({ x1: ox, y1: 0, x2: ox, y2: ch }, "vertical");
          }
          // right edges
          if (Math.abs(ax + aw - or) < snapDistance) {
            active.left = or - aw;
            addGuide({ x1: or, y1: 0, x2: or, y2: ch }, "vertical");
          }
          // centers (x)
          if (Math.abs(acx - ocx) < snapDistance) {
            active.left = ocx - aw / 2;
            addGuide({ x1: ocx, y1: 0, x2: ocx, y2: ch }, "vertical");
          }
          // top edges
          if (Math.abs(ay - oy) < snapDistance) {
            active.top = oy;
            addGuide({ x1: 0, y1: oy, x2: cw, y2: oy }, "horizontal");
          }
          // bottom edges
          if (Math.abs(ay + ah - ob) < snapDistance) {
            active.top = ob - ah;
            addGuide({ x1: 0, y1: ob, x2: cw, y2: ob }, "horizontal");
          }
          // centers (y)
          if (Math.abs(acy - ocy) < snapDistance) {
            active.top = ocy - ah / 2;
            addGuide({ x1: 0, y1: ocy, x2: cw, y2: ocy }, "horizontal");
          }
        });

        // Snap to grid
        if (snapToGrid && gridSize > 0) {
          const gx = Math.round((active.left ?? 0) / gridSize) * gridSize;
          const gy = Math.round((active.top ?? 0) / gridSize) * gridSize;
          active.left = gx;
          active.top = gy;
        }

        active.setCoords?.();
        canvas.requestRenderAll?.();
      };

      const handleMouseUpGuides = () => {
        clearGuides();
        canvas.requestRenderAll?.();
      };

      const handleOver = (opt) => {
        const target = opt?.target;
        if (!target || target._hovering) return;
        target._origStroke = target.stroke;
        target._origStrokeWidth = target.strokeWidth;
        target.stroke = target.stroke || "#2563eb";
        target.strokeWidth = Math.max(target.strokeWidth || 1.2, 1.2);
        target._hovering = true;
        target.dirty = true;
        canvas.requestRenderAll();
      };

      const handleOut = (opt) => {
        const target = opt?.target;
        if (!target || !target._hovering) return;
        target.stroke = target._origStroke;
        target.strokeWidth = target._origStrokeWidth;
        target._hovering = false;
        target.dirty = true;
        canvas.requestRenderAll();
      };

      const detachCanvasEvents = () => {
        canvas.off("mouse:wheel", handleWheel);
        canvas.off("mouse:dblclick", handleDblClick);
        canvas.off("mouse:down", handleMouseDown);
        canvas.off("mouse:move", handleMouseMove);
        canvas.off("mouse:up", handleMouseUp);
        canvas.off("mouse:over", handleOver);
        canvas.off("mouse:out", handleOut);
      };

      canvas.on("mouse:wheel", handleWheel);
      canvas.on("mouse:dblclick", handleDblClick);
      canvas.on("mouse:down", handleMouseDown);
      canvas.on("mouse:move", handleMouseMove);
      canvas.on("mouse:up", handleMouseUp);
      canvas.on("mouse:over", handleOver);
      canvas.on("mouse:out", handleOut);
      canvas.on("object:moving", handleMoving);
      canvas.on("mouse:up", handleMouseUpGuides);
      canvas.on("mouse:down", (opt) => {
        if (opt?.target) {
          moveOriginRef.current = { x: opt.target.left ?? 0, y: opt.target.top ?? 0 };
        } else {
          moveOriginRef.current = null;
        }
        if (activeTool === "lasso" && opt?.e?.detail === 2) {
          // double click to close lasso
          const selected = useImageWorkspaceStore.getState().selectedObject;
          if (selected && selected.type === "image" && lassoPointsRef.current.length >= 3) {
            const fabric = fabricModuleRef.current;
            const poly = new fabric.Polygon(
              lassoPointsRef.current.map((p) => ({ x: p.x - (selected.left || 0), y: p.y - (selected.top || 0) })),
              { absolutePositioned: true }
            );
            selected.clipPath = poly;
            if (lassoOverlayRef.current) {
              canvas.remove(lassoOverlayRef.current);
              lassoOverlayRef.current = null;
            }
            lassoPointsRef.current = [];
            canvas.requestRenderAll();
            useImageWorkspaceStore.getState().setActiveTool("select");
          }
        }
      });

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      handleDragOver = (e) => {
        e.preventDefault();
        const target = containerRef.current;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const preview = dropPreviewRef.current;
        if (preview) {
          preview.style.opacity = "1";
          preview.style.transform = `translate(${x - 60}px, ${y - 60}px)`;
        }
      };

      handleDrop = (e) => {
        e.preventDefault();
        const assetId = e.dataTransfer?.getData("text/asset-id");
        const uri = e.dataTransfer?.getData("text/uri-list") || e.dataTransfer?.getData("text/plain");
        let point = null;
        if (canvas) {
          const p = canvas.getPointer(e);
          point = { x: p.x, y: p.y };
        }
        if (assetId) {
          placeAsset(assetId, point);
        } else if (uri) {
          addImageFromUrl(uri, point);
        }
        const preview = dropPreviewRef.current;
        if (preview) preview.style.opacity = "0";
      };

      handleDragLeave = () => {
        const preview = dropPreviewRef.current;
        if (preview) preview.style.opacity = "0";
      };

      containerRef.current?.addEventListener("dragover", handleDragOver);
      containerRef.current?.addEventListener("drop", handleDrop);
      containerRef.current?.addEventListener("dragleave", handleDragLeave);

      // attach cleanup to canvas instance for dispose
      canvas.__droppleDetach = () => {
        canvas.off("mouse:wheel", handleWheel);
        canvas.off("mouse:dblclick", handleDblClick);
        canvas.off("mouse:down", handleMouseDown);
        canvas.off("mouse:move", handleMouseMove);
        canvas.off("mouse:up", handleMouseUp);
        canvas.off("mouse:over", handleOver);
        canvas.off("mouse:out", handleOut);
        canvas.off("object:moving", handleMoving);
        canvas.off("mouse:up", handleMouseUpGuides);
        canvas.off("mouse:down");
      };

      const setSelectionState = (target) => {
        setSelectedObject(target || null);
      };
      canvas.on("selection:created", (e) => setSelectionState(e.selected ? e.selected[0] : e.target));
      canvas.on("selection:updated", (e) => setSelectionState(e.selected ? e.selected[0] : e.target));
      canvas.on("selection:cleared", () => setSelectionState(null));
    }

    init();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      if (fabricRef.current?.__droppleDetach) {
        fabricRef.current.__droppleDetach();
      }
      fabricRef.current?.dispose();
      fabricRef.current = null;
      if (handleKeyDown) window.removeEventListener("keydown", handleKeyDown);
      if (handleKeyUp) window.removeEventListener("keyup", handleKeyUp);
      if (handleDragOver) containerRef.current?.removeEventListener("dragover", handleDragOver);
      if (handleDrop) containerRef.current?.removeEventListener("drop", handleDrop);
      if (handleDragLeave) containerRef.current?.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const current = canvas.getZoom?.() || 1;
    if (Math.abs(current - zoom) > 0.001) {
      canvas.setZoom(zoom);
      canvas.requestRenderAll();
    }
  }, [zoom]);

  useEffect(() => {
    const handleArrow = (e) => {
      const obj = useImageWorkspaceStore.getState().selectedObject;
      const canvas = useImageWorkspaceStore.getState().canvas;
      if (!obj || !canvas) return;
      const isArrow = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key);
      if (!isArrow) return;
      e.preventDefault();
      const delta = e.shiftKey ? 10 : 1;
      switch (e.key) {
        case "ArrowLeft":
          obj.left = (obj.left || 0) - delta;
          break;
        case "ArrowRight":
          obj.left = (obj.left || 0) + delta;
          break;
        case "ArrowUp":
          obj.top = (obj.top || 0) - delta;
          break;
        case "ArrowDown":
          obj.top = (obj.top || 0) + delta;
          break;
        default:
          break;
      }
      obj.setCoords?.();
      canvas.requestRenderAll?.();
    };
    window.addEventListener("keydown", handleArrow);
    return () => window.removeEventListener("keydown", handleArrow);
  }, []);

  useEffect(() => {
    if (!fabricRef.current || !activePageId) return;
    useImageWorkspaceStore.getState().loadPageToCanvas(activePageId);
  }, [activePageId, pages]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const drawingTools = ["text", "rect", "circle", "triangle", "erase", "lasso", "mask", "crop"];
    if (drawingTools.includes(activeTool)) {
      canvas.defaultCursor = activeTool === "crop" ? "crosshair" : activeTool === "move" ? "grab" : "crosshair";
      if (containerRef.current) containerRef.current.style.cursor = canvas.defaultCursor;
    } else {
      canvas.defaultCursor = activeTool === "move" ? "grab" : "default";
      if (containerRef.current) containerRef.current.style.cursor = canvas.defaultCursor;
    }
  }, [activeTool]);

  useEffect(() => {
    const canvas = fabricRef.current;
    const fabric = fabricModuleRef.current;
    if (!canvas || !fabric) return;
    canvas.isDrawingMode = activeTool === "erase" || activeTool === "mask";

    if (activeTool === "erase") {
      const brush = fabric.EraserBrush ? new fabric.EraserBrush(canvas) : new fabric.PencilBrush(canvas);
      brush.width = brushSettings.size || 20;
      const alpha = Math.min(Math.max(brushSettings.opacity || 1, 0.05), 1);
      brush.color = `rgba(0,0,0,${alpha})`;
      canvas.freeDrawingBrush = brush;
      return;
    }

    if (activeTool === "mask") {
      const brush = new fabric.PencilBrush(canvas);
      brush.width = brushSettings.size || 12;
      brush.color = "rgba(0,0,0,1)";
      brush.opacity = brushSettings.opacity || 1;
      canvas.freeDrawingBrush = brush;

      const handlePath = (opt) => {
        const path = opt?.path;
        const target = useImageWorkspaceStore.getState().selectedObject;
        if (!path || !target || target.type !== "image") {
          if (path) canvas.remove(path);
          return;
        }
        const relLeft = (path.left || 0) - (target.left || 0);
        const relTop = (path.top || 0) - (target.top || 0);
        const newPath = new fabric.Path(path.path, {
          left: relLeft,
          top: relTop,
          absolutePositioned: true,
        });
        target.clipPath = newPath;
        canvas.remove(path);
        canvas.requestRenderAll();
        useImageWorkspaceStore.getState().setActiveTool("select");
      };

      canvas.on("path:created", handlePath);
      return () => {
        canvas.off("path:created", handlePath);
        canvas.isDrawingMode = false;
      };
    }

    canvas.isDrawingMode = false;
  }, [activeTool, brushSettings]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const drawingTools = ["text", "rect", "circle", "triangle"];
    if (drawingTools.includes(activeTool)) {
      canvas.defaultCursor = "crosshair";
      if (containerRef.current) containerRef.current.style.cursor = "crosshair";
    } else if (activeTool === "move") {
      canvas.defaultCursor = "grab";
      if (containerRef.current) containerRef.current.style.cursor = "grab";
    } else {
      canvas.defaultCursor = "default";
      if (containerRef.current) containerRef.current.style.cursor = "default";
    }
  }, [activeTool]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.backgroundColor = useImageWorkspaceStore.getState().pages.find((p) => p.id === activePageId)?.background || "#f1f3f7";
    canvas.requestRenderAll?.();
  }, [activePageId, pages]);

  useEffect(() => {
    const canvas = fabricRef.current;
    const fabric = fabricModuleRef.current;
    if (!canvas || !fabric) return;

    // Clean old overlay if any
    if (canvas.__droppleGridOverlay) {
      canvas.remove(canvas.__droppleGridOverlay);
      canvas.__droppleGridOverlay = null;
    }

    if (showGrid) {
      const size = gridSize || 16;
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = size;
      const ctx = patternCanvas.getContext("2d");
      ctx.strokeStyle = "rgba(107,114,128,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.lineTo(size, size);
      ctx.lineTo(0, size);
      ctx.stroke();
      const pattern = new fabric.Pattern({ source: patternCanvas, repeat: "repeat" });
      const overlayRect = new fabric.Rect({
        width: canvas.getWidth(),
        height: canvas.getHeight(),
        fill: pattern,
        selectable: false,
        evented: false,
        excludeFromExport: true,
      });

      canvas.add(overlayRect);
      overlayRect.sendToBack?.();
      canvas.__droppleGridOverlay = overlayRect;
      canvas.renderAll();
    } else {
      canvas.renderAll();
    }
  }, [showGrid, gridSize]);

  // Safe/bleed overlays
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    // remove old guides
    if (canvas.__droppleSafeGuides) {
      canvas.__droppleSafeGuides.forEach((g) => canvas.remove(g));
      canvas.__droppleSafeGuides = null;
    }
    if (!showSafeGuides) {
      canvas.requestRenderAll?.();
      return;
    }
    const bleed = Math.min(Math.max(bleedPercent || 0, 0), 0.2);
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const insetX = w * bleed;
    const insetY = h * bleed;
    const rect = new (fabricModuleRef.current?.Rect || fabric.Rect)({
      left: insetX,
      top: insetY,
      width: w - insetX * 2,
      height: h - insetY * 2,
      fill: "rgba(0,0,0,0)",
      stroke: "#f97316",
      strokeWidth: 1,
      strokeDashArray: [6, 6],
      selectable: false,
      evented: false,
      excludeFromExport: true,
    });
    canvas.add(rect);
    canvas.__droppleSafeGuides = [rect];
    canvas.renderAll();
  }, [showSafeGuides, bleedPercent]);

  // Crop overlay and confirm
  useEffect(() => {
    const canvas = fabricRef.current;
    const fabric = fabricModuleRef.current;
    const selected = useImageWorkspaceStore.getState().selectedObject;
    if (!canvas || !fabric) return;

    // Remove overlay if tool is not crop or selection not an image
    if (activeTool !== "crop" || !selected || selected.type !== "image") {
      if (cropOverlayRef.current) {
        canvas.remove(cropOverlayRef.current);
        cropOverlayRef.current = null;
        setCropBounds(null);
        canvas.requestRenderAll?.();
      }
      return;
    }

    // Build overlay if missing
    if (!cropOverlayRef.current) {
      const bounds = selected.getBoundingRect(true, true);
      const overlay = new fabric.Rect({
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
        fill: "rgba(59,130,246,0.08)",
        stroke: "#2563eb",
        strokeWidth: 1,
        hasBorders: true,
        hasControls: true,
        selectable: true,
        lockRotation: false,
        transparentCorners: false,
        cornerColor: "#2563eb",
      });
      cropOverlayRef.current = overlay;
      canvas.add(overlay);
      canvas.setActiveObject(overlay);
      canvas.bringToFront(overlay);
      canvas.requestRenderAll();
    }

    const syncBounds = () => {
      const overlay = cropOverlayRef.current;
      if (!overlay) return;
      const rect = overlay.getBoundingRect(true, true);
      setCropBounds({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    };
    syncBounds();
    cropOverlayRef.current.on("modified", syncBounds);

    // confirm function
    cropConfirmRef.current = () => {
      const overlay = cropOverlayRef.current;
      if (!overlay) return;
      const scaleX = selected.scaleX || 1;
      const scaleY = selected.scaleY || 1;
      const imgLeft = selected.left || 0;
      const imgTop = selected.top || 0;
      const relLeft = (overlay.left || 0) - imgLeft;
      const relTop = (overlay.top || 0) - imgTop;
      const clip = new fabric.Rect({
        left: relLeft / scaleX,
        top: relTop / scaleY,
        width: (overlay.width || 0) / scaleX,
        height: (overlay.height || 0) / scaleY,
        absolutePositioned: true,
      });
      selected.clipPath = clip;
      canvas.remove(overlay);
      cropOverlayRef.current = null;
      setCropBounds(null);
      canvas.setActiveObject(selected);
      canvas.requestRenderAll();
      useImageWorkspaceStore.getState().setActiveTool("select");
    };
  }, [activeTool]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[var(--ws-canvas-bg)]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div
        ref={dropPreviewRef}
        className="pointer-events-none absolute h-[120px] w-[120px] rounded-lg border-2 border-blue-400 bg-blue-400/10 opacity-0 transition-opacity duration-100"
        style={{ left: 0, top: 0 }}
      />
      {cropBounds && (
        <>
          {/* Dimming outside crop */}
          <div className="pointer-events-none absolute inset-0 bg-black/40" />
          <div
            className="pointer-events-none absolute border-2 border-blue-500"
            style={{
              left: cropBounds.left,
              top: cropBounds.top,
              width: cropBounds.width,
              height: cropBounds.height,
              boxShadow:
                "0 0 0 9999px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(59,130,246,0.7)",
            }}
          />
          <div
            className="absolute flex items-center gap-2"
            style={{
              left: cropBounds.left + cropBounds.width / 2,
              top: cropBounds.top + cropBounds.height + 12,
              transform: "translateX(-50%)",
            }}
          >
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-blue-500"
              onClick={() => cropConfirmRef.current?.()}
            >
              Apply crop (Enter)
            </button>
            <button
              type="button"
              className="rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm font-semibold text-neutral-800 shadow-sm hover:border-neutral-400"
              onClick={() => {
                if (cropOverlayRef.current && fabricRef.current) {
                  fabricRef.current.remove(cropOverlayRef.current);
                  cropOverlayRef.current = null;
                  setCropBounds(null);
                  useImageWorkspaceStore.getState().setActiveTool("select");
                  fabricRef.current.requestRenderAll?.();
                }
              }}
            >
              Cancel (Esc)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
