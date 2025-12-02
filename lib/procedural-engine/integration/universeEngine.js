export function publishUniverseProcedural(universe, payload = {}) {
  return { universeId: universe.id || "universe", payload, status: "published" };
}
