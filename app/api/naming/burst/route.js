import { NextResponse } from "next/server";
import { generateBurst } from "@/lib/naming/burst/generateBurst";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateBurst(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Burst Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate burst names." }, { status: 500 });
  }
}
