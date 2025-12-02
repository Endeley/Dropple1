import { create } from 'zustand';

export const useBillingStore = create((set) => ({
    plan: 'free',
    credits: 0,
    usage: {},
    loading: false,

    setPlan: (plan) => set({ plan }),
    setCredits: (credits) => set({ credits }),
    setUsage: (usage) => set({ usage }),
    setLoading: (loading) => set({ loading }),
}));
