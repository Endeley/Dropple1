export function buildMarketplaceProfile(globalProfile, seller = false) {
  return { ...globalProfile, seller, sales: 0 };
}
