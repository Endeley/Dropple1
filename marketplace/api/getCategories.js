export const getCategories = async () => {
    const res = await fetch('/api/marketplace/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
};
