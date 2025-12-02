export function generateProceduralMaterial(seed = 1) {
  return { seed, material: `proc_${seed}`, maps: ["albedo", "normal"] };
}
