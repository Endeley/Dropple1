const observers = [];

export function observeState(fn) {
  observers.push(fn);
  return () => {
    const i = observers.indexOf(fn);
    if (i >= 0) observers.splice(i, 1);
  };
}

export function notifyState(state) {
  observers.forEach((fn) => {
    try {
      fn(state);
    } catch (err) {
      console.error("Context state observer error", err);
    }
  });
}
