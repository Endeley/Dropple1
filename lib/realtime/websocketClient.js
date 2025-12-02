import { publish } from "./bus";
import { EVENT_TYPES } from "./eventTypes";

// Lightweight wrapper; if WebSocket is unavailable, falls back to local bus only.
export class RealtimeSocket {
  constructor({ url }) {
    this.url = url;
    this.ws = null;
    this.connected = false;
    if (typeof WebSocket !== "undefined" && url) {
      try {
        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
          this.connected = true;
        };
        this.ws.onmessage = (evt) => {
          try {
            const data = JSON.parse(evt.data);
            if (data?.type) publish(data.type, data.payload || data);
          } catch (err) {
            console.error("Realtime message parse error", err);
          }
        };
        this.ws.onclose = () => {
          this.connected = false;
        };
      } catch (err) {
        console.warn("WebSocket unavailable, using local bus only", err);
      }
    }
  }

  send(packet) {
    if (this.connected && this.ws?.readyState === 1) {
      this.ws.send(JSON.stringify(packet));
    } else if (packet?.type) {
      // Local echo so collaboration works in single-client dev
      publish(packet.type, packet.payload || packet);
    }
  }
}

export function broadcastPacket(socket, type, payload) {
  const packet = { type, payload };
  if (socket) {
    socket.send(packet);
  } else {
    publish(type, payload);
  }
}
