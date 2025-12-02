export class AnimationTimeline {
  constructor() {
    // Map<word, Keyframe[]>
    this.tracks = new Map();
  }

  addKeyframe(word, time, props, easing = "easeOut") {
    const track = this.tracks.get(word) || [];

    track.push({
      time,
      props,
      easing,
    });

    track.sort((a, b) => a.time - b.time);
    this.tracks.set(word, track);
  }

  getTrack(word) {
    return this.tracks.get(word) || [];
  }
}
