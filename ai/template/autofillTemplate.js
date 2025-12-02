export const autofillTemplate = async (templateId, userContext) => {
    const res = await fetch('/api/ai/template/autofill', {
        method: 'POST',
        body: JSON.stringify({ templateId, userContext }),
    });

    const { filled } = await res.json();
    return filled;
};
