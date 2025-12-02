import { NextResponse } from "next/server";
import { generateAdVariants } from "@/lib/naming/ads/generateAdVariants";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateAdVariants(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Ad Generator Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate ad variants." }, { status: 500 });
  }
}
