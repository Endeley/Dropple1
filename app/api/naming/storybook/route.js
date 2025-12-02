import { NextResponse } from "next/server";
import { generateStorybook } from "@/lib/naming/storybook/generateStorybook";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateStorybook(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Storybook Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate storybook." }, { status: 500 });
  }
}
