import { NextResponse } from "next/server";
import { generateRewrite } from "@/lib/naming/rewrite/generateRewrite";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateRewrite(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Rewrite Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to rewrite text." }, { status: 500 });
  }
}
