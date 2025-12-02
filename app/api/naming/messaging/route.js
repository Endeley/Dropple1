import { NextResponse } from "next/server";
import { generateMessaging } from "@/lib/naming/messaging/generateMessaging";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateMessaging(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Messaging Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate brand messaging." }, { status: 500 });
  }
}
