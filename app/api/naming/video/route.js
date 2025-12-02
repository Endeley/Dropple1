import { NextResponse } from "next/server";
import { generateVideoMetadata } from "@/lib/naming/video/generateVideoMetadata";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateVideoMetadata(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Video Metadata Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate video metadata." },
      { status: 500 }
    );
  }
}
