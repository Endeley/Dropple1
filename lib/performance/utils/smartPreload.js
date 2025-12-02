const loaded = new Set();

export const smartPreload = async (url) => {
    if (loaded.has(url)) return;
    await fetch(url, { cache: 'force-cache' });
    loaded.add(url);
};
