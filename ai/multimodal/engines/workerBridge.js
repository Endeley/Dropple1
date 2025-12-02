const workers = new Map();

export const runInAIWorker = (taskId, payload) => {
    if (!workers.has(taskId)) {
        workers.set(taskId, new Worker(new URL('./workerEntry.js', import.meta.url)));
    }

    const worker = workers.get(taskId);
    return new Promise((resolve, reject) => {
        const handleMessage = (event) => {
            if (event.data?.taskId !== taskId) return;
            worker.removeEventListener('message', handleMessage);
            resolve(event.data.result);
        };

        const handleError = (error) => {
            worker.removeEventListener('error', handleError);
            reject(error);
        };

        worker.addEventListener('message', handleMessage);
        worker.addEventListener('error', handleError);
        worker.postMessage({ taskId, payload });
    });
};
