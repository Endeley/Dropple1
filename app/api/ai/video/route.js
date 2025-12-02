import { NextResponse } from "next/server";

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

export async function POST(req) {
  try {
    const form = await req.formData();
    const model = form.get("model");

    if (!model) {
      throw new Error("Missing video model");
    }

    if (model === "svd") {
      if (!process.env.STABILITY_API_KEY) {
        return NextResponse.json({ video: "data:video/mp4;base64,<svd-video>" });
      }
      const res = await fetch("https://api.stability.ai/v2beta/video/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: form,
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const blob = await res.blob();
      const url = await blobToBase64(blob);
      return NextResponse.json({ video: url });
    }

    if (model === "pika") {
      if (!process.env.PIKA_API_KEY) {
        return NextResponse.json({ video: "https://example.com/pika-placeholder.mp4" });
      }
      const res = await fetch("https://api.pikalabs.com/v1/video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PIKA_API_KEY}`,
        },
        body: form,
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Pika generation failed");
      }
      return NextResponse.json({ video: json.output_url || json.video });
    }

    if (model === "runway") {
      if (!process.env.RUNWAY_API_KEY) {
        return NextResponse.json({ video: "https://example.com/runway-placeholder.mp4" });
      }
      const res = await fetch("https://api.runwayml.com/v1/videos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RUNWAY_API_KEY}`,
        },
        body: form,
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Runway generation failed");
      }
      return NextResponse.json({ video: json.url || json.video });
    }

    return NextResponse.json({ error: "Unsupported model" }, { status: 400 });
  } catch (error) {
    console.error("/api/ai/video", error);
    return NextResponse.json(
      { error: error.message || "Video generation failed" },
      { status: 500 }
    );
  }
}
