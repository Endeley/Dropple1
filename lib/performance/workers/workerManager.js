export class WorkerManager {
    constructor(workerPath) {
        this.worker = new Worker(workerPath, { type: 'module' });
        this.callbacks = new Map();
        this.worker.onmessage = (event) => {
            const { id, ...data } = event.data;
            const callback = this.callbacks.get(id);
            if (!callback) return;
            this.callbacks.delete(id);
            if (data.error) callback.reject(new Error(data.error));
            else callback.resolve(data);
        };
        this.worker.onerror = (error) => {
            this.callbacks.forEach(({ reject }) => reject(error));
            this.callbacks.clear();
        };
    }

    run(type, payload) {
        const id = crypto.randomUUID();
        return new Promise((resolve, reject) => {
            this.callbacks.set(id, { resolve, reject });
            this.worker.postMessage({ id, type, payload });
        });
    }

    terminate() {
        this.worker.terminate();
        this.callbacks.clear();
    }
}
