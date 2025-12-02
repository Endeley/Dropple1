export function createGlobalProfile({ name, bio = "" }) {
  return { name, bio, links: [], badges: [] };
}
