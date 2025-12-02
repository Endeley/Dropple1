const subscribers = [];

export function subscribe(fn) {
  subscribers.push(fn);
  return () => {
    const i = subscribers.indexOf(fn);
    if (i >= 0) subscribers.splice(i, 1);
  };
}

export function distribute(state) {
  subscribers.forEach((fn) => {
    try {
      fn(state);
    } catch (err) {
      console.error("State distribution error", err);
    }
  });
}
