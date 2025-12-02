import { NextResponse } from "next/server";
import { generateVoice } from "@/lib/naming/voice/generateVoice";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateVoice(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Voice Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate voice copy." }, { status: 500 });
  }
}
