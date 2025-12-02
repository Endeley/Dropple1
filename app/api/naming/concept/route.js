import { NextResponse } from "next/server";
import { generateConceptArt } from "@/lib/naming/concept/generateConceptArt";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateConceptArt(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Concept Art Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate concept art direction." }, { status: 500 });
  }
}
