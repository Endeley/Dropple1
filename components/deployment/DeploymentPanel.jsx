"use client";

import { useState } from "react";
import { buildWeb } from "@/lib/deployment/build/webBuilder";
import { buildDesktop } from "@/lib/deployment/build/desktopBuilder";
import { buildMobile } from "@/lib/deployment/build/mobileBuilder";
import { buildPWA } from "@/lib/deployment/build/pwaBuilder";
import { detectPlatform } from "@/lib/deployment/runtime/platformAdapter";

export default function DeploymentPanel() {
  const [log, setLog] = useState([]);

  const run = (builder, label) => {
    const res = builder({ env: "production" });
    setLog((l) => [...l, `${label}: ${JSON.stringify(res)}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Deployment Engine</h3>
        <span className="text-xs text-white/60">Platform: {detectPlatform()}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => run(buildWeb, "Web build")}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Build Web
        </button>
        <button
          onClick={() => run(buildDesktop, "Desktop build")}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Build Desktop
        </button>
        <button
          onClick={() => run(buildMobile, "Mobile build")}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Build Mobile
        </button>
        <button
          onClick={() => run(buildPWA, "PWA build")}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Build PWA
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
