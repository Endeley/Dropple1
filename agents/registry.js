import design from "./design";
import branding from "./branding";
import video from "./video";
import audio from "./audio";
import template from "./template";
import image from "./image";
import dev from "./dev";
import director from "./director";

export const agents = {
  design,
  branding,
  video,
  audio,
  template,
  image,
  dev,
  director,
};

export function getAgent(id) {
  return agents[id];
}
