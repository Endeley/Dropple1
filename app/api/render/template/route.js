import { NextResponse } from "next/server";
import { renderTemplate } from "@/lib/render/renderTemplate";

export async function POST(req) {
  try {
    const body = await req.json();
    const image = await renderTemplate(body);

    return NextResponse.json({ ok: true, image });
  } catch (err) {
    console.error("Render Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to render template" }, { status: 500 });
  }
}
