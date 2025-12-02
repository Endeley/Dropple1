import { NextResponse } from "next/server";
import { generateProductCopy } from "@/lib/naming/product/generateProductCopy";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateProductCopy(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Product Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate product description." }, { status: 500 });
  }
}
