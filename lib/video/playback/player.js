export function createPlayer({ fps = 30, duration = 60 }) {
  return {
    fps,
    duration,
    time: 0,
    playing: false,
  };
}

export function play(player) {
  return { ...player, playing: true };
}

export function pause(player) {
  return { ...player, playing: false };
}

export function seek(player, time) {
  return { ...player, time: Math.max(0, Math.min(time, player.duration)) };
}
