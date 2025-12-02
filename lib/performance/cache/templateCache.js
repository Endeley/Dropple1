const templates = new Map();

export const cacheTemplate = (id, data) => templates.set(id, data);
export const getTemplate = (id) => templates.get(id);
export const flushTemplates = () => templates.clear();
