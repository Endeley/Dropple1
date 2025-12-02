export const upscaleImage = async (file, scale = 2) => {
    const form = new FormData();
    form.append('image', file);
    form.append('scale', scale);

    const res = await fetch('/api/ai/image/upscale', {
        method: 'POST',
        body: form,
    });

    const { result } = await res.json();
    return result;
};
