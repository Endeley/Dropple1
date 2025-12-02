export async function POST(req) {
    const body = await req.json();
    const { type = 'headline', tone = 'Friendly' } = body || {};

    const defaults = {
        headline: 'Design smarter, ship faster.',
        subheader: 'AI layouts, smart tools, and instant exports for every team.',
        paragraph: 'Dropple gives you pro-grade editing, AI layouts, and collaboration in one canvas.',
        cta: 'Get started',
    };

    const base = defaults[type] || defaults.headline;
    const output = `${base} (${tone})`;
    return Response.json({ output });
}
