'use client';

import { useEffect } from 'react';
import TopBar from './ui/TopBar';
import LeftToolbar from './ui/LeftToolbar';
import RightInspector from './ui/RightInspector';
import CanvasChrome from './ui/CanvasChrome';
import WorkspaceBottomBar from './WorkspaceBottomBar';
import WorkspaceCanvasArea from './WorkspaceCanvasArea';
import { useWorkspaceStore } from '@/lib/state/workspace/useWorkspaceStore';
import { getMode } from '@/modules';
import DocumentSwitcher from '@/foundation/documents/DocumentSwitcher';
import { useLoadAllDocuments } from '@/foundation/documents/useLoadAllDocuments';
import { useSyncDocument } from '@/foundation/documents/useSyncDocument';
import { useAutoSave } from '@/foundation/documents/useAutoSave';
import { useDocumentStore } from '@/foundation/documents/documentStore';
import { useConvexClient } from '@/foundation/convex/ConvexClientProvider';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useBrandKitStore } from '@/stores/useBrandKitStore';
import { loadRemoteTemplateDefinitions } from '@/foundation/templates/templateRegistry';

export default function WorkspaceShell() {
    const mode = useWorkspaceStore((s) => s.mode);
    const config = getMode(mode);
    const currentDocumentId = useDocumentStore((s) => s.currentId);
    const convex = useConvexClient();
    const syncTemplates = useTemplateStore((s) => s.syncTemplatesFromConvex);
    const watchTemplateInstances = useTemplateStore((s) => s.watchTemplateInstances);
    const syncBrandKits = useBrandKitStore((s) => s.syncBrandKitsFromConvex);

    useLoadAllDocuments();
    useAutoSave();
    useSyncDocument(currentDocumentId);

    useEffect(() => {
        if (!convex) return;
        loadRemoteTemplateDefinitions(convex);
        syncTemplates(convex);
        syncBrandKits(convex);
        const unsubscribe = watchTemplateInstances(convex);
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [convex, syncTemplates, syncBrandKits, watchTemplateInstances]);

    return (
        <div className='relative w-full h-screen overflow-hidden bg-[#0B0B0F] text-white'>
            <div className='absolute inset-x-0 top-0 z-50 flex flex-col'>
                <TopBar />
                <DocumentSwitcher />
            </div>

            <div className='absolute top-[6.5rem] bottom-12 left-0 w-16 z-40'>
                <LeftToolbar />
            </div>

            <div className='absolute top-[6.5rem] bottom-12 right-0 z-40'>
                <RightInspector />
            </div>

            <div className='absolute top-[6.5rem] bottom-12 left-16 right-[340px] z-10'>
                <div className='relative w-8 h-full'>
                    <WorkspaceCanvasArea />
                    <CanvasChrome />
                </div>
            </div>

            <div className='absolute bottom-0 left-0 right-0 z-50'>
                <WorkspaceBottomBar config={config} />
            </div>
        </div>
    );
}
