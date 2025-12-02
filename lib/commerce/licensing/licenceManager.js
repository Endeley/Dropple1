export function checkLicence(assetId, usageContext, licence = "personal") {
  // Placeholder: simple ruleset.
  if (licence === "personal") return { ok: usageContext === "personal" };
  return { ok: true };
}
