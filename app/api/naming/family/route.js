import { NextResponse } from "next/server";
import { generateFamily } from "@/lib/naming/family/generateFamily";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateFamily(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Family Naming Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate name family." }, { status: 500 });
  }
}
