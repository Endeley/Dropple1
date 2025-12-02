import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const image = form.get("image");
    const mask = form.get("mask");
    const prompt = form.get("prompt") || "";

    if (!image || !mask) {
      throw new Error("Missing image or mask payload");
    }

    if (!process.env.REPLICATE_API_KEY) {
      return NextResponse.json({ result: "data:image/png;base64,<replace-result>" });
    }

    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "<replace-model-id>",
        input: { image, mask, prompt },
      }),
    });

    const json = await res.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("/api/ai/edit/replace", error);
    return NextResponse.json(
      { error: error.message || "Replace edit failed" },
      { status: 500 }
    );
  }
}
