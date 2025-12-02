export function buildSocialProfile(globalProfile, handles = {}) {
  return { ...globalProfile, handles, followers: 0, following: 0 };
}
