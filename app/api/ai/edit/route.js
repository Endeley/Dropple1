import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("image");
    const prompt = form.get("prompt");

    if (!file) {
      throw new Error("Missing image upload");
    }

    // TODO: connect to actual edit provider
    return NextResponse.json({
      result: "data:image/png;base64,<edited-image>",
      meta: { prompt },
    });
  } catch (err) {
    console.error("/api/ai/edit", err);
    return NextResponse.json(
      { error: err.message || "Edit failed" },
      { status: 500 }
    );
  }
}
