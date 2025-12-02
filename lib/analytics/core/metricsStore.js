const metrics = {
  counters: {},
  gauges: {},
};

export function incCounter(name, value = 1) {
  metrics.counters[name] = (metrics.counters[name] || 0) + value;
  return metrics.counters[name];
}

export function setGauge(name, value) {
  metrics.gauges[name] = value;
  return value;
}

export function getMetrics() {
  return JSON.parse(JSON.stringify(metrics));
}
