"use client";

import { useEffect, useState } from "react";
import MembersPanel from "./MembersPanel";
import ActivityFeed from "./ActivityFeed";

export default function TeamDashboard() {
  const [orgs, setOrgs] = useState([]);
  const [activeOrg, setActiveOrg] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await fetch("/api/org/list");
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Failed to load orgs");
      setOrgs(data.orgs || []);
      if (data.orgs?.[0]) setActiveOrg(data.orgs[0]);
    } catch (err) {
      setError(err?.message || "Failed to load orgs");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createOrg = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/org/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Failed to create org");
      setName("");
      await load();
    } catch (err) {
      setError(err?.message || "Failed to create org");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-purple-300">Team Workspace</h2>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New org name"
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          />
          <button
            onClick={createOrg}
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold hover:bg-purple-700"
            type="button"
          >
            {loading ? "Creating…" : "Create"}
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-2">
          <p className="text-sm text-white/70">Organizations</p>
          <div className="space-y-2">
            {orgs.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveOrg(o)}
                className={`flex w-full justify-between rounded-md border border-white/10 px-3 py-2 text-left text-sm ${
                  activeOrg?.id === o.id ? "bg-purple-600/30 border-purple-400/40" : "bg-black/30"
                }`}
              >
                <span>{o.name}</span>
                <span className="text-xs text-white/50">{o.members?.length || 0} members</span>
              </button>
            ))}
            {!orgs.length && <p className="text-xs text-white/50">No organizations yet.</p>}
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          {activeOrg ? (
            <>
              <MembersPanel org={activeOrg} />
              <ActivityFeed org={activeOrg} />
            </>
          ) : (
            <p className="text-sm text-white/60">Select or create an organization to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
