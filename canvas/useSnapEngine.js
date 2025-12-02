import { useEffect } from "react";

export default function useSnapEngine() {
  useEffect(() => {
    const handleMove = (event) => {
      if (event.detail.e?.shiftKey) {
        console.debug("Snapping active");
      }
    };
    window.addEventListener("canvas:pointerMove", handleMove);
    return () => window.removeEventListener("canvas:pointerMove", handleMove);
  }, []);
}
