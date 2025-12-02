class RAFBatcher {
    constructor() {
        this.queue = new Set();
        this.running = false;
        this.loop = this.loop.bind(this);
    }

    add(fn) {
        this.queue.add(fn);
        if (!this.running) this.start();
    }

    remove(fn) {
        this.queue.delete(fn);
    }

    start() {
        this.running = true;
        requestAnimationFrame(this.loop);
    }

    loop() {
        if (this.queue.size === 0) {
            this.running = false;
            return;
        }

        this.queue.forEach((fn) => fn());
        requestAnimationFrame(this.loop);
    }
}

export const rafBatcher = new RAFBatcher();
