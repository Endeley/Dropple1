"use server";

import { broadcastPacket, RealtimeSocket } from "./websocketClient";
import { EVENT_TYPES } from "./eventTypes";
import { resolveLayerConflict, resolveDeleteVsEdit } from "./conflictResolver";
import { updateCursor } from "./cursorManager";
import { setPresence } from "./presenceManager";
import { addComment, replyToComment, resolveComment } from "./commentManager";
import { publish, subscribe } from "./bus";

const layerStore = new Map(); // docId -> Map(layerId -> layer)
const locks = new Map(); // docId -> Map(layerId -> userId)

export function initCollaboration({ socketUrl } = {}) {
  const socket = new RealtimeSocket({ url: socketUrl });
  return socket;
}

export function applyLocalOperation(socket, docId, op) {
  switch (op.type) {
    case EVENT_TYPES.UPDATE_LAYER: {
      const map = layerStore.get(docId) || new Map();
      const existing = map.get(op.layerId) || {};
      const merged = resolveLayerConflict(existing, { ...op.changes, updatedAt: Date.now() });
      map.set(op.layerId, merged);
      layerStore.set(docId, map);
      broadcastPacket(socket, EVENT_TYPES.UPDATE_LAYER, { docId, layerId: op.layerId, layer: merged });
      publish(EVENT_TYPES.UPDATE_LAYER, { docId, layerId: op.layerId, layer: merged });
      break;
    }
    case EVENT_TYPES.LOCK_LAYER: {
      const map = locks.get(docId) || new Map();
      map.set(op.layerId, op.userId);
      locks.set(docId, map);
      broadcastPacket(socket, EVENT_TYPES.LOCK_LAYER, { docId, layerId: op.layerId, userId: op.userId });
      publish(EVENT_TYPES.LOCK_LAYER, { docId, layerId: op.layerId, userId: op.userId });
      break;
    }
    case EVENT_TYPES.UNLOCK_LAYER: {
      const map = locks.get(docId) || new Map();
      map.delete(op.layerId);
      locks.set(docId, map);
      broadcastPacket(socket, EVENT_TYPES.UNLOCK_LAYER, { docId, layerId: op.layerId });
      publish(EVENT_TYPES.UNLOCK_LAYER, { docId, layerId: op.layerId });
      break;
    }
    case EVENT_TYPES.CURSOR: {
      updateCursor(op);
      broadcastPacket(socket, EVENT_TYPES.CURSOR, op);
      break;
    }
    case EVENT_TYPES.PRESENCE: {
      setPresence(op);
      broadcastPacket(socket, EVENT_TYPES.PRESENCE, op);
      break;
    }
    case EVENT_TYPES.COMMENT_ADD: {
      addComment(docId, op.comment);
      broadcastPacket(socket, EVENT_TYPES.COMMENT_ADD, { docId, comment: op.comment });
      break;
    }
    case EVENT_TYPES.COMMENT_REPLY: {
      replyToComment(docId, op.commentId, op.reply);
      broadcastPacket(socket, EVENT_TYPES.COMMENT_REPLY, { docId, commentId: op.commentId, reply: op.reply });
      break;
    }
    case EVENT_TYPES.COMMENT_RESOLVE: {
      resolveComment(docId, op.commentId, op.resolved);
      broadcastPacket(socket, EVENT_TYPES.COMMENT_RESOLVE, { docId, commentId: op.commentId, resolved: op.resolved });
      break;
    }
    default:
      break;
  }
}

export function applyRemoteOperation(docId, op) {
  if (!op?.type) return;
  switch (op.type) {
    case EVENT_TYPES.UPDATE_LAYER: {
      const map = layerStore.get(docId) || new Map();
      const existing = map.get(op.layerId) || {};
      const merged = resolveDeleteVsEdit(existing, { ...op.layer, updatedAt: Date.now() });
      map.set(op.layerId, merged);
      layerStore.set(docId, map);
      publish(EVENT_TYPES.UPDATE_LAYER, { docId, layerId: op.layerId, layer: merged });
      break;
    }
    case EVENT_TYPES.LOCK_LAYER:
    case EVENT_TYPES.UNLOCK_LAYER:
    case EVENT_TYPES.CURSOR:
    case EVENT_TYPES.PRESENCE:
    case EVENT_TYPES.COMMENT_ADD:
    case EVENT_TYPES.COMMENT_REPLY:
    case EVENT_TYPES.COMMENT_RESOLVE:
      publish(op.type, { docId, ...op });
      break;
    default:
      break;
  }
}

export function onCollaboration(event, cb) {
  return subscribe(event, cb);
}

export function getLayerState(docId) {
  const map = layerStore.get(docId) || new Map();
  return Array.from(map.values());
}
