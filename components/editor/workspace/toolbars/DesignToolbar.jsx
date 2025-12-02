'use client';

import { useMemo, useRef } from 'react';
import * as fabric from 'fabric';
import {
    MousePointer2,
    Type,
    Image as ImageIcon,
    Square,
    Upload,
    Palette,
    Circle,
    Triangle,
    Group,
    Ungroup,
    AlignLeft,
    AlignRight,
    AlignHorizontalSpaceAround,
    AlignVerticalSpaceAround,
    AlignVerticalJustifyStart,
    AlignVerticalJustifyEnd,
    Undo2,
    Redo2,
    Crop,
    Lock,
    Unlock,
} from 'lucide-react';
import { useEditorStore } from '@/stores/useEditorStore';
import { useTemplateStore } from '@/stores/useTemplateStore';

const TOOLS = [
    { id: 'select', label: 'Select', icon: MousePointer2 },
    { id: 'text', label: 'Text', icon: Type, panel: 'text', flyout: 'text', action: 'add-text' },
    { id: 'image', label: 'Image', icon: ImageIcon, panel: 'photos', flyout: 'photos' },
    { id: 'shapes', label: 'Shapes', icon: Square, panel: 'elements', flyout: 'elements' },
    { id: 'upload', label: 'Upload', icon: Upload, panel: 'uploads' },
    { id: 'brand', label: 'Brand Kits', icon: Palette, panel: 'design-brandkits', flyout: 'design' },
];

const SHAPE_BUTTONS = [
    { id: 'rect', label: 'Rectangle', icon: Square, action: 'add-rect' },
    { id: 'circle', label: 'Circle', icon: Circle, action: 'add-circle' },
    { id: 'triangle', label: 'Triangle', icon: Triangle, action: 'add-triangle' },
];

const ALIGN_BUTTONS = [
    { id: 'align-left', label: 'Align Left', icon: AlignLeft, action: 'align-left' },
    { id: 'align-right', label: 'Align Right', icon: AlignRight, action: 'align-right' },
    { id: 'align-top', label: 'Align Top', icon: AlignVerticalJustifyStart, action: 'align-top' },
    { id: 'align-bottom', label: 'Align Bottom', icon: AlignVerticalJustifyEnd, action: 'align-bottom' },
    { id: 'align-center-h', label: 'Center Horiz', icon: AlignHorizontalSpaceAround, action: 'align-center-h' },
    { id: 'align-center-v', label: 'Center Vert', icon: AlignVerticalSpaceAround, action: 'align-center-v' },
];

