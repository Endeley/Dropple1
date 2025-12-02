import { AnimationTimeline } from "./AnimationTimeline.js";
import { applyKeyframe } from "./applyKeyframe.js";

export class WordAnimationManager {
  constructor() {
    this.timeline = new AnimationTimeline();
    this.selectedWords = [];
    this.duration = 2000;
  }

  setSelection(words) {
    this.selectedWords = words || [];
  }

  addPreset(words, presetFrames) {
    for (const word of words) {
      for (const frame of presetFrames) {
        this.timeline.addKeyframe(word, frame.time, frame.props, frame.easing);
      }
    }
  }

  update(t) {
    for (const trackWord of this.timeline.tracks.keys()) {
      const track = this.timeline.getTrack(trackWord);
      const props = applyKeyframe(trackWord, track, t);
      if (!props) continue;
      Object.assign(trackWord, props);
    }
  }
}
