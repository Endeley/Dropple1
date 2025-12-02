import { NextResponse } from "next/server";
import { generateScript } from "@/lib/naming/scripts/generateScript";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateScript(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Script Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate script." }, { status: 500 });
  }
}
