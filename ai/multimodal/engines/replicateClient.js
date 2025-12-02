export const replicateClient = async (model, payload) => {
    const res = await fetch('/api/ai/replicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, payload }),
    });

    if (!res.ok) {
        throw new Error('Replicate call failed');
    }

    const data = await res.json();
    return data.result;
};
