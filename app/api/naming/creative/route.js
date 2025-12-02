import { NextResponse } from "next/server";
import { generateCreativeDirection } from "@/lib/naming/creative/generateCreativeDirection";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateCreativeDirection(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Creative Direction Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate creative direction." }, { status: 500 });
  }
}
