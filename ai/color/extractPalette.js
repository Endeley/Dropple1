export const extractPalette = async (file) => {
    const form = new FormData();
    form.append('image', file);

    const res = await fetch('/api/ai/color/extract', {
        method: 'POST',
        body: form,
    });

    const { palette } = await res.json();
    return palette;
};
