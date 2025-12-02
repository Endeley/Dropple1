export function syncDeviceState(identity, device = "web", state = {}) {
  identity.devices = identity.devices || {};
  identity.devices[device] = { state, ts: Date.now() };
  return identity;
}
