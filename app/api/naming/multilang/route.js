import { NextResponse } from "next/server";
import { generateMultiLang } from "@/lib/naming/multilang/generateMultiLang";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateMultiLang(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("MultiLang Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate multilingual copy." },
      { status: 500 }
    );
  }
}
