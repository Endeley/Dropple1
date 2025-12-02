export const uploadAssets = async (files) => {
    const form = new FormData();
    Object.entries(files).forEach(([key, value]) => form.append(key, value));

    const res = await fetch('/api/marketplace/upload', {
        method: 'POST',
        body: form,
    });

    if (!res.ok) throw new Error('Failed to upload assets');
    return await res.json();
};
