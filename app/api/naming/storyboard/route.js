import { NextResponse } from "next/server";
import { generateStoryboard } from "@/lib/naming/storyboard/generateStoryboard";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateStoryboard(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Storyboard Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate storyboard." }, { status: 500 });
  }
}
