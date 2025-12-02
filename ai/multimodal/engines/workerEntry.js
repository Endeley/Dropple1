self.addEventListener('message', (event) => {
    const { taskId, payload } = event.data || {};
    // Placeholder: echo payload
    self.postMessage({ taskId, result: payload });
});
