"use client";

import { AppWindow, LayoutTemplate, Monitor, Search, Smartphone, X } from "lucide-react";
import { usePanelsStore } from "@/stores/panelsStore";

export default function TemplateBrowserSlideout() {
  const open = usePanelsStore((s) => s.templateBrowserOpen);
  const close = usePanelsStore((s) => s.closeTemplateBrowser);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 flex justify-end transition-opacity duration-150 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex-1" />

      <div
        className={`pointer-events-auto h-full w-full max-w-xl transform border-l border-slate-800 bg-slate-950/98 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.9)] transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-900 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/90 text-[11px] text-white shadow shadow-violet-600/50">
              <LayoutTemplate className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[12px] font-medium text-slate-100">UI/UX Templates</div>
              <div className="text-[11px] text-slate-500">Dashboards, onboarding, settings, pricing, & more.</div>
            </div>
          </div>
          <button
            onClick={close}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-900/80 text-slate-400 hover:bg-slate-800/90 hover:text-slate-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-2 border-b border-slate-900 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-800 bg-slate-950/90 px-2 py-1.5 text-[11px] text-slate-200">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <input
                className="flex-1 bg-transparent outline-none placeholder:text-slate-600"
                placeholder="Find templates: dashboard, onboarding, auth, pricing…"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <FilterChip active>All</FilterChip>
            <FilterChip>Dashboard</FilterChip>
            <FilterChip>Onboarding</FilterChip>
            <FilterChip>Auth</FilterChip>
            <FilterChip>Settings</FilterChip>
            <FilterChip>Tables</FilterChip>
          </div>

          <div className="flex gap-1.5 text-[10px] text-slate-400">
            <DeviceChip icon={Monitor}>Desktop</DeviceChip>
            <DeviceChip icon={Smartphone}>Mobile</DeviceChip>
            <DeviceChip icon={AppWindow}>Web app</DeviceChip>
          </div>
        </div>

        <div className="h-[calc(100%-5.5rem)] overflow-auto px-3 py-3">
          <div className="grid grid-cols-2 gap-3">
            <TemplateCard title="SaaS Analytics Dashboard" tag="Dashboard" badge="New" />
            <TemplateCard title="Team Workspace Layout" tag="Dashboard" accent="fuchsia" />
            <TemplateCard title="Onboarding Flow (3 steps)" tag="Onboarding" />
            <TemplateCard title="Sign in / Sign up" tag="Auth" />
            <TemplateCard title="Billing & Plans" tag="Settings" />
            <TemplateCard title="Data Table + Filters" tag="Tables" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ children, active }) {
  return (
    <button
      className={`rounded-full border px-2 py-0.5 ${
        active
          ? "border-violet-500 bg-violet-600/20 text-violet-50"
          : "border-slate-800 bg-slate-950/80 text-slate-300 hover:bg-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

function DeviceChip({ icon: Icon, children }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-slate-300 hover:bg-slate-900">
      <Icon className="h-3 w-3" />
      {children}
    </button>
  );
}

function TemplateCard({ title, tag, badge, accent = "violet" }) {
  const accentClass =
    accent === "fuchsia"
      ? "from-fuchsia-500/60 via-slate-900 to-sky-500/40 border-fuchsia-400/50 shadow-fuchsia-500/30"
      : "from-violet-500/60 via-slate-900 to-sky-500/40 border-violet-400/50 shadow-violet-500/30";

  return (
    <button className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 transition hover:border-violet-500/70 hover:bg-slate-900/90">
      <div className={`relative h-28 w-full bg-gradient-to-br ${accentClass} shadow-[0_0_24px]`}>
        <div className="absolute inset-1 flex flex-col rounded-lg border border-slate-800/60 bg-slate-950/80">
          <div className="flex h-4 items-center gap-1 border-b border-slate-800/70 px-2">
            <div className="h-2 w-8 rounded-full bg-slate-700/80" />
            <div className="h-2 w-16 rounded-full bg-slate-700/60" />
            <div className="ml-auto h-2 w-10 rounded-full bg-slate-700/50" />
          </div>
          <div className="flex flex-1 gap-1.5 px-2 py-1">
            <div className="w-14 space-y-1.5">
              <div className="h-2.5 rounded bg-slate-800/80" />
              <div className="h-2.5 rounded bg-slate-800/70" />
              <div className="h-2.5 rounded bg-slate-800/70" />
            </div>
            <div className="flex flex-1 flex-col space-y-1.5">
              <div className="h-5 rounded bg-slate-800/80" />
              <div className="grid flex-1 grid-cols-2 gap-1.5">
                <div className="h-7 rounded bg-slate-800/80" />
                <div className="h-7 rounded bg-slate-800/80" />
                <div className="h-7 rounded bg-slate-800/80" />
                <div className="h-7 rounded bg-slate-800/80" />
              </div>
            </div>
          </div>
        </div>

        {badge && (
          <div className="absolute right-1.5 top-1.5 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[9px] font-medium text-slate-950">
            {badge}
          </div>
        )}
      </div>

      <div className="px-2 py-2 text-left">
        <div className="mb-0.5 flex items-center justify-between">
          <div className="line-clamp-2 text-[11px] text-slate-100">{title}</div>
          <span className="ml-1 rounded-full border border-slate-800 bg-slate-900 px-1.5 py-0.5 text-[9px] text-slate-400">
            {tag}
          </span>
        </div>
        <div className="text-[10px] text-slate-500">Auto-layout • Variants • Responsive</div>
      </div>
    </button>
  );
}
