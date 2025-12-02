"use client";

// Reusable shell for all Dropple workspaces so engines can swap in easily.
export function WorkspaceLayout({ children }) {
  return (
    <div className="relative grid h-screen grid-cols-[260px_1fr_320px] grid-rows-[1fr_auto] bg-[var(--bg-base)] text-[var(--text-primary)] image-workspace-layout">
      {children}
    </div>
  );
}

export function SidebarLeft({ children }) {
  return (
    <aside className="col-start-1 row-span-2 border-r border-[var(--ws-sidebar-hover)] bg-[var(--ws-sidebar-bg)]">
      <div className="h-full overflow-y-auto p-4">{children}</div>
    </aside>
  );
}

export function CanvasArea({ children }) {
  return (
    <section className="relative col-start-2 row-start-1 overflow-hidden bg-[var(--ws-canvas-bg)]">
      {children}
    </section>
  );
}

export function InspectorRight({ children }) {
  return (
    <aside className="col-start-3 row-span-2 border-l border-[var(--ws-inspector-border)] bg-[var(--ws-inspector-bg)]">
      <div className="h-full overflow-y-auto p-4">{children}</div>
    </aside>
  );
}

export function BottomBar({ children }) {
  return (
    <div className="col-start-2 col-span-2 row-start-2 border-t border-neutral-200 bg-[#f7f7f8]">
      {children}
    </div>
  );
}

export function LeftSlideout({ children }) {
  return (
    <div className="pointer-events-none absolute left-[260px] right-[320px] top-3 z-20 flex gap-3 px-4">
      {children}
    </div>
  );
}

export function RightSlideout({ children }) {
  return (
    <div className="pointer-events-none absolute inset-y-3 right-[340px] z-20 flex justify-end gap-3 px-4">
      {children}
    </div>
  );
}

export function PopoutsLayer({ children }) {
  return <div className="pointer-events-none absolute inset-0 z-30">{children}</div>;
}
