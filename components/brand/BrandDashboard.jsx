"use client";

import { useEffect, useState } from "react";
import BrandAISettings from "./BrandAISettings";
import AuditPanel from "./AuditPanel";
import TokenManager from "./TokenManager";
import ColorManager from "./ColorManager";
import TypographyManager from "./TypographyManager";
import LogoManager from "./LogoManager";
import TemplateManager from "./TemplateManager";

export default function BrandDashboard() {
  const [brands, setBrands] = useState([]);
  const [active, setActive] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await fetch("/api/brand/list");
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Failed to load brands");
      setBrands(data.brands || []);
      if (data.brands?.[0]) setActive(data.brands[0]);
    } catch (err) {
      setError(err?.message || "Failed to load brands");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    setError(null);
    try {
      const res = await fetch("/api/brand/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Failed to create brand");
      setName("");
      await load();
    } catch (err) {
      setError(err?.message || "Create failed");
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-purple-300">Brand Cloud Engine</h2>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New brand name"
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          />
          <button
            onClick={create}
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold hover:bg-purple-700"
            type="button"
          >
            Create
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-2">
          <p className="text-sm text-white/70">Brands</p>
          <div className="space-y-2">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => setActive(b)}
                className={`flex w-full justify-between rounded-md border border-white/10 px-3 py-2 text-left text-sm ${
                  active?.id === b.id ? "bg-purple-600/30 border-purple-400/40" : "bg-black/30"
                }`}
              >
                <span>{b.name}</span>
                <span className="text-xs text-white/50">v{b.rules_version || 1}</span>
              </button>
            ))}
            {!brands.length && <p className="text-xs text-white/50">No brands yet.</p>}
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          {active ? (
            <>
              <ColorManager brand={active} />
              <TypographyManager brand={active} />
              <TokenManager brand={active} />
              <LogoManager brand={active} />
              <TemplateManager brand={active} />
              <AuditPanel brand={active} />
              <BrandAISettings brand={active} />
            </>
          ) : (
            <p className="text-sm text-white/60">Select or create a brand to manage settings.</p>
          )}
        </div>
      </div>
    </div>
  );
}
