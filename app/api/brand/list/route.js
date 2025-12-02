import { NextResponse } from "next/server";
import { listBrands } from "@/lib/brandcloud/registry";

export async function GET() {
  try {
    const brands = listBrands();
    return NextResponse.json({ ok: true, brands });
  } catch (err) {
    console.error("Brand list error", err);
    return NextResponse.json({ ok: false, error: "Failed to list brands" }, { status: 500 });
  }
}
