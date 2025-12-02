import { aiQueue } from "@/lib/performance/ai/aiManager";
import { WorkerManager } from "@/lib/performance/workers/workerManager";
import { isDesktop, desktopAPI } from "@/lib/desktop/client";

class AIEngine {
  constructor() {
    this.preprocessWorker =
      typeof window === "undefined"
        ? null
        : new WorkerManager("/lib/performance/workers/aiPreprocessWorker.js");
  }

  async generateImage(settings) {
    const { prompt, negativePrompt } = settings;

    const prepared = this.preprocessWorker
      ? await this.preprocessWorker.run("PREPARE_TEXT", {
          prompt,
          negativePrompt,
        })
      : { data: { prompt: prompt?.trim(), negativePrompt: negativePrompt?.trim() } };

    if (isDesktop) {
      try {
        const localResult = await desktopAPI.runLocalModel({
          type: settings?.type || "sdxl",
          prompt: prepared.data?.prompt,
          negativePrompt: prepared.data?.negativePrompt,
          width: settings?.width,
          height: settings?.height,
        });
        if (localResult?.image) return localResult.image;
        return localResult;
      } catch (error) {
        console.warn("Local GPU generation failed, falling back to cloud", error);
      }
    }

    return new Promise((resolve, reject) => {
      aiQueue.enqueue({
        type: "image",
        data: prepared.data,
        run: async () => {
          try {
            const res = await fetch("/api/ai/image", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...settings,
                prompt: prepared.data?.prompt,
                negativePrompt: prepared.data?.negativePrompt,
              }),
            });
            const json = await res.json();
            if (!res.ok) {
              throw new Error(json.error || "Image generation failed");
            }
            resolve(json.image);
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }

  async generateText(prompt) {
    return new Promise((resolve, reject) => {
      aiQueue.enqueue({
        type: "text",
        data: { prompt },
        run: async () => {
          try {
            const res = await fetch("/api/ai/text", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt }),
            });
            const json = await res.json();
            if (!res.ok) {
              throw new Error(json.error || "Text generation failed");
            }
            resolve(json.text);
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }

  async generateMockup({ design, mockupType, mockupStyle }) {
    if (!design) {
      throw new Error("Upload a design file to generate a mockup");
    }

    const form = new FormData();
    form.append("design", design);
    form.append("mockupType", mockupType);
    form.append("mockupStyle", mockupStyle);

    return new Promise((resolve, reject) => {
      aiQueue.enqueue({
        type: "mockup",
        data: { mockupType, mockupStyle },
        run: async () => {
          try {
            const res = await fetch("/api/ai/mockup", {
              method: "POST",
              body: form,
            });
            const json = await res.json();
            if (!res.ok) {
              throw new Error(json.error || "Mockup generation failed");
            }
            resolve(json.image);
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }

  async generateVideo({ file, prompt, model, duration, motion }) {
    if (!file) {
      throw new Error("Upload an image or video to animate");
    }

    const form = new FormData();
    form.append("file", file);
    form.append("prompt", prompt ?? "");
    form.append("model", model);
    form.append("duration", duration);
    form.append("motion", motion);

    return new Promise((resolve, reject) => {
      aiQueue.enqueue({
        type: "video",
        data: { model, duration },
        run: async () => {
          try {
            const res = await fetch("/api/ai/video", {
              method: "POST",
              body: form,
            });
            const json = await res.json();
            if (!res.ok) {
              throw new Error(json.error || "Video generation failed");
            }
            resolve(json.video);
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }

  async generateAudio({ prompt, file, model, style }) {
    if (!prompt && !file) {
      throw new Error("Provide text or upload audio to generate a result");
    }

    const form = new FormData();
    if (file) form.append("file", file);
    form.append("prompt", prompt ?? "");
    form.append("model", model);
    form.append("style", style);

    return new Promise((resolve, reject) => {
      aiQueue.enqueue({
        type: "audio",
        data: { model },
        run: async () => {
          try {
            const res = await fetch("/api/ai/audio", {
              method: "POST",
              body: form,
            });
            const json = await res.json();
            if (!res.ok) {
              throw new Error(json.error || "Audio generation failed");
            }
            resolve(json.audio);
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }

  async generateTemplate({ prompt, category, size }) {
    return new Promise((resolve, reject) => {
      aiQueue.enqueue({
        type: "template",
        data: { category },
        run: async () => {
          try {
            const res = await fetch("/api/ai/template", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt, category, size }),
            });
            const json = await res.json();
            if (!res.ok) {
              throw new Error(json.error || "Template generation failed");
            }
            resolve(json.template);
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }
}

export const aiEngine = new AIEngine();
