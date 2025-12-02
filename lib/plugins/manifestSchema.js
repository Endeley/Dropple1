export const manifestSchema = {
  required: ["name", "id", "version", "entry"],
  optional: ["author", "description", "permissions", "ui", "actions"],
};

export function validateManifest(manifest = {}) {
  const missing = manifestSchema.required.filter((key) => !manifest[key]);
  if (missing.length) {
    return { ok: false, error: `Missing fields: ${missing.join(", ")}` };
  }
  return { ok: true };
}
