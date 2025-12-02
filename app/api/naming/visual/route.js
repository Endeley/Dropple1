import { NextResponse } from "next/server";
import { generateVisualLanguage } from "@/lib/naming/visual/generateVisualLanguage";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateVisualLanguage(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Visual Language Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate visual style language." },
      { status: 500 }
    );
  }
}
