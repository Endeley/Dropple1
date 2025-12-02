import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const image = form.get("image");
    const mask = form.get("mask");

    if (!image || !mask) {
      throw new Error("Missing image or mask payload");
    }

    if (!process.env.REPLICATE_API_KEY) {
      return NextResponse.json({ result: "data:image/png;base64,<removed-object>" });
    }

    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "<inpainting-model-id>",
        input: {
          image,
          mask,
          prompt: "",
        },
      }),
    });

    const json = await res.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("/api/ai/edit/remove", error);
    return NextResponse.json(
      { error: error.message || "Remove edit failed" },
      { status: 500 }
    );
  }
}
