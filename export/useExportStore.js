import { create } from 'zustand';

export const useExportStore = create((set) => ({
    format: 'pdf',
    dpi: 300,
    bleed: 3,
    colorProfile: 'Fogra39',
    cmyk: true,

    setFormat: (format) => set({ format }),
    setDPI: (dpi) => set({ dpi }),
    setBleed: (bleed) => set({ bleed }),
    setColorProfile: (profile) => set({ colorProfile: profile }),
    setCMYK: (cmyk) => set({ cmyk }),
}));
