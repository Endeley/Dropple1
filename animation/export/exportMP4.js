export const exportMP4 = async (frames) => {
    const res = await fetch('/api/animation/export-mp4', {
        method: 'POST',
        body: JSON.stringify({ frames }),
    });

    return await res.json();
};
