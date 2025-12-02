export const ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  EDITOR: "editor",
  CONTRIBUTOR: "contributor",
  VIEWER: "viewer",
  GUEST: "guest",
};

const matrix = {
  editProjects: [ROLES.OWNER, ROLES.ADMIN, ROLES.EDITOR],
  comment: [ROLES.OWNER, ROLES.ADMIN, ROLES.EDITOR, ROLES.CONTRIBUTOR, ROLES.VIEWER],
  invite: [ROLES.OWNER, ROLES.ADMIN],
  billing: [ROLES.OWNER],
  manageLibraries: [ROLES.OWNER, ROLES.ADMIN, ROLES.EDITOR],
  manageBrandKit: [ROLES.OWNER, ROLES.ADMIN],
  manageTokens: [ROLES.OWNER, ROLES.ADMIN, ROLES.EDITOR],
};

export function can(role, action) {
  const allowed = matrix[action] || [];
  return allowed.includes(role);
}
