export const presets = {
  fadeIn: (start, duration) => [
    { time: start, props: { opacity: 0 }, easing: "easeOut" },
    { time: start + duration, props: { opacity: 1 }, easing: "easeOut" },
  ],

  slideUp: (start, duration, distance = 40) => [
    { time: start, props: { translateY: distance, opacity: 0 } },
    { time: start + duration, props: { translateY: 0, opacity: 1 }, easing: "easeOut" },
  ],

  popIn: (start, duration) => [
    { time: start, props: { scale: 0.8, opacity: 0 } },
    { time: start + duration, props: { scale: 1, opacity: 1 }, easing: "easeOut" },
  ],
};
