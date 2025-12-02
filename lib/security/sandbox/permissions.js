export function validatePermissions(manifest = {}, allowed = []) {
  const requested = manifest.permissions || [];
  const unauthorized = requested.filter((p) => !allowed.includes(p));
  return { ok: unauthorized.length === 0, unauthorized };
}
