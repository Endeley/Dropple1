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
    const prompt = form.get("prompt") || "";
    const model = form.get("model");
    const style = form.get("style") || "narrator";
    const file = form.get("file");

    if (!model) {
      throw new Error("Missing audio model");
    }

    if (model === "elevenlabs") {
      if (!process.env.ELEVEN_API_KEY || !process.env.ELEVEN_VOICE_ID) {
        return NextResponse.json({
          audio: "data:audio/mpeg;base64,<elevenlabs-placeholder>",
        });
      }

      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": process.env.ELEVEN_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: prompt,
            model_id: "eleven_multilingual_v2",
            voice_settings: { style },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const blob = await res.blob();
      const url = await blobToBase64(blob);
      return NextResponse.json({ audio: url });
    }

    if (model === "clean") {
      if (!process.env.REPLICATE_API_KEY) {
        return NextResponse.json({
          audio: "data:audio/mpeg;base64,<cleaned-audio>",
        });
      }

      const res = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "<audio-cleanup-model>",
          input: { audio: file },
        }),
      });

      const json = await res.json();
      return NextResponse.json({ audio: json?.output?.[0] || json?.audio });
    }

    return NextResponse.json({ error: "Unsupported model" }, { status: 400 });
  } catch (error) {
    console.error("/api/ai/audio", error);
    return NextResponse.json(
      { error: error.message || "Audio generation failed" },
      { status: 500 }
    );
  }
}
