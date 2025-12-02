export const purchaseTemplate = async (templateId) => {
    const res = await fetch('/api/marketplace/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId }),
    });

    if (!res.ok) throw new Error('Purchase failed');
    return await res.json();
};
