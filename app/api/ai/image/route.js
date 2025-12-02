import { NextResponse } from "next/server";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      prompt,
      negativePrompt,
      model = "sdxl",
      size = "1024x1024",
      seed,
      guidance = 7,
    } = body || {};

    const [width, height] = size.split("x").map((v) => parseInt(v, 10));
    const endpoint =
      model === "playground-v2"
        ? "playground-v2"
        : model === "turbovision"
        ? "turbo"
        : "sd-xl-1024x1024";

    if (!process.env.STABILITY_API_KEY) {
      return NextResponse.json({ image: PLACEHOLDER_IMAGE });
    }

    const res = await fetch(
      `https://api.stability.ai/v1/generation/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
          samples: 1,
          width: Number.isFinite(width) ? width : 1024,
          height: Number.isFinite(height) ? height : 1024,
          seed: seed ? parseInt(seed, 10) : undefined,
          guidance_scale: guidance ?? 7,
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Image generation failed");
    }

    const data = await res.json();
    const base64 = data?.artifacts?.[0]?.base64;
    if (!base64) {
      throw new Error("AI provider did not return an image");
    }

    return NextResponse.json({ image: `data:image/png;base64,${base64}` });
  } catch (err) {
    console.error("/api/ai/image", err);
    return NextResponse.json(
      { error: err.message || "Image generation failed" },
      { status: 500 }
    );
  }
}
