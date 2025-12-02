'use client';
import { useWorkspaceUIStore } from '@/lib/state/ui/useWorkspaceUIStore';

export default function ModalManager({ modals }) {
    const activeModal = useWorkspaceUIStore((s) => s.activeModal);
    const closeModal = useWorkspaceUIStore((s) => s.closeModal);

    if (!activeModal) return null;

    const ModalToRender = modals[activeModal];

    return (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-(--popout-bg) border border-(--popout-border) rounded-xl shadow-2xl p-6 w-[480px] max-w-[90%]'>
                <ModalToRender />
                <button
                    onClick={closeModal}
                    className='mt-5 w-full py-3 text-center bg-(--violet-500) rounded-lg hover:bg-(--violet-600)'
                >
                    Close
                </button>
            </div>
        </div>
    );
}
