export function splitTeamRevenue(amount = 0, teamSize = 1) {
  const share = Number((amount / Math.max(1, teamSize)).toFixed(2));
  return Array.from({ length: teamSize }).map((_, i) => ({ member: i + 1, share }));
}
