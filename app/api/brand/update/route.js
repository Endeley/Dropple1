import { NextResponse } from "next/server";
import { updateBrand } from "@/lib/brandcloud/registry";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, patch } = body || {};
    if (!id) return NextResponse.json({ ok: false, error: "Missing brand id" }, { status: 400 });
    const brand = updateBrand(id, patch || {});
    return NextResponse.json({ ok: true, brand });
  } catch (err) {
    console.error("Brand update error", err);
    return NextResponse.json({ ok: false, error: "Failed to update brand" }, { status: 500 });
  }
}
