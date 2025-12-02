export function runBrandAgent(task, brand = "Default") {
  return { agent: "brand", task, summary: `Brand ${brand} applied` };
}
