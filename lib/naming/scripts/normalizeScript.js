export function normalizeScript(data = {}) {
  return {
    title_options: Array.isArray(data.title_options) ? data.title_options : [],
    logline: data.logline || "",
    hook: data.hook || "",
    outline: Array.isArray(data.outline) ? data.outline : [],
    script: data.script || "",
    short_version: data.short_version || "",
    cta: data.cta || "",
    notes: data.notes || "",
  };
}
