export const generatePalette = async (keywords) => {
    const res = await fetch('/api/ai/color/generate', {
        method: 'POST',
        body: JSON.stringify({ keywords }),
    });

    const { palette } = await res.json();
    return palette;
};
