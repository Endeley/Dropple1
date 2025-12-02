// canvas/core/hitTest/useHitTest.js
import { hitTestTemplateSlots } from "./templateHitTest";
import { useTemplateStore } from "@/stores/useTemplateStore";

export function useHitTest() {
  const templateInstances = useTemplateStore((s) => s.templateInstances);

  const runHitTest = (x, y) => {
    return hitTestTemplateSlots(templateInstances, x, y);
  };

  return {
    runHitTest,
  };
}
