"use client";

import ModalManager from "@/components/workspace/common/ModalManager";
import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";
import ExportModal from "./popouts/ExportModal";
import BGRemoveModal from "./popouts/BGRemoveModal";
import EnhanceModal from "./popouts/EnhanceModal";
import ReplaceImageModal from "./popouts/ReplaceImageModal";
import CropConfirmModal from "./popouts/CropConfirmModal";

export default function Popups() {
  const closeModal = useWorkspaceUIStore((s) => s.closeModal);
  const setMaskInvert = useImageWorkspaceStore((s) => s.setMaskInvertConfirm);
  const showMaskInvert = useImageWorkspaceStore((s) => s.showMaskInvertConfirm);

  const modals = {
    export: () => <ExportModal onConfirm={closeModal} onCancel={closeModal} />,
    bgremove: () => <BGRemoveModal onConfirm={closeModal} onCancel={closeModal} />,
    enhance: () => <EnhanceModal onConfirm={closeModal} onCancel={closeModal} />,
    replace: () => <ReplaceImageModal onConfirm={closeModal} onCancel={closeModal} />,
    cropconfirm: () => <CropConfirmModal onConfirm={closeModal} onCancel={closeModal} />,
  };

  return (
    <>
      <ModalManager modals={modals} />
      {showMaskInvert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[320px] rounded-lg border border-neutral-200 bg-white p-4 shadow-2xl">
            <h3 className="text-base font-semibold text-neutral-900">Invert mask?</h3>
            <p className="mt-2 text-sm text-neutral-700">Invert the current mask selection. This cannot be undone here.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMaskInvert(false)}
                className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setMaskInvert(false)}
                className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
