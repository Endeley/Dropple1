export const applyAIFilter = async (file, filter) => {
    const form = new FormData();
    form.append('image', file);
    form.append('filter', filter);

    const res = await fetch('/api/ai/image/filter', {
        method: 'POST',
        body: form,
    });

    const { result } = await res.json();
    return result;
};
