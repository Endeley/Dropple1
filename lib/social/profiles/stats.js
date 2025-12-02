export function updateStats(profile, delta = {}) {
  profile.stats = profile.stats || { followers: 0, following: 0, posts: 0 };
  Object.keys(delta).forEach((k) => {
    profile.stats[k] = (profile.stats[k] || 0) + delta[k];
  });
  return profile;
}
