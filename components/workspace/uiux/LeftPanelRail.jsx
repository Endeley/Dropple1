"use client";

import { Box, ChevronLeft, Images, Layers, Library, Palette } from "lucide-react";
import { usePanelsStore } from "@/stores/panelsStore";

const tabs = [
  { id: "layers", label: "Layers", icon: Layers },
  { id: "assets", label: "Assets", icon: Images },
  { id: "components", label: "Components", icon: Box },
  { id: "tokens", label: "Tokens", icon: Palette },
  { id: "library", label: "Library", icon: Library },
];

export default function LeftPanelRail() {
  const activeLeftPanel = usePanelsStore((s) => s.activeLeftPanel);
  const setActiveLeftPanel = usePanelsStore((s) => s.setActiveLeftPanel);
  const toggleLeftPanelCollapsed = usePanelsStore((s) => s.toggleLeftPanelCollapsed);

  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-slate-900">
        <div className="flex flex-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeLeftPanel;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLeftPanel(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 py-1.5 text-[11px] transition
                  ${
                    isActive
                      ? "border-violet-500 bg-slate-900 text-slate-100"
                      : "border-transparent bg-slate-950/80 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200"
                  }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={toggleLeftPanelCollapsed}
          className="flex w-7 items-center justify-center border-l border-slate-900 text-xs text-slate-500 hover:bg-slate-900/80 hover:text-slate-100"
          title="Collapse sidebar"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3 text-xs">
        {activeLeftPanel === "layers" && <LayersPanel />}
        {activeLeftPanel === "assets" && <AssetsPanel />}
        {activeLeftPanel === "components" && <ComponentsPanel />}
        {activeLeftPanel === "tokens" && <TokensPanel />}
        {activeLeftPanel === "library" && <LibraryPanel />}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-slate-500">{children}</div>;
}

function LayersPanel() {
  return (
    <div className="space-y-2">
      <SectionLabel>Layers</SectionLabel>
      <div className="space-y-1">
        <LayerRow name="Frame – Dashboard" subtitle="Desktop • 1440 × 900" depth={0} active />
        <LayerRow name="Navbar" depth={1} />
        <LayerRow name="Sidebar" depth={1} />
        <LayerRow name="Main content" depth={1} />
        <LayerRow name="Card / Stats" depth={2} />
        <LayerRow name="CTA Button" depth={3} />
      </div>
    </div>
  );
}

function LayerRow({ name, subtitle, depth = 0, active }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-md px-1.5 py-1 text-[11px] transition
      ${
        active
          ? "bg-violet-600/20 text-slate-50"
          : "text-slate-300 hover:bg-slate-900/80"
      }`}
      style={{ paddingLeft: 6 + depth * 10 }}
    >
      <span className="truncate">{name}</span>
      {subtitle && <span className="ml-2 text-[10px] text-slate-500">{subtitle}</span>}
    </button>
  );
}

function AssetsPanel() {
  return (
    <div className="space-y-3">
      <SectionLabel>Assets</SectionLabel>

      <input
        className="w-full rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:ring-1 focus:ring-violet-500/70"
        placeholder="Search icons, images, illustrations…"
      />

      <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
        {["All", "Icons", "Logos", "Screenshots", "Illustrations"].map((tag, i) => (
          <button
            key={tag}
            className={`rounded-full border px-2 py-0.5 ${
              i === 0
                ? "border-violet-500 bg-violet-600/20 text-violet-50"
                : "border-slate-800 bg-slate-950/80 text-slate-300 hover:bg-slate-900"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
          >
            <div className="flex h-full w-full items-center justify-center text-[9px] text-slate-500">Asset {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComponentsPanel() {
  return (
    <div className="space-y-3">
      <SectionLabel>Components</SectionLabel>

      <div className="space-y-1.5">
        <ComponentRow name="Button / Primary" variants="Default • Hover • Pressed" />
        <ComponentRow name="Input / TextField" variants="Default • Error" />
        <ComponentRow name="Navbar / AppShell" variants="Light • Dark" />
        <ComponentRow name="Card / Metric" variants="Small • Large" />
      </div>
    </div>
  );
}

function ComponentRow({ name, variants }) {
  return (
    <button className="w-full rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1.5 text-left text-[11px] hover:bg-slate-900/80">
      <div className="text-slate-100">{name}</div>
      <div className="text-[10px] text-slate-500">{variants}</div>
    </button>
  );
}

function TokensPanel() {
  return (
    <div className="space-y-3">
      <SectionLabel>Design tokens</SectionLabel>

      <div className="space-y-2">
        <div className="text-[10px] text-slate-400">Colors</div>
        <TokenColor name="Primary / Violet" value="#7C3AED" />
        <TokenColor name="Accent / Fuchsia" value="#EC4899" />
        <TokenColor name="Surface / Dark" value="#020617" />
      </div>

      <div className="space-y-2">
        <div className="text-[10px] text-slate-400">Typography</div>
        <TokenType name="Heading / XL" value="Inter • 32 / 40 • SemiBold" />
        <TokenType name="Body / M" value="Inter • 14 / 20 • Regular" />
      </div>
    </div>
  );
}

function TokenColor({ name, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-md border border-slate-700 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-400 shadow shadow-violet-500/40" />
      <div className="flex flex-col">
        <div className="text-[11px] text-slate-100">{name}</div>
        <div className="text-[10px] text-slate-500">{value}</div>
      </div>
    </div>
  );
}

function TokenType({ name, value }) {
  return (
    <div className="flex flex-col rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1.5">
      <div className="text-[11px] text-slate-100">{name}</div>
      <div className="text-[10px] text-slate-500">{value}</div>
    </div>
  );
}

function LibraryPanel() {
  return (
    <div className="space-y-2">
      <SectionLabel>Team library</SectionLabel>

      <div className="text-[11px] text-slate-300">Connect shared UI kits, icon sets, and brand systems.</div>

      <div className="space-y-1.5">
        <LibraryRow name="Dropple UI Kit" status="Active • Local + Cloud" />
        <LibraryRow name="System Icons / 24px" status="Icons • 320 items" />
        <LibraryRow name="Marketing Components" status="Hero, Pricing, CTA" />
      </div>
    </div>
  );
}

function LibraryRow({ name, status }) {
  return (
    <button className="w-full rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1.5 text-left text-[11px] hover:bg-slate-900/80">
      <div className="text-slate-100">{name}</div>
      <div className="text-[10px] text-slate-500">{status}</div>
    </button>
  );
}
