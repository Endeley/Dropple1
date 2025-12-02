import { NextResponse } from "next/server";
import { generateTemplateTheme } from "@/lib/naming/templates/generateTemplateTheme";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateTemplateTheme(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Template Theme Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate template theme." },
      { status: 500 }
    );
  }
}
