export function awardBadge(profile, badge) {
  profile.badges = profile.badges || [];
  if (!profile.badges.includes(badge)) profile.badges.push(badge);
  return profile;
}
