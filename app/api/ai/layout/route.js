import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { thumbnail } = body || {};
    return NextResponse.json({
        suggestions: [
            'Increase spacing between cards for better readability.',
            'Left-align related text layers for stronger hierarchy.',
            'Center the hero headline visually.',
            'Distribute icons evenly.',
            'Add top padding to balance white space.',
        ],
        thumbnail,
    });
}
