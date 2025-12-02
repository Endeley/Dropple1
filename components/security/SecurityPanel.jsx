"use client";

import { useState } from "react";
import { generateKey, wrapKey } from "@/lib/security/crypto/keyManager";
import { encryptData, decryptData } from "@/lib/security/crypto/encryptionService";
import { validatePermissions } from "@/lib/security/sandbox/permissions";
import { runPluginSandbox } from "@/lib/security/sandbox/pluginSandbox";
import { secureWebSocketMessage } from "@/lib/security/network/secureWS";
import { logEvent, getRecentEvents } from "@/lib/security/audits/eventLogs";

export default function SecurityPanel() {
  const [cipher, setCipher] = useState(null);
  const [logs, setLogs] = useState([]);

  const doEncrypt = () => {
    const key = generateKey();
    const enc = encryptData("secure-data", key);
    const wrapped = wrapKey(key, generateKey());
    setCipher({ enc, wrapped });
  };

  const doDecrypt = () => {
    if (!cipher?.enc || !cipher?.wrapped) return;
    const key = decryptData(cipher.wrapped, generateKey()); // This would fail in real life due to wrong key; placeholder only.
    try {
      const dec = decryptData(cipher.enc, key);
      setLogs((l) => [...l, `Decrypted: ${dec}`]);
    } catch {
      setLogs((l) => [...l, "Decrypt failed (placeholder expected)."]);
    }
  };

  const checkPerms = () => {
    const res = validatePermissions({ permissions: ["scene:read", "layers:modify"] }, ["scene:read"]);
    setLogs((l) => [...l, `Perms ok: ${res.ok}, unauthorized: ${res.unauthorized.join(",")}`]);
  };

  const sandbox = () => {
    const res = runPluginSandbox({ permissions: ["scene:read"] }, "console.log('hi');");
    setLogs((l) => [...l, `Sandbox ok: ${res.ok}`]);
  };

  const signMsg = () => {
    const m = secureWebSocketMessage({ type: "cursor" }, "token123");
    setLogs((l) => [...l, `Signed message: ${JSON.stringify(m)}`]);
  };

  const addEvent = () => {
    logEvent({ type: "security", note: "Test event" });
    setLogs((l) => [...l, "Event logged"]);
  };

  const fetchEvents = () => {
    const ev = getRecentEvents();
    setLogs((l) => [...l, `Events: ${JSON.stringify(ev)}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Security Engine</h3>
        <div className="flex gap-2">
          <button onClick={doEncrypt} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Encrypt
          </button>
          <button onClick={doDecrypt} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Decrypt
          </button>
          <button onClick={checkPerms} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Permissions
          </button>
          <button onClick={sandbox} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Sandbox
          </button>
          <button onClick={signMsg} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Sign
          </button>
          <button onClick={addEvent} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Log Event
          </button>
          <button onClick={fetchEvents} className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700" type="button">
            Fetch Events
          </button>
        </div>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {logs.join("\n")}
      </pre>
    </div>
  );
}
