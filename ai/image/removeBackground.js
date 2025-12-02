export const removeBackground = async (file) => {
    const form = new FormData();
    form.append('image', file);

    const res = await fetch('/api/ai/image/remove-bg', {
        method: 'POST',
        body: form,
    });

    const { result } = await res.json();
    return result;
};
