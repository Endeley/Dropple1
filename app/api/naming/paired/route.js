import { NextResponse } from "next/server";
import { generatePaired } from "@/lib/naming/paired/generatePaired";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generatePaired(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Paired Naming Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate paired naming systems." },
      { status: 500 }
    );
  }
}
