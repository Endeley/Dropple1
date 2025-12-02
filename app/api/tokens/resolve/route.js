import { NextResponse } from "next/server";
import { resolveToken } from "@/lib/tokens/cascade";

export async function POST(req) {
  try {
    const body = await req.json();
    const { key, context } = body || {};
    if (!key) return NextResponse.json({ ok: false, error: "Missing token key" }, { status: 400 });
    const value = resolveToken(key, context || {});
    return NextResponse.json({ ok: true, value });
  } catch (err) {
    console.error("Token resolve error", err);
    return NextResponse.json({ ok: false, error: "Failed to resolve token" }, { status: 500 });
  }
}
