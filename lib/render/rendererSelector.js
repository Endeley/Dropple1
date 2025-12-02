import { renderCanvas2D } from "./targets/renderCanvas2D";
import { renderWebGL } from "./targets/renderWebGL";
import { render3D } from "@/lib/3d/renderer3D";
import { renderSVG } from "./targets/renderSVG";
import { renderPDF } from "./targets/renderPDF";
import { renderFrame } from "./targets/renderFrame";

export function selectRenderer(target = "edit") {
  if (target === "preview") return renderWebGL;
  if (target === "3d") return render3D;
  if (target === "svg") return renderSVG;
  if (target === "pdf") return renderPDF;
  if (target === "frame") return renderFrame;
  return renderCanvas2D;
}
