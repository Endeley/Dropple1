import { NextResponse } from "next/server";
import { listPlugins } from "@/lib/plugins/registry";

export async function GET() {
  try {
    const plugins = listPlugins();
    return NextResponse.json({ ok: true, plugins });
  } catch (err) {
    console.error("Plugin list error", err);
    return NextResponse.json({ ok: false, error: "Failed to list plugins" }, { status: 500 });
  }
}
