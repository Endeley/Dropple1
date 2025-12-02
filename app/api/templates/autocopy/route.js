import { NextResponse } from "next/server";
import { generateTemplateCopy } from "@/lib/templates/autoCopy/generateTemplateCopy";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateTemplateCopy(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("AutoCopy Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate template copy." }, { status: 500 });
  }
}
