import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const design = form.get("design");
    const mockupType = form.get("mockupType");
    const mockupStyle = form.get("mockupStyle");

    if (!design) {
      throw new Error("Missing design upload");
    }

    if (!process.env.REPLICATE_API_KEY) {
      return NextResponse.json({
        image: "data:image/png;base64,<mockup-result>",
        meta: { mockupType, mockupStyle },
      });
    }

    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "<mockup-model-id>",
        input: { design, template: mockupType, style: mockupStyle },
      }),
    });

    const json = await res.json();
    return NextResponse.json({
      image: json?.output?.[0] || json?.result || "",
    });
  } catch (error) {
    console.error("/api/ai/mockup", error);
    return NextResponse.json(
      { error: error.message || "Mockup generation failed" },
      { status: 500 }
    );
  }
}
