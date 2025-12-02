const aiMem = [];

export function storeAIInteraction(userId, prompt, output) {
  aiMem.push({ userId, prompt, output, ts: Date.now() });
}

export function recallAI(userId, limit = 10) {
  return aiMem.filter((m) => m.userId === userId).slice(-limit);
}
