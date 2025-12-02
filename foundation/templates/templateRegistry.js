import { TEMPLATE_DEFINITIONS } from "@/canvas/templates/templateDefinitions";

let registry = { ...TEMPLATE_DEFINITIONS };
let remoteLoaded = false;
const listeners = new Set();

function notifyRegistryListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Registry listener error", err);
      }
    }
  });
}

export function getTemplateDefinition(templateId) {
  return registry[templateId];
}

export function updateRegistry(templateId, definition) {
  if (!templateId || !definition) return;
  registry = {
    ...registry,
    [templateId]: definition,
  };
  notifyRegistryListeners();
}

export async function loadRemoteTemplateDefinitions(client, options = {}) {
  const { force = false } = options;
  if (!client) return registry;
  if (remoteLoaded && !force) return registry;

  try {
    const remote = await client.query("templateDefinitions:listTemplateDefinitions");
    if (Array.isArray(remote)) {
      const next = { ...registry };
      remote.forEach((entry) => {
        if (entry?.templateId && entry?.definition) {
          next[entry.templateId] = entry.definition;
        }
      });
      registry = next;
      remoteLoaded = true;
      notifyRegistryListeners();
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to load remote template definitions", err);
    }
  }

  return registry;
}

export function getTemplateRegistry() {
  return registry;
}

export function subscribeToTemplateRegistry(listener) {
  if (typeof listener !== "function") return () => {};
  listeners.add(listener);
  return () => listeners.delete(listener);
}
