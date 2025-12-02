import { NextResponse } from "next/server";

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

export async function POST(req) {
  try {
    const form = await req.formData();

    if (!process.env.STABILITY_API_KEY) {
      return NextResponse.json({ image: "data:image/png;base64,<inpaint-result>" });
    }

    const res = await fetch(
      "https://api.stability.ai/v2beta/stable-image/edit/inpaint",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: form,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Inpaint failed");
    }

    const blob = await res.blob();
    const base64 = await blobToBase64(blob);
    return NextResponse.json({ image: base64 });
  } catch (error) {
    console.error("/api/ai/edit/inpaint", error);
    return NextResponse.json(
      { error: error.message || "Inpaint failed" },
      { status: 500 }
    );
  }
}
