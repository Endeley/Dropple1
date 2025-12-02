import { NextResponse } from "next/server";
import { installPlugin } from "@/lib/plugins/registry";
import { validateManifest } from "@/lib/plugins/manifestSchema";

export async function POST(req) {
  try {
    const body = await req.json();
    const manifest = body?.manifest || {};
    const validation = validateManifest(manifest);
    if (!validation.ok) {
      return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
    }
    const plugin = installPlugin(manifest);
    return NextResponse.json({ ok: true, plugin });
  } catch (err) {
    console.error("Plugin install error", err);
    return NextResponse.json({ ok: false, error: "Failed to install plugin" }, { status: 500 });
  }
}
