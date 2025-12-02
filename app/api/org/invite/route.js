import { NextResponse } from "next/server";
import { inviteMember } from "@/lib/orgs/registry";
import { ROLES } from "@/lib/orgs/permissions";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orgId, userId, role } = body || {};
    if (!orgId || !userId) return NextResponse.json({ ok: false, error: "Missing orgId or userId" }, { status: 400 });
    const targetRole = role && ROLES[role?.toUpperCase()] ? ROLES[role.toUpperCase()] : role || ROLES.VIEWER;
    const org = inviteMember(orgId, userId, targetRole);
    return NextResponse.json({ ok: true, org });
  } catch (err) {
    console.error("Org invite error", err);
    return NextResponse.json({ ok: false, error: "Failed to invite member" }, { status: 500 });
  }
}
