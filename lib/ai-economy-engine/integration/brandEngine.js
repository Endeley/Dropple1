export function brandLicenseValue(brand = "default") {
  return { brand, value: brand === "enterprise" ? 100 : 10 };
}
