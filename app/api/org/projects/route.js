import { NextResponse } from "next/server";
import { addProject } from "@/lib/orgs/registry";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orgId, project } = body || {};
    if (!orgId || !project) return NextResponse.json({ ok: false, error: "Missing orgId or project" }, { status: 400 });
    const created = addProject(orgId, project);
    return NextResponse.json({ ok: true, project: created });
  } catch (err) {
    console.error("Org project error", err);
    return NextResponse.json({ ok: false, error: "Failed to add project" }, { status: 500 });
  }
}
