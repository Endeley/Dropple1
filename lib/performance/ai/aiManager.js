import { AIQueue } from './aiQueue';

const sharedAIQueue = new AIQueue();

class AIManager {
    constructor(queue = sharedAIQueue) {
        this.queue = queue;
    }

    generateText(prompt) {
        return new Promise((resolve, reject) => {
            this.queue.enqueue({
                type: 'text',
                data: { prompt },
                run: async () => {
                    try {
                        const res = await fetch('/api/ai/text', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt }),
                        });
                        const json = await res.json();
                        resolve(json.text);
                    } catch (error) {
                        reject(error);
                    }
                },
            });
        });
    }

    generateImage(prompt) {
        return new Promise((resolve, reject) => {
            this.queue.enqueue({
                type: 'image',
                data: { prompt },
                run: async () => {
                    try {
                        const res = await fetch('/api/ai/image', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt }),
                        });
                        const json = await res.json();
                        resolve(json.image);
                    } catch (error) {
                        reject(error);
                    }
                },
            });
        });
    }

    removeBackground(blob) {
        return new Promise((resolve, reject) => {
            this.queue.enqueue({
                type: 'bgremove',
                data: { blob },
                run: async () => {
                    try {
                        const res = await fetch('/api/ai/remove-bg', {
                            method: 'POST',
                            body: blob,
                        });
                        const arrayBuffer = await res.arrayBuffer();
                        resolve(new Blob([arrayBuffer], { type: 'image/png' }));
                    } catch (error) {
                        reject(error);
                    }
                },
            });
        });
    }
}

export const ai = new AIManager();
export const aiQueue = sharedAIQueue;
