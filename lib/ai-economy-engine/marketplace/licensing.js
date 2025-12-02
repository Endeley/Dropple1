export function assignLicense(assetId, license = "personal") {
  return { assetId, license, assignedAt: Date.now() };
}
