"use client";

export function useUndoRedo() {
  return {
    undo: () => console.log("Undo placeholder"),
    redo: () => console.log("Redo placeholder"),
  };
}
