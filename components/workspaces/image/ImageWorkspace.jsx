"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutTemplate, Image as ImageIcon, Sparkles, Palette, Zap, Filter, Settings } from "lucide-react";
import ImageCanvas from "./ImageCanvas";
import ImageBottomBar from "./ImageBottomBar";
import ImageTools from "./tools/ImageTools";
import Slideouts from "./Slideouts";
import Popups from "./Popups";
import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";
import ContextInspector from "./ContextInspector";
import QuickActionsOverlay from "./QuickActionsOverlay";
import { Download, Save, ShieldCheck, Clock3, ZoomIn, ZoomOut } from "lucide-react";

export default function ImageWorkspace() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const uploadInputRef = useRef(null);
  const pages = useImageWorkspaceStore((s) => s.pages) || [];
  const activePage = useImageWorkspaceStore((s) => s.activePageId);
  const addPage = useImageWorkspaceStore((s) => s.addPage);
  const switchPage = useImageWorkspaceStore((s) => s.switchPage);
  const deletePage = useImageWorkspaceStore((s) => s.deletePage);
  const duplicatePage = useImageWorkspaceStore((s) => s.duplicatePage);
  const addImageFromFile = useImageWorkspaceStore((s) => s.addImageFromFile);
  const toggleGrid = useImageWorkspaceStore((s) => s.toggleGrid);
  const showGrid = useImageWorkspaceStore((s) => s.showGrid);
  const snapToGrid = useImageWorkspaceStore((s) => s.snapToGrid);
  const toggleSnapToGrid = useImageWorkspaceStore((s) => s.toggleSnapToGrid);
  const zoom = useImageWorkspaceStore((s) => s.zoom);
  const setZoom = useImageWorkspaceStore((s) => s.setZoom);
  const autosaveNow = useImageWorkspaceStore((s) => s.autosaveNow);
  const saveStatus = useImageWorkspaceStore((s) => s.saveStatus);
  const lastSavedAt = useImageWorkspaceStore((s) => s.lastSavedAt);
  const pageCount = pages.length;
  const openLeft = useWorkspaceUIStore((s) => s.openLeft);
  const activeLeft = useWorkspaceUIStore((s) => s.activeLeftSlideout);
  const setLeftHoveringTrigger = useWorkspaceUIStore((s) => s.setLeftHoveringTrigger);
  const openRight = useWorkspaceUIStore((s) => s.openRight);
  const openModal = useWorkspaceUIStore((s) => s.openModal);
  const setRightHoveringTrigger = useWorkspaceUIStore((s) => s.setRightHoveringTrigger);
  const closeLeftIfIdle = () => {
    const state = useWorkspaceUIStore.getState();
    if (!state.leftHoveringSlideout && !state.leftHoveringTrigger) {
      state.closeLeft();
    }
  };

  const closeRightIfIdle = () => {
    const state = useWorkspaceUIStore.getState();
    if (!state.rightHoveringSlideout && !state.rightHoveringTrigger) {
      state.closeRight();
    }
  };

  const shellStyle = {
    display: "grid",
    gridTemplateColumns: "minmax(260px, 320px) 1fr 320px",
    gridTemplateRows: "72px 1fr 72px",
    gap: "12px",
    padding: "16px",
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(180deg, #f6f7fb 0%, #eef1f7 100%)",
    color: "#111827",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
  };

  const zoomDelta = 0.1;
  const zoomIn = () => setZoom(Math.min(4, (zoom || 1) + zoomDelta));
  const zoomOut = () => setZoom(Math.max(0.25, (zoom || 1) - zoomDelta));
  const resetZoom = () => setZoom(1);
  const zoomBadge = `${Math.round((zoom || 1) * 100)}%`;
  const savedLabel = saveStatus === "saving" ? "Saving…" : "Saved";
  const savedSub = lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—";

  useEffect(() => {
    const id = setInterval(() => {
      autosaveNow();
    }, 10000);
    return () => clearInterval(id);
  }, [autosaveNow]);

  return (
    <div className="image-shell" style={shellStyle}>
      <Slideouts />
      <Popups />
      <header className="image-header" style={{ ...cardStyle, gridColumn: "1 / -1", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="image-brand" style={{ fontWeight: 800 }}>Dropple</div>
        <div className="image-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            className="image-input"
            defaultValue="Untitled canvas"
            aria-label="Canvas name"
            style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "10px 12px", background: "#f9fafb", minWidth: "200px", fontWeight: 600 }}
          />
          <div className="image-pill" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 10px", borderRadius: "999px", background: "#eef2ff", color: "#4338ca", fontWeight: 700, fontSize: "12px" }}>
            <ShieldCheck size={14} />
            <span>{savedLabel}</span>
            <Clock3 size={14} className="text-neutral-500" />
            <span className="text-neutral-500">{savedSub}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              onClick={zoomOut}
              className="rounded-lg border border-neutral-200 bg-white p-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
            >
              <ZoomOut size={16} />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 transition hover:border-neutral-300"
            >
              {zoomBadge}
            </button>
            <button
              type="button"
              onClick={zoomIn}
              className="rounded-lg border border-neutral-200 bg-white p-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
            >
              <ZoomIn size={16} />
            </button>
          </div>
          <button
            className="image-btn ghost"
            style={{ ...cardStyle, padding: "10px 14px", boxShadow: "none", display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => autosaveNow()}
          >
            <Save size={14} />
            Save
          </button>
          <button
            className="image-btn primary"
            style={{ padding: "10px 14px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "#fff", border: "none", display: "flex", alignItems: "center", gap: "6px" }}
            onClick={() => openModal("export")}
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </header>

      <div className="image-left" style={{ gridColumn: "1 / span 1", gridRow: "2 / span 1", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="panel" style={{ ...cardStyle, padding: "12px" }}>
          <div className="panel-title" style={{ fontWeight: 700, marginBottom: "8px" }}>Library</div>
          <div className="pill-list" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { id: "templates", label: "Templates", icon: LayoutTemplate },
              { id: "assets", label: "Assets", icon: ImageIcon },
              { id: "shapes", label: "Shapes", icon: LayoutTemplate },
              { id: "projects", label: "Projects", icon: Sparkles },
              { id: "filters", label: "Filters", icon: Palette },
              { id: "effects", label: "Effects", icon: Zap },
              { id: "presets", label: "Presets", icon: Settings },
              { id: "aiStyles", label: "AI Styles", icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeLeft === item.id;
              return (
                <button
                  key={item.id}
                  className="pill-item"
                  onMouseEnter={() => {
                    setLeftHoveringTrigger(true);
                    if (item.id === "presets") {
                      setRightHoveringTrigger(true);
                      openRight("filterSettings");
                    } else if (item.id === "aiStyles") {
                      setRightHoveringTrigger(true);
                      openRight("aiSettings");
                    } else {
                      openLeft(item.id === "effects" ? "effects" : item.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.id === "presets" || item.id === "aiStyles") {
                      setRightHoveringTrigger(false);
                      setTimeout(closeRightIfIdle, 150);
                    } else {
                      setLeftHoveringTrigger(false);
                      setTimeout(closeLeftIfIdle, 150);
                    }
                  }}
                  style={{
                    border: isActive ? "1px solid #7c3aed" : "1px solid #e5e7eb",
                    background: isActive ? "linear-gradient(135deg, #f3e8ff, #eef2ff)" : "#f9fafb",
                    borderRadius: "10px",
                    padding: "10px 12px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#111827",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="panel" style={{ ...cardStyle, padding: "12px" }}>
          <div className="panel-title" style={{ fontWeight: 700, marginBottom: "8px" }}>Tools</div>
          <ImageTools />
        </div>
      </div>

      <main
        className="image-canvas-area"
        style={{
          gridColumn: "2 / span 1",
          gridRow: "2 / span 1",
          display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
        <div
          className="image-stage"
          style={{
            ...cardStyle,
            position: "relative",
            overflow: "hidden",
            width: "80%",
            height: "80%",
            minHeight: "384px",
            background: "#f8fafc",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 10,
            }}
          >
            <span
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                fontWeight: 700,
                fontSize: "12px",
                color: "#111827",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
              }}
            >
              {pages.find((p) => p.id === activePage)?.name || "Page"}
            </span>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>({pageCount} page{pageCount === 1 ? "" : "s"})</span>
            <button
              type="button"
              onClick={() => {
                addPage();
              }}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                fontSize: "12px",
                fontWeight: 700,
                color: "#4338ca",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
              }}
            >
              + Add page
            </button>
            <button
              type="button"
              onClick={() => uploadInputRef.current?.click()}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#eef2ff",
                fontSize: "12px",
                fontWeight: 700,
                color: "#4338ca",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
              }}
            >
              + Add image
            </button>
            <button
              type="button"
              onClick={toggleGrid}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: showGrid ? "#ecfeff" : "#f9fafb",
                fontSize: "12px",
                fontWeight: 700,
                color: showGrid ? "#0284c7" : "#4338ca",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
              }}
            >
              {showGrid ? "Hide grid" : "Show grid"}
            </button>
            <button
              type="button"
              onClick={toggleSnapToGrid}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: snapToGrid ? "#ecfeff" : "#f9fafb",
                fontSize: "12px",
                fontWeight: 700,
                color: snapToGrid ? "#0284c7" : "#4338ca",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
              }}
            >
              {snapToGrid ? "Snap on" : "Snap off"}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={uploadInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) addImageFromFile(file);
                if (e.target) e.target.value = "";
              }}
            />
          </div>
          <ImageCanvas />
          <QuickActionsOverlay />
        </div>
        {previewOpen && (
          <div
            className="image-pages"
            style={{
              ...cardStyle,
              width: "100%",
              maxWidth: "900px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#fbfbff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}>Pages ({pageCount})</div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                paddingBottom: "4px",
              }}
            >
              {pages.map((page) => {
                const isActive = page.id === activePage;
                return (
                  <div
                    key={page.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => switchPage(page.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        switchPage(page.id);
                      }
                    }}
                    style={{
                      minWidth: "180px",
                      maxWidth: "180px",
                      borderRadius: "10px",
                      border: isActive ? "2px solid #7c3aed" : "1px solid #e5e7eb",
                      background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.04)",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "90px",
                        borderRadius: "8px",
                        background: "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)",
                        border: "1px solid #e5e7eb",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {page.thumbnail ? (
                        <img
                          src={page.thumbnail}
                          alt={page.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            position: "absolute",
                            inset: "12px",
                            borderRadius: "6px",
                            background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.12))",
                            border: "1px dashed rgba(124,58,237,0.2)",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ fontWeight: 700, color: "#111827", fontSize: "14px" }}>{page.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicatePage(page.id);
                        }}
                        style={{
                          fontSize: "11px",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          background: "#f9fafb",
                          fontWeight: 700,
                          color: "#4338ca",
                        }}
                      >
                        Duplicate
                      </button>
                      {pages.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page.id);
                          }}
                          style={{
                            fontSize: "11px",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            background: "#fff1f2",
                            fontWeight: 700,
                            color: "#be123c",
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div
          className="image-projects"
          style={{
            ...cardStyle,
            width: "80%",
            padding: "12px",
            display: "flex",
            alignItems: "stretch",
            gap: "12px",
            overflowX: "auto",
            background: "#fbfbff",
          }}
        >
          {[
            { title: "Branding Kit", meta: "Updated 2h ago" },
            { title: "Summer Campaign", meta: "Updated yesterday" },
            { title: "Portrait Retouch", meta: "Updated 3d ago" },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                flex: "0 0 200px",
                padding: "12px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>{card.title}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{card.meta}</div>
              <button
                type="button"
                style={{
                  marginTop: "auto",
                  alignSelf: "flex-start",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4338ca",
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </main>

      <aside className="image-inspector" style={{ gridColumn: "3 / span 1", gridRow: "2 / span 1" }}>
        <div className="panel" style={{ ...cardStyle, padding: "12px" }}>
          <div
            className="panel-title"
            style={{
              fontWeight: 700,
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span>Inspector</span>
            <button
              type="button"
              onClick={() => setPreviewOpen((open) => !open)}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                fontSize: "12px",
                fontWeight: 700,
                color: "#4338ca",
                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
              }}
            >
              {previewOpen ? "Hide preview" : `Preview (${pageCount})`}
            </button>
          </div>
          <ContextInspector />
        </div>
      </aside>

      <footer className="image-bottom" style={{ gridColumn: "1 / -1", ...cardStyle, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ImageBottomBar />
      </footer>
    </div>
  );
}
