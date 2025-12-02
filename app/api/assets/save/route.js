import { NextResponse } from "next/server";
import convex from "@/convex";
import { fetchMutation } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = auth();
    const assets = Array.isArray(body?.assets) ? body.assets : [];
    await fetchMutation(convex.assets.saveAssets, {
      assets: assets.map((a) => ({ ...a, ownerId: a.ownerId || userId || null })),
    });
    return NextResponse.json({ ok: true, count: assets.length });
  } catch (err) {
    console.error("Asset save error", err);
    return NextResponse.json({ ok: false, error: "Failed to save assets" }, { status: 500 });
  }
}

