export const getCreator = async (id) => {
    const res = await fetch(`/api/marketplace/creator?id=${id}`);
    if (!res.ok) throw new Error('Creator not found');
    return await res.json();
};
