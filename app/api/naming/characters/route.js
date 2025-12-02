import { NextResponse } from "next/server";
import { generatePersona } from "@/lib/naming/characters/generatePersona";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generatePersona(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Character Persona Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate character persona." },
      { status: 500 }
    );
  }
}