function ToolButton({ tool, isActive, onSelect }) {
    const Icon = tool.icon;
    return (
        <button
            type='button'
            onClick={() => onSelect(tool)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                isActive
                    ? 'border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-400 dark:bg-violet-900/30 dark:text-violet-200'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-600'
            }`}>
            <Icon className='h-4 w-4' />
            <span>{tool.label}</span>
        </button>
    );
}

export default function DesignToolbar() {
    const activeTool = useEditorStore((s) => s.activeTool);
    const setActiveTool = useEditorStore((s) => s.setActiveTool);
    const setActivePanel = useEditorStore((s) => s.setActivePanel);
    const canvas = useEditorStore((s) => s.fabricCanvas);
    const fileInputRef = useRef(null);
    const groupSelected = useTemplateStore((s) => s.groupSelected);
    const ungroupSelected = useTemplateStore((s) => s.ungroupSelected);
    const alignSelected = useTemplateStore((s) => s.alignSelected);
    const undo = useTemplateStore((s) => s.undo);
    const redo = useTemplateStore((s) => s.redo);
    const enterCropMode = useTemplateStore((s) => s.enterCropMode);
    const lockSelected = useTemplateStore((s) => s.lockSelected);
    const setUnlockMode = useTemplateStore((s) => s.setUnlockMode);
    const unlockMode = useTemplateStore((s) => s.unlockMode);

    const activeValue = useMemo(() => activeTool || 'select', [activeTool]);

    const addDefaultText = () => {
        if (!canvas) return;
        const text = new fabric.Text('Add your text', {
            fontFamily: 'Inter',
            fontSize: 32,
            fill: '#000000',
            left: 200,
            top: 200,
        });
        canvas.add(text).setActiveObject(text);
        canvas.requestRenderAll();
    };

    const addRectangle = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            width: 200,
            height: 120,
            fill: '#cccccc',
            left: 100,
            top: 100,
            rx: 0,
            ry: 0,
            stroke: '#111111',
            strokeWidth: 0,
        });
        canvas.add(rect).setActiveObject(rect);
        canvas.requestRenderAll();
        setActiveTool?.('shapes');
    };

    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            radius: 80,
            fill: '#cccccc',
            left: 150,
            top: 150,
            stroke: '#111111',
            strokeWidth: 0,
        });
        canvas.add(circle).setActiveObject(circle);
        canvas.requestRenderAll();
        setActiveTool?.('shapes');
    };

    const addTriangle = () => {
        if (!canvas) return;
        const triangle = new fabric.Triangle({
            width: 150,
            height: 130,
            fill: '#cccccc',
            left: 200,
            top: 200,
            stroke: '#111111',
            strokeWidth: 0,
        });
        canvas.add(triangle).setActiveObject(triangle);
        canvas.requestRenderAll();
        setActiveTool?.('shapes');
    };

    const handleUpload = (e) => {
        if (!canvas) return;
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        fabric.Image.fromURL(
            url,
            (img) => {
                img.scaleToWidth(500);
                img.set({ left: 180, top: 180 });
                canvas.add(img).setActiveObject(img);
                canvas.requestRenderAll();
            },
            { crossOrigin: 'anonymous' }
        );
    };

    const handleSelect = (tool) => {
        if (tool.action === 'add-text') {
            addDefaultText();
        } else if (tool.action === 'add-rect') {
            addRectangle();
        } else if (tool.action === 'add-circle') {
            addCircle();
        } else if (tool.action === 'add-triangle') {
            addTriangle();
        } else if (tool.action === 'upload-image') {
            fileInputRef.current?.click();
        } else if (tool.action === 'group') {
            groupSelected?.();
        } else if (tool.action === 'ungroup') {
            ungroupSelected?.();
        } else if (tool.action === 'undo') {
            undo?.();
        } else if (tool.action === 'redo') {
            redo?.();
        } else if (tool.action?.startsWith?.('align-')) {
            const type = tool.action.replace('align-', '');
            alignSelected?.(type);
        } else if (tool.action === 'crop') {
            enterCropMode?.();
        } else if (tool.action === 'lock') {
            lockSelected?.();
        } else if (tool.action === 'unlock-mode') {
            setUnlockMode?.(!unlockMode);
        }
        setActiveTool?.(tool.flyout || tool.id);
        if (tool.panel !== undefined) {
            setActivePanel?.(tool.panel || null);
        }
    };

    return (
        <div className='flex flex-wrap items-center gap-3 px-3 py-2'>
            <div className='flex flex-wrap gap-2'>
                {TOOLS.map((tool) => (
                    <ToolButton
                        key={tool.id}
                        tool={tool}
                        isActive={activeValue === (tool.flyout || tool.id)}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
            <div className='h-7 w-px bg-neutral-200 dark:bg-neutral-700' aria-hidden />
            <div className='flex flex-wrap gap-2'>
                {SHAPE_BUTTONS.map((tool) => (
                    <ToolButton
                        key={tool.id}
                        tool={tool}
                        isActive={false}
                        onSelect={handleSelect}
                    />
                ))}
                <ToolButton
                    tool={{ id: 'upload-image', label: 'Upload Image', icon: Upload, action: 'upload-image' }}
                    isActive={false}
                    onSelect={handleSelect}
                />
                <ToolButton
                    tool={{ id: 'group', label: 'Group', icon: Group, action: 'group' }}
                    isActive={false}
                    onSelect={handleSelect}
                />
                <ToolButton
                    tool={{ id: 'ungroup', label: 'Ungroup', icon: Ungroup, action: 'ungroup' }}
                    isActive={false}
                    onSelect={handleSelect}
                />
                <ToolButton tool={{ id: 'undo', label: 'Undo', icon: Undo2, action: 'undo' }} isActive={false} onSelect={handleSelect} />
                <ToolButton tool={{ id: 'redo', label: 'Redo', icon: Redo2, action: 'redo' }} isActive={false} onSelect={handleSelect} />
                <ToolButton tool={{ id: 'crop', label: 'Crop', icon: Crop, action: 'crop' }} isActive={false} onSelect={handleSelect} />
                <ToolButton tool={{ id: 'lock', label: 'Lock', icon: Lock, action: 'lock' }} isActive={false} onSelect={handleSelect} />
                <ToolButton
                    tool={{ id: 'unlock-mode', label: 'Unlock Mode', icon: Unlock, action: 'unlock-mode' }}
                    isActive={unlockMode}
                    onSelect={handleSelect}
                />
                {ALIGN_BUTTONS.map((tool) => (
                    <ToolButton key={tool.id} tool={tool} isActive={false} onSelect={handleSelect} />
                ))}
            </div>
            <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                className='hidden'
                onChange={handleUpload}
            />
        </div>
    );
}
