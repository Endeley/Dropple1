import { NextResponse } from "next/server";
import { generateNames } from "@/lib/naming/generateNames";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, tone, keywords, language, count } = body || {};

    const results = await generateNames({
      type,
      tone,
      keywords,
      language,
      count: count || 12,
    });

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    console.error("Naming API Error:", error);
    return NextResponse.json({ ok: false, error: "Failed to generate names." }, { status: 500 });
  }
}
