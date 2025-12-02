import { NextResponse } from "next/server";
import { disablePlugin } from "@/lib/plugins/registry";

export async function POST(req) {
  try {
    const body = await req.json();
    const id = body?.id;
    if (!id) return NextResponse.json({ ok: false, error: "Missing plugin id" }, { status: 400 });
    const plugin = disablePlugin(id);
    if (!plugin) return NextResponse.json({ ok: false, error: "Plugin not found" }, { status: 404 });
    return NextResponse.json({ ok: true, plugin });
  } catch (err) {
    console.error("Plugin disable error", err);
    return NextResponse.json({ ok: false, error: "Failed to disable plugin" }, { status: 500 });
  }
}
