import { NextResponse } from "next/server";
import { generateLivestream } from "@/lib/naming/livestream/generateLivestream";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateLivestream(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Livestream Engine Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate livestream outline." },
      { status: 500 }
    );
  }
}
