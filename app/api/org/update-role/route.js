import { NextResponse } from "next/server";
import { updateRole } from "@/lib/orgs/registry";
import { ROLES } from "@/lib/orgs/permissions";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orgId, userId, role } = body || {};
    if (!orgId || !userId || !role) {
      return NextResponse.json({ ok: false, error: "Missing orgId, userId, or role" }, { status: 400 });
    }
    const targetRole = ROLES[role.toUpperCase()] || role;
    const org = updateRole(orgId, userId, targetRole);
    return NextResponse.json({ ok: true, org });
  } catch (err) {
    console.error("Org role error", err);
    return NextResponse.json({ ok: false, error: "Failed to update role" }, { status: 500 });
  }
}
