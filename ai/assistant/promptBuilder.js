export const buildPrompt = (task, context) => {
    return `${task}\nContext: ${JSON.stringify(context)}`;
};
