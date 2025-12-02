"use client";

import AIModeSwitcher from "./AIModeSwitcher";

export default function AITopBar() {
  return (
    <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 backdrop-blur-xl bg-white/[0.03]">
      <h1 className="text-lg font-semibold">Dropple AI Studio</h1>
      <AIModeSwitcher />
    </div>
  );
}
