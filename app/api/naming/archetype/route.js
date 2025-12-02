import { NextResponse } from "next/server";
import { generateArchetype } from "@/lib/naming/archetype/generateArchetype";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateArchetype(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Archetype Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate brand archetype." }, { status: 500 });
  }
}
