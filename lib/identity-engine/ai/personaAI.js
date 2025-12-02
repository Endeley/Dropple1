export function recommendPersona(context = "design") {
  if (context.includes("story")) return "Storyteller";
  if (context.includes("animation")) return "Animator";
  if (context.includes("brand")) return "Brand Designer";
  return "Creator";
}
