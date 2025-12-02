import { create } from 'zustand';

export const useAIStore = create((set, get) => ({
    isProcessing: false,
    queue: [],
    aiResults: {},

    enqueue: (task) => set((state) => ({ queue: [...state.queue, task] })),
    dequeue: () => {
        const [first, ...rest] = get().queue;
        set({ queue: rest });
        return first;
    },
    setProcessing: (isProcessing) => set({ isProcessing }),
    cacheResult: (id, data) =>
        set((state) => ({ aiResults: { ...state.aiResults, [id]: data } })),
}));
