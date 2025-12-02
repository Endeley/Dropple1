import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ text: "[dev] Provide OPENAI_API_KEY to enable text AI." });
    }

    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!result.ok) {
      const errorText = await result.text();
      throw new Error(errorText || "Text generation failed");
    }

    const json = await result.json();

    return NextResponse.json({ text: json.choices?.[0]?.message?.content ?? "" });
  } catch (err) {
    console.error("/api/ai/text", err);
    return NextResponse.json(
      { error: err.message || "Text generation failed" },
      { status: 500 }
    );
  }
}
