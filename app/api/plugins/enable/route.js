import { NextResponse } from "next/server";
import { enablePlugin } from "@/lib/plugins/registry";

export async function POST(req) {
  try {
    const body = await req.json();
    const id = body?.id;
    if (!id) return NextResponse.json({ ok: false, error: "Missing plugin id" }, { status: 400 });
    const plugin = enablePlugin(id);
    if (!plugin) return NextResponse.json({ ok: false, error: "Plugin not found" }, { status: 404 });
    return NextResponse.json({ ok: true, plugin });
  } catch (err) {
    console.error("Plugin enable error", err);
    return NextResponse.json({ ok: false, error: "Failed to enable plugin" }, { status: 500 });
  }
}
