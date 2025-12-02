import { NextResponse } from 'next/server';

// Placeholder list endpoint; hook to Convex query in a real deployment.
export async function GET() {
    return NextResponse.json({ versions: [] });
}
