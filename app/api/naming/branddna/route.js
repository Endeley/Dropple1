import { NextResponse } from "next/server";
import { generateBrandDNA } from "@/lib/naming/brandDNA/generateBrandDNA";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateBrandDNA(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("BrandDNA Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate brand DNA." }, { status: 500 });
  }
}
