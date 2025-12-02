const aiCache = new Map();

export const rememberAI = (prompt, result) => aiCache.set(prompt, result);
export const recallAI = (prompt) => aiCache.get(prompt);
export const clearAICache = () => aiCache.clear();
