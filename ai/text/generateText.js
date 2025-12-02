export const generateText = async (prompt) => {
    const res = await fetch('/api/ai/text/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
    });

    const { text } = await res.json();
    return text;
};
