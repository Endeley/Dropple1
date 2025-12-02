import { NextResponse } from 'next/server';

const TYPE_MAP = [
    { key: 'hero', type: 'hero' },
    { key: 'feature', type: 'features' },
    { key: 'gallery', type: 'gallery' },
    { key: 'pricing', type: 'pricing' },
    { key: 'cta', type: 'cta' },
];

export async function POST(req) {
    const body = await req.json();
    const { prompt = '' } = body || {};
    const lowered = prompt.toLowerCase();
    const match = TYPE_MAP.find((m) => lowered.includes(m.key));
    const layoutType = match?.type || 'hero';

    // Placeholder layout definition; the client will map type to its layout engine.
    const layoutDefinition = {
        type: 'frame',
        layout: 'vertical',
        spacing: 16,
        padding: { top: 48, right: 48, bottom: 48, left: 48 },
        children: [
            { type: 'heading', text: `AI Layout: ${layoutType}` },
            { type: 'subtext', text: `Built from prompt: "${prompt || 'layout'}"` },
            { type: 'button', text: 'Call to action' },
        ],
    };

    return NextResponse.json({
        layoutType,
        layoutDefinition,
    });
}
