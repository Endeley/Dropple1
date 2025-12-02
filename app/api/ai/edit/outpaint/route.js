import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const image = form.get("image");
    const prompt = form.get("prompt") || "";

    if (!image) {
      throw new Error("Missing image for outpaint");
    }

    if (!process.env.REPLICATE_API_KEY) {
      return NextResponse.json({ result: "data:image/png;base64,<outpaint-result>", meta: { prompt } });
    }

    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "<outpaint-model-id>",
        input: { image, prompt },
      }),
    });

    const json = await res.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("/api/ai/edit/outpaint", error);
    return NextResponse.json(
      { error: error.message || "Outpaint failed" },
      { status: 500 }
    );
  }
}
