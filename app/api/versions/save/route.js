import { NextResponse } from 'next/server';

// Placeholder API to accept version snapshots; real persistence handled via Convex mutation on the server.
export async function POST(req) {
    const body = await req.json();
    // Echo back a dummy version number
    return NextResponse.json({ version: Date.now(), received: body });
}
