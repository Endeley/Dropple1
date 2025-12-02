import { NextResponse } from "next/server";
import { generateLongform } from "@/lib/naming/longform/generateLongform";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateLongform(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Longform Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate long-form content." }, { status: 500 });
  }
}
