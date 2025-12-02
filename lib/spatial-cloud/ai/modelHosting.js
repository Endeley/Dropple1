export function hostModel(name = "model") {
  return { name, url: `cloud://${name}`, status: "hosted" };
}
