import { NextResponse } from "next/server";
import { generateCourse } from "@/lib/naming/course/generateCourse";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await generateCourse(body);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Course Engine Error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate course." }, { status: 500 });
  }
}
