import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { text = '', target = 'en' } = body || {};
    // Placeholder translation; replace with real AI/translation API.
    const translated = `[${target}] ${text}`;
    return NextResponse.json({ translated });
}
