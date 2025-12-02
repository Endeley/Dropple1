"use client";

import { useState } from "react";
import { createIdentity, switchPersona } from "@/lib/identity-engine/core/identityManager";
import { addPersona, listPersonas } from "@/lib/identity-engine/core/personaEngine";
import { createAvatar, bindAvatar } from "@/lib/identity-engine/core/avatarEngine";
import { setSessionPresence, listSessionPresence } from "@/lib/identity-engine/presence/sessionPresence";
import { recommendPersona } from "@/lib/identity-engine/ai/personaAI";
import { summarizeIdentity } from "@/lib/identity-engine/ai/identityAI";

export default function IdentityPanel() {
  const [log, setLog] = useState([]);
  const [identity, setIdentity] = useState(null);

  const demo = () => {
    const id = createIdentity("user_1", { name: "Dropple User" });
    const persona = addPersona(id, { id: "creator", prefs: {} });
    const avatar = createAvatar("3d");
    bindAvatar(id, avatar);
    switchPersona(id.userId, persona.id);
    setSessionPresence("session_1", id.userId, { tool: "pen" });
    const presence = listSessionPresence("session_1");
    const summary = summarizeIdentity(id);
    const suggestion = recommendPersona("animation");

    setIdentity(id);
    setLog((l) => [
      ...l,
      `Identity created for ${id.userId}`,
      `Personas: ${listPersonas(id).length}`,
      `Active persona: ${persona.id}`,
      `Avatar style: ${avatar.style}`,
      `Presence count: ${presence.length}`,
      `Summary: personas=${summary.personas}`,
      `Suggested persona: ${suggestion}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Identity Engine</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
