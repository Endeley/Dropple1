import { useEffect } from "react";

export default function useTransformBox() {
  useEffect(() => {
    const start = (event) => {
      console.debug("Transform start", event.detail.tool);
    };
    window.addEventListener("canvas:pointerDown", start);
    return () => window.removeEventListener("canvas:pointerDown", start);
  }, []);
}
