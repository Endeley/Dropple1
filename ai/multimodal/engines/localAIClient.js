export const localAIClient = async (route, payload) => {
    const res = await fetch(`/api/local-ai/${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Local AI endpoint failed');
    }

    const data = await res.json();
    return data.result;
};
