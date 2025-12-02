export function createSyncChannel({ projectId }) {
  return {
    id: `sync_${projectId || Math.random().toString(36).slice(2, 8)}`,
    connected: false,
    peers: [],
  };
}

export function connectSync(channel, peerId) {
  return { ...channel, connected: true, peers: [...channel.peers, peerId] };
}

export function broadcast(channel, payload) {
  if (!channel.connected) return { ok: false };
  return { ok: true, peers: channel.peers, payload };
}
