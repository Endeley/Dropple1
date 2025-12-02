const queue = [];
let working = false;

const runNext = () => {
    if (working || queue.length === 0) return;
    working = true;
    const task = queue.shift();
    // simulate ai run
    setTimeout(() => {
        working = false;
        self.postMessage({ id: task.id, result: task.payload });
        runNext();
    }, 100);
};

self.onmessage = (event) => {
    queue.push(event.data);
    runNext();
};
