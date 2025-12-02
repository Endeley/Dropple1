import { NextResponse } from "next/server";
import { createBrand } from "@/lib/brandcloud/registry";

export async function POST(req) {
  try {
    const body = await req.json();
    const brand = createBrand(body);
    return NextResponse.json({ ok: true, brand });
  } catch (err) {
    console.error("Brand create error", err);
    return NextResponse.json({ ok: false, error: "Failed to create brand" }, { status: 500 });
  }
}
