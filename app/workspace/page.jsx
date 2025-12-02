import { redirect } from 'next/navigation';
import { use } from 'react';
import ModePicker from '@/components/workspace/ModePicker';
import ModeWorkspaceHost from '@/components/editor/workspace/ModeWorkspaceHost';
import { MODE_CARDS, resolveMode } from '@/packages/mode-registry';
import './mode.css';

export default function WorkspacePage({ searchParams }) {
    const params = typeof searchParams?.then === 'function' ? use(searchParams) : searchParams;
    const templateId = params?.templateId;
    const modeParam = params?.mode;
    const resolvedMode = resolveMode(modeParam);
    const activeMode = resolvedMode || (templateId ? 'uiux' : null);

    if (templateId) {
        const targetMode = activeMode || 'uiux';
        redirect(`/workspace/${targetMode}/${templateId}`);
    }

    if (!activeMode) {
        return <ModePicker modes={MODE_CARDS} />;
    }

    return <ModeWorkspaceHost mode={activeMode} />;
}
