import { NextResponse } from "next/server";
import { generateSlogan } from "@/lib/naming/slogan/generateSlogan";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateSlogan(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Slogan Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate slogan." }, { status: 500 });
  }
}
