import { getDocument, markSaved } from "./documentManager";

const timers = new Map();
const autosaves = new Map(); // id -> latest autosave blob/string

export function listAutosaves() {
  return Array.from(autosaves.entries()).map(([id, entry]) => ({ id, ...entry }));
}

export function saveAutosave(id, payload) {
  autosaves.set(id, {
    timestamp: Date.now(),
    data: payload,
  });
}

export function startAutosave(id, interval = 30000, saver) {
  stopAutosave(id);
  timers.set(
    id,
    setInterval(async () => {
      const doc = getDocument(id);
      if (!doc || !doc.dirty) return;
      if (saver) {
        try {
          const data = await saver(doc);
          saveAutosave(id, { data, name: doc.name });
        } catch (err) {
          console.error("Autosave error", err);
        }
      } else {
        saveAutosave(id, { data: doc.model, name: doc.name });
      }
      markSaved(id);
    }, interval)
  );
}

export function stopAutosave(id) {
  const t = timers.get(id);
  if (t) clearInterval(t);
  timers.delete(id);
}

export function stopAllAutosaves() {
  timers.forEach((t) => clearInterval(t));
  timers.clear();
}
