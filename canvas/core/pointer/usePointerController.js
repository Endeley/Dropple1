// canvas/core/pointer/usePointerController.js
import { useHitTest } from "../hitTest/useHitTest";
import { useLayersStore } from "@/stores/useLayersStore";

export function usePointerController() {
  const { runHitTest } = useHitTest();
  const setSelection = useLayersStore((s) => s.setSelection);

  const onPointerDown = (e, canvasSpace) => {
    const { x, y } = canvasSpace;

    // 1. Hit-test templates + slots
    const slotHit = runHitTest(x, y);

    if (slotHit) {
      setSelection(slotHit);
      return;
    }

    // Future: other hit-test fallbacks
    setSelection(null);
  };

  return {
    onPointerDown,
  };
}
