import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, category, size } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        template: {
          size,
          background: "#ffffff",
          layers: [
            {
              type: "text",
              text: "Sample Headline",
              fontSize: 64,
              fontWeight: 700,
              x: 10,
              y: 10,
              w: 80,
            },
            {
              type: "shape",
              shape: "rect",
              fill: "#111111",
              x: 0,
              y: 75,
              w: 100,
              h: 25,
            },
          ],
        },
      });
    }

    const system = `You are a design layout generator that outputs JSON templates. All measurements are percentages.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: system },
          {
            role: "user",
            content: `Create a ${category} template sized ${size}. Prompt: ${prompt}`,
          },
        ],
      }),
    });

    const json = await response.json();
    const messageContent = json?.choices?.[0]?.message?.content || "{}";
    const template = JSON.parse(messageContent);

    return NextResponse.json({ template });
  } catch (error) {
    console.error("/api/ai/template", error);
    return NextResponse.json(
      { error: error.message || "Template generation failed" },
      { status: 500 }
    );
  }
}
