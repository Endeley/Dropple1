import { NextResponse } from "next/server";
import { generateRepurposedContent } from "@/lib/naming/repurpose/generateRepurposedContent";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateRepurposedContent(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Repurpose Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to repurpose content." }, { status: 500 });
  }
}
