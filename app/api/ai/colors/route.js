import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { prompt = 'modern', harmony = 'Complementary' } = body || {};

    // Placeholder palette generator; replace with real AI + image extraction.
    const palette = ['#0f172a', '#1e293b', '#334155', '#e2e8f0'];
    const accents = ['#8b5cf6', '#fbbf24', '#22d3ee'];
    const background = '#0b1120';

    return NextResponse.json({
        themes: [
            {
                prompt,
                harmony,
                palette,
                accents,
                background,
            },
        ],
    });
}
