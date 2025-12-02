export function attachStorefront(profile, items = []) {
  return { ...profile, storefront: items };
}
