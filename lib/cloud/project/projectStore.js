export function createProject({ name = "Untitled Project" }) {
  return {
    id: `proj_${Math.random().toString(36).slice(2, 8)}`,
    name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    versions: [],
  };
}

export function addVersion(project, note = "autosave") {
  const v = {
    id: `ver_${Math.random().toString(36).slice(2, 8)}`,
    note,
    createdAt: Date.now(),
  };
  return { ...project, versions: [v, ...(project.versions || [])], updatedAt: Date.now() };
}
