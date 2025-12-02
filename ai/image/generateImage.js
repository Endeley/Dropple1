import { useAIStore } from '@/stores/useAIStore';

export const generateImage = async (prompt) => {
    useAIStore.getState().setLoading(true);

    try {
        const res = await fetch('/api/ai/image/generate', {
            method: 'POST',
            body: JSON.stringify({ prompt }),
        });

        const { image } = await res.json();

        useAIStore.getState().setLoading(false);
        return image;
    } catch (err) {
        useAIStore.getState().setError(err);
        useAIStore.getState().setLoading(false);
        return null;
    }
};
