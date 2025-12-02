'use client';

import { useTemplateStore } from '@/stores/useTemplateStore';

const PREVIEW_SRC = '/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png';

export default function AnimationPanel() {
    const time = useTemplateStore((s) => s.animationState.time);
    const duration = useTemplateStore((s) => s.animationState.duration);
    const play = useTemplateStore((s) => s.playAnimation);
    const setAnimationTime = useTemplateStore((s) => s.setAnimationTime);

    const percent = Math.min(100, Math.max(0, (time / duration) * 100));

    return (
        <div className='flex flex-col gap-3 border-t border-neutral-300 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>
                <button
                    type='button'
                    className='rounded border border-neutral-300 px-2 py-1 dark:border-neutral-700'
                    onClick={play}>
                    ▶ Play
                </button>
                <span>{Math.round(time)} ms</span>
            </div>

            <div className='relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700'>
                <img
                    src={PREVIEW_SRC}
                    alt='Animation preview'
                    onError={(e) => {
                        e.currentTarget.src = '/logo.png';
                    }}
                    className='h-32 w-full object-cover'
                />
            </div>

            <div className='relative h-16 rounded border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'>
                <div className='absolute inset-0 flex items-center px-3 text-[10px] text-neutral-500 dark:text-neutral-400'>
                    <span>0ms</span>
                    <span className='ml-auto'>{duration}ms</span>
                </div>
                <div
                    className='absolute top-0 h-full w-[2px] bg-violet-500'
                    style={{ left: `${percent}%` }}
                    onMouseDown={(e) => {
                        const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                        if (!rect) return;
                        const move = (ev) => {
                            const x = ev.clientX - rect.left;
                            const ratio = Math.min(1, Math.max(0, x / rect.width));
                            setAnimationTime(ratio * duration);
                        };
                        const up = () => {
                            window.removeEventListener('mousemove', move);
                            window.removeEventListener('mouseup', up);
                        };
                        window.addEventListener('mousemove', move);
                        window.addEventListener('mouseup', up);
                    }}
                />
            </div>
        </div>
    );
}
