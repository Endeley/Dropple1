"use client";

import { useEffect, useState } from "react";
import { getAllTokens, onTokens, patchTokens } from "@/lib/tokens/tokenStore";
import ColorTokens from "./ColorTokens";
import TypographyTokens from "./TypographyTokens";
import RadiusTokens from "./RadiusTokens";
import MotionTokens from "./MotionTokens";

export default function TokenPanel() {
  const [tokens, setTokens] = useState(getAllTokens());

  useEffect(() => {
    const unsub = onTokens(setTokens);
    return () => unsub && unsub();
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-xl text-purple-300">Token Engine 2.0</h2>
      <p className="text-sm text-white/60">Cascading tokens across org, team, brand, theme, UI kit, and components.</p>
      <div className="mt-4 grid gap-4">
        <ColorTokens scope="theme" tokens={tokens.theme} onChange={(patch) => patchTokens("theme", patch)} />
        <TypographyTokens scope="theme" tokens={tokens.theme} onChange={(patch) => patchTokens("theme", patch)} />
        <RadiusTokens scope="uikit" tokens={tokens.uikit} onChange={(patch) => patchTokens("uikit", patch)} />
        <MotionTokens scope="theme" tokens={tokens.theme} onChange={(patch) => patchTokens("theme", patch)} />
      </div>
    </div>
  );
}
