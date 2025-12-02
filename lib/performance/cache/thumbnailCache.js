const thumbs = new Map();

export const setThumbnail = (id, url) => thumbs.set(id, url);
export const getThumbnail = (id) => thumbs.get(id);
export const clearThumbnails = () => thumbs.clear();
