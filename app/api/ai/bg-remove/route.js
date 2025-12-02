import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("image");

    if (!file) {
      throw new Error("Missing image upload");
    }

    if (!process.env.REPLICATE_API_KEY) {
      return NextResponse.json({
        result: "data:image/png;base64,<background-removed>",
      });
    }

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "<model-version>",
        input: { image: file },
      }),
    });

    const json = await response.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("/api/ai/bg-remove", err);
    return NextResponse.json(
      { error: err.message || "Background removal failed" },
      { status: 500 }
    );
  }
}
