import { NextResponse } from "next/server";
import { listAssets } from "@/lib/assets/storage";

export async function GET() {
  try {
    const assets = listAssets();
    return NextResponse.json({ ok: true, assets });
  } catch (err) {
    console.error("Asset list error", err);
    return NextResponse.json({ ok: false, error: "Failed to list assets" }, { status: 500 });
  }
}
