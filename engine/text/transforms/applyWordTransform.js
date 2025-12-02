import { identity, translate, scale, rotate, skew, multiply } from "./matrix.js";

/**
 * Apply a transform to a word by composing matrices.
 * The word object gets a `matrix` property for downstream rendering/animation.
 */
export function applyWordTransform(word, transform) {
  let m = word.matrix || identity();

  if (transform.translate) {
    const { x, y } = transform.translate;
    m = multiply(m, translate(identity(), x, y));
  }

  if (transform.scale) {
    const { x, y } = transform.scale;
    m = multiply(m, scale(identity(), x, y));
  }

  if (transform.rotate !== undefined) {
    m = multiply(m, rotate(identity(), transform.rotate));
  }

  if (transform.skew) {
    const { x, y } = transform.skew;
    m = multiply(m, skew(identity(), x, y));
  }

  word.matrix = m;
  return word;
}
