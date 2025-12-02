"use client";

import { useEffect } from "react";
import { KEY } from "./keyMap";
import { useClipboard } from "../clipboard/useClipboard";
import { useNudge } from "./useNudge";
import { useSlotSelectionStore } from "@/stores/useSlotSelectionStore";
import { useInlineTextEditor } from "@/stores/useInlineTextEditor";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useUndoRedo } from "../undo/useUndoRedo";
import { useHistoryStore } from "@/stores/useHistoryStore";
import { useCommandPalette } from "@/components/commandPalette/CommandPaletteProvider";

export function useKeyBindings() {
  const { copy, paste, duplicate } = useClipboard();
  const { nudge } = useNudge();
  const editing = useInlineTextEditor((s) => s.active);
  const selectionStore = useSlotSelectionStore;
  const store = useTemplateMasterStore;
  const { undo, redo } = useUndoRedo();
  const commandPalette = useCommandPalette();

  useEffect(() => {
    const handler = (event) => {
      if (editing) return;

      const key = event.key;
      const meta = event.metaKey || event.ctrlKey;
      const shift = event.shiftKey;

      // ESC
      if (KEY.ESC.includes(key)) {
        selectionStore.getState().clear();
        store.getState().selectSlot(null);
        return;
      }

      // Delete
      if (KEY.DELETE.includes(key)) {
        const ids = selectionStore.getState().selected;
        if (ids?.length) {
          const history = useHistoryStore.getState();
          history.beginBlock?.("Delete Slots", {
            type: "delete",
            category: "meta",
            slotIds: [...ids],
            count: ids.length,
          });
          store.getState().deleteSlots(ids);
          history.endBlock?.();
          selectionStore.getState().clear();
        }
        return;
      }

      if (meta && KEY.COPY.includes(key)) {
        event.preventDefault();
        copy();
        return;
      }

      if (meta && KEY.PASTE.includes(key)) {
        event.preventDefault();
        paste();
        return;
      }

      if (meta && KEY.DUPLICATE.includes(key)) {
        event.preventDefault();
        duplicate();
        return;
      }

      if (meta && KEY.UNDO.includes(key) && !shift) {
        event.preventDefault();
        undo();
        return;
      }

      if ((meta && shift && KEY.UNDO.includes(key)) || (meta && KEY.REDO.includes(key))) {
        event.preventDefault();
        redo();
        return;
      }

      if (KEY.ARROW_LEFT.includes(key)) {
        event.preventDefault();
        nudge(shift ? -10 : -1, 0);
        return;
      }

      if (KEY.ARROW_RIGHT.includes(key)) {
        event.preventDefault();
        nudge(shift ? 10 : 1, 0);
        return;
      }

      if (KEY.ARROW_UP.includes(key)) {
        event.preventDefault();
        nudge(0, shift ? -10 : -1);
        return;
      }

      if (KEY.ARROW_DOWN.includes(key)) {
        event.preventDefault();
        nudge(0, shift ? 10 : 1);
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [editing, copy, paste, duplicate, nudge, undo, redo]);
}
      if (meta && key.toLowerCase() === "k") {
        event.preventDefault();
        commandPalette.setOpen(true);
        return;
      }
