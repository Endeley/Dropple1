export function createJobScheduler() {
  return {
    queue: [],
    running: false,
  };
}

export function scheduleJob(scheduler, job) {
  return { ...scheduler, queue: [...scheduler.queue, job] };
}

export function runNext(scheduler) {
  const [next, ...rest] = scheduler.queue;
  return { ...scheduler, queue: rest, running: !!rest.length, last: next };
}
