export function predictStyle(identity = {}) {
  return identity.avatar?.style === "3d" ? "futuristic" : "minimal";
}
