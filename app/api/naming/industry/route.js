import { NextResponse } from "next/server";
import { generateIndustryCopy } from "@/lib/naming/industry/generateIndustryCopy";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateIndustryCopy(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Industry Copy Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate industry copy." }, { status: 500 });
  }
}
