import { NextResponse } from "next/server";
import { generateSocialCopy } from "@/lib/naming/social/generateSocialCopy";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateSocialCopy(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Social Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate social content." }, { status: 500 });
  }
}
