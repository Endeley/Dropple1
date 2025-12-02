export const openaiClient = async (payload, endpoint) => {
    const res = await fetch(`/api/ai/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`AI request failed: ${errorText}`);
    }

    const data = await res.json();
    return data.result;
};
