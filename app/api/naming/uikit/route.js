import { NextResponse } from "next/server";
import { generateUIKit } from "@/lib/naming/uikit/generateUIKit";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateUIKit(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("UI Kit Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate UI kit." }, { status: 500 });
  }
}
