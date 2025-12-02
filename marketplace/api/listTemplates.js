export const listTemplates = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`/api/marketplace/list?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load templates');
    return await res.json();
};
