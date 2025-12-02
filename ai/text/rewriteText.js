export const rewriteText = async (input, style) => {
    const res = await fetch('/api/ai/text/rewrite', {
        method: 'POST',
        body: JSON.stringify({ input, style }),
    });

    const { text } = await res.json();
    return text;
};
