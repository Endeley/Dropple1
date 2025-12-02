export class AIBatcher {
    constructor() {
        this.maxBatch = 5;
    }

    buildBatch(queue) {
        return queue.slice(0, this.maxBatch);
    }
}
