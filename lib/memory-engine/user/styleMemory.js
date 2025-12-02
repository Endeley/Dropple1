const styles = [];

export function rememberStyle(style) {
  styles.push({ style, ts: Date.now() });
}

export function lastStyle() {
  return styles.at(-1)?.style || null;
}
