import { NextResponse } from "next/server";
import { listOrgs } from "@/lib/orgs/registry";

export async function GET() {
  try {
    const orgs = listOrgs();
    return NextResponse.json({ ok: true, orgs });
  } catch (err) {
    console.error("Org list error", err);
    return NextResponse.json({ ok: false, error: "Failed to list orgs" }, { status: 500 });
  }
}
