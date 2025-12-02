import { NextResponse } from "next/server";
import { createOrg } from "@/lib/orgs/registry";

export async function POST(req) {
  try {
    const body = await req.json();
    const org = createOrg(body);
    return NextResponse.json({ ok: true, org });
  } catch (err) {
    console.error("Org create error", err);
    return NextResponse.json({ ok: false, error: "Failed to create org" }, { status: 500 });
  }
}
