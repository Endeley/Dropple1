import { WorkerManager } from '../workers/workerManager';
import { AIBatcher } from './aiBatcher';

export class AIQueue {
    constructor() {
        this.queue = [];
        this.isRunning = false;
        this.worker = new WorkerManager('/lib/performance/workers/aiWorker.js');
        this.batcher = new AIBatcher();
    }

    enqueue(task) {
        const id = crypto.randomUUID();
        this.queue.push({ id, ...task });
        this.process();
        return id;
    }

    enqueueMany(tasks) {
        tasks.forEach((task) => this.enqueue(task));
    }

    async process() {
        if (this.isRunning || this.queue.length === 0) return;
        this.isRunning = true;

        const batch = this.batcher.buildBatch(this.queue);
        this.queue = this.queue.slice(batch.length);

        const prepared = await this.worker.run('BATCH_TASKS', { tasks: batch });
        await this.executeBatch(prepared.data.batch);

        this.isRunning = false;
        if (this.queue.length > 0) this.process();
    }

    async executeBatch(batch = []) {
        for (const task of batch) {
            try {
                await task.run();
            } catch (error) {
                console.error('AI task failed', error);
            }
        }
    }
}
