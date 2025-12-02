import { create } from 'zustand';

export const useTemplateStore = create((set) => ({
    templates: [],
    selectedTemplate: null,

    setTemplates: (templates) => set({ templates }),
    selectTemplate: (templateId) => set({ selectedTemplate: templateId }),
    addTemplate: (template) => set((state) => ({ templates: [...state.templates, template] })),
}));
