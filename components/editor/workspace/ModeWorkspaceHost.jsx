'use client';

import WorkspacePageClient from './WorkspacePageClient';
import ImageWorkspace from '@/components/workspaces/image/ImageWorkspace';
import { MODES } from '@/packages/mode-registry';

// Map every mode to a workspace component and a surface descriptor.
// UI/UX uses the design canvas shell (infinite board), image uses the image workspace,
// everything else currently shows a lightweight placeholder until its workspace exists.
export const MODE_WORKSPACES = {
    uiux: {
        id: 'uiux',
        label: 'UI / UX Design',
        surface: 'infinite-canvas',
        Component: WorkspacePageClient,
    },
    design: {
        id: 'design',
        label: 'Design',
        surface: 'infinite-canvas',
        Component: WorkspacePageClient,
    },
    image: {
        id: 'image',
        label: 'Image',
        surface: 'bounded-canvas',
        Component: ImageWorkspace,
    },
};

function FallbackWorkspace({ mode }) {
    const label = MODES?.[mode]?.label || (mode ? mode.toUpperCase() : 'Workspace');
    const description =
        MODES?.[mode]?.description ||
        'This mode will get its own dedicated workspace (canvas, timeline, or panel-first) soon.';

    return (
        <div className='flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-950 text-slate-100'>
            <div className='rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-lg shadow-black/40'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Mode</p>
                <h1 className='text-2xl font-semibold text-white'>{label}</h1>
                <p className='mt-2 max-w-md text-sm text-slate-300'>{description}</p>
            </div>
            <p className='text-sm text-slate-400'>
                Surface: {MODES?.[mode]?.surface || 'Panels / TBD'} — Workspace coming soon.
            </p>
        </div>
    );
}

export default function ModeWorkspaceHost(props) {
    const mode = props.mode || 'uiux';
    const workspace = MODE_WORKSPACES[mode] || {};
    const Component = workspace.Component || FallbackWorkspace;

    return <Component {...props} mode={mode} workspaceMeta={workspace} />;
}
