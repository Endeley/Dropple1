import { create } from 'zustand';

export const useCloudStore = create((set) => ({
    projectId: null,
    saving: false,
    lastSaved: null,
    projectData: null,

    setProjectId: (id) => set({ projectId: id }),
    setProjectData: (data) => set({ projectData: data }),
    setSaving: (saving) => set({ saving }),
    setLastSaved: (time) => set({ lastSaved: time }),
}));
