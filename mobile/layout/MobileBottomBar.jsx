"use client";

import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

const addTextBlock = (canvas) => {
    if (!canvas || typeof window === 'undefined' || !window.fabric) return;
    const text = new window.fabric.Textbox('Tap to edit', {
        left: 100,
        top: 120,
        fontSize: 32,
        fill: '#ffffff',
        width: 240,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
};

const addShape = (canvas) => {
    if (!canvas || typeof window === 'undefined' || !window.fabric) return;
    const rect = new window.fabric.Rect({
        left: 80,
        top: 200,
        width: 160,
        height: 160,
        fill: '#A855F7',
        rx: 20,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
};

export default function MobileBottomBar({ canvas }) {
    const setRightPanel = useWorkspaceStore((s) => s.setRightPanel);

    const tools = [
        { label: 'Photo', icon: '🖼️', action: () => null },
        { label: 'Text', icon: '🔤', action: () => addTextBlock(canvas) },
        { label: 'Shapes', icon: '⬜', action: () => addShape(canvas) },
        { label: 'Layers', icon: '📚', action: () => setRightPanel('inspector') },
        { label: 'AI', icon: '🤖', action: () => setRightPanel('ai') },
    ];

    return (
        <div className='h-16 bg-black/60 backdrop-blur flex items-center justify-around border-t border-black/30'>
            {tools.map((tool) => (
                <button
                    key={tool.label}
                    className='text-white flex flex-col items-center justify-center text-xs'
                    onClick={tool.action}
                >
                    <div className='text-xl mb-1'>{tool.icon}</div>
                    {tool.label}
                </button>
            ))}
        </div>
    );
}
