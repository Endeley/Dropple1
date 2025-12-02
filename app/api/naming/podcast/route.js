import { NextResponse } from "next/server";
import { generatePodcastScript } from "@/lib/naming/podcast/generatePodcastScript";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generatePodcastScript(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Podcast Script Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate podcast script." }, { status: 500 });
  }
}
