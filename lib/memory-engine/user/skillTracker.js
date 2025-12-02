const skills = new Map();

export function trackSkill(skill, delta = 1) {
  skills.set(skill, (skills.get(skill) || 0) + delta);
}

export function getSkills() {
  return Array.from(skills.entries());
}
