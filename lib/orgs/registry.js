import { ROLES } from "./permissions";

const store = {
  orgs: {},
};

const randomId = (prefix = "org") => `${prefix}_${Math.random().toString(36).slice(2, 8)}`;

export function createOrg(payload = {}) {
  const id = payload.id || randomId();
  const now = Date.now();
  const org = {
    id,
    name: payload.name || "New Organization",
    createdAt: now,
    updatedAt: now,
    owner: payload.owner || null,
    members: payload.members || (payload.owner ? [{ userId: payload.owner, role: ROLES.OWNER }] : []),
    projects: [],
    libraries: [],
    brandkits: [],
    uikits: [],
    templates: [],
    activity: [],
    billing: payload.billing || { plan: "free", seats: 1, seatsUsed: 1, invoices: [] },
  };
  store.orgs[id] = org;
  logActivity(id, { type: "org.create", actor: payload.owner, message: `Created org ${org.name}` });
  return org;
}

export function listOrgs() {
  return Object.values(store.orgs);
}

export function getOrg(id) {
  return store.orgs[id] || null;
}

export function inviteMember(orgId, userId, role = ROLES.VIEWER) {
  const org = getOrg(orgId);
  if (!org) throw new Error("Org not found");
  const existing = org.members.find((m) => m.userId === userId);
  if (existing) {
    existing.role = role;
  } else {
    org.members.push({ userId, role });
  }
  org.updatedAt = Date.now();
  logActivity(orgId, { type: "member.invite", actor: userId, message: `Invited ${userId} as ${role}` });
  return org;
}

export function updateRole(orgId, userId, role) {
  const org = getOrg(orgId);
  if (!org) throw new Error("Org not found");
  const member = org.members.find((m) => m.userId === userId);
  if (!member) throw new Error("Member not found");
  member.role = role;
  org.updatedAt = Date.now();
  logActivity(orgId, { type: "member.role", actor: userId, message: `Role updated to ${role}` });
  return org;
}

export function addProject(orgId, project) {
  const org = getOrg(orgId);
  if (!org) throw new Error("Org not found");
  const proj = {
    id: project.id || randomId("prj"),
    name: project.name || "New Project",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    owner: project.owner || null,
    visibility: project.visibility || "team",
  };
  org.projects.push(proj);
  org.updatedAt = Date.now();
  logActivity(orgId, { type: "project.create", actor: project.owner, message: `Created project ${proj.name}` });
  return proj;
}

export function logActivity(orgId, entry) {
  const org = getOrg(orgId);
  if (!org) return null;
  const item = { id: randomId("act"), createdAt: Date.now(), ...entry };
  org.activity.unshift(item);
  org.activity = org.activity.slice(0, 200);
  return item;
}
