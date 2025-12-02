export const createTemplate = async (formData) => {
    const res = await fetch('/api/marketplace/create', {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error('Failed to create template');
    return await res.json();
};
