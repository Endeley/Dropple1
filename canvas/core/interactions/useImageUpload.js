"use client";

import { uploadImage } from "@/utils/upload/uploadImage";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import { useHistoryStore } from "@/stores/useHistoryStore";

export function useImageUpload() {
  const store = useTemplateMasterStore();

  const onImageClick = (slot) => {
    if (!slot) return;
    if (slot.type !== "image" && slot.type !== "logo") return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const url = await uploadImage(file);
        const history = useHistoryStore.getState();
        history.beginBlock?.("Replace Image", { slotId: slot.id, category: "content" });
        store.updateSlotContent(slot.id, { src: url });
        history.endBlock?.();
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Image upload failed", err);
        }
      }
    };

    input.click();
  };

  return { onImageClick };
}
