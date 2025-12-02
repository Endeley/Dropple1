"use client";

import { useEffect, useState } from "react";
import { ROLES } from "@/lib/orgs/permissions";

export default function MembersPanel({ org }) {
  const [members, setMembers] = useState(org?.members || []);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState(ROLES.VIEWER);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMembers(org?.members || []);
  }, [org]);

  const invite = async () => {
    setError(null);
    try {
      const res = await fetch("/api/org/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: org.id, userId, role }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Invite failed");
      setMembers(data.org.members || []);
      setUserId("");
    } catch (err) {
      setError(err?.message || "Invite failed");
    }
  };

  const changeRole = async (memberId, nextRole) => {
    setError(null);
    try {
      const res = await fetch("/api/org/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: org.id, userId: memberId, role: nextRole }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) throw new Error(data?.error || "Update role failed");
      setMembers(data.org.members || []);
    } catch (err) {
      setError(err?.message || "Update failed");
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300">Members</h3>
        <div className="flex gap-2">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID / email"
            className="rounded-md border border-white/10 bg-white/5 p-2 text-xs"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2 text-xs"
          >
            {Object.values(ROLES).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            onClick={invite}
            className="rounded-md bg-purple-600 px-3 py-2 text-xs font-semibold text-white hover:bg-purple-700"
            type="button"
          >
            Invite
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}

      <div className="mt-3 space-y-2">
        {members.map((m) => (
          <div
            key={m.userId}
            className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
          >
            <div>
              <p className="font-semibold">{m.userId}</p>
              <p className="text-xs text-white/50">Role: {m.role}</p>
            </div>
            <select
              value={m.role}
              onChange={(e) => changeRole(m.userId, e.target.value)}
              className="rounded-md border border-white/10 bg-white/5 p-1 text-xs"
            >
              {Object.values(ROLES).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ))}
        {!members.length && <p className="text-xs text-white/50">No members yet.</p>}
      </div>
    </div>
  );
}
