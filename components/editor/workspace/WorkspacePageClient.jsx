'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { CanvasWrapper } from '@/packages/core-canvas';
import NamingQuickModal from '@/components/naming/NamingQuickModal';
import NamingBubble from '@/components/naming/NamingBubble';
import { NamingAssistantProvider } from '@/components/naming/NamingAssistantProvider';

import { useEditorStore } from '@/stores/useEditorStore';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useWorkspaceUIStore } from '@/lib/state/ui/useWorkspaceUIStore';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
    BadgeCheck,
    Download,
    Save,
    Type,
    Square,
    Circle,
    Star,
    MousePointer,
    Move,
    Sparkles,
    Image,
    Images,
    Filter,
    Zap,
    Settings,
    LayoutTemplate,
    Undo2,
    Redo2,
} from 'lucide-react';
import '@/styles/new-workspace.css';

import SlideoutContainer from '@/components/workspace/common/SlideoutContainer';
import ModalManager from '@/components/workspace/common/ModalManager';

import AssetBrowser from '@/components/workspaces/image/slideouts/AssetBrowser';
import FilterBrowser from '@/components/workspaces/image/slideouts/FilterBrowser';
import EffectBrowser from '@/components/workspaces/image/slideouts/EffectBrowser';
import TemplatesBrowser from '@/components/workspaces/image/slideouts/TemplatesBrowser';
import ProjectsBrowser from '@/components/workspaces/image/slideouts/ProjectsBrowser';
import ShapesBrowser from '@/components/workspaces/image/slideouts/ShapesBrowser';

import MaskSlideout from '@/components/workspaces/image/right-slideouts/MaskSlideout';
import FilterSettingsSlideout from '@/components/workspaces/image/right-slideouts/FilterSettingsSlideout';
import WorkspaceSettingsDrawer from '@/components/workspaces/image/right-slideouts/WorkspaceSettingsDrawer';

import ExportModal from '@/components/workspaces/image/popouts/ExportModal';
import BGRemoveModal from '@/components/workspaces/image/popouts/BGRemoveModal';

export default function WorkspacePageClient({ mode = 'design', templateId, definition, instances, searchParams: _searchParams }) {
    const activeObject = useEditorStore((s) => s.activeObject);
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);

    const addTemplate = useTemplateStore((s) => s.addTemplate);
    const loadTemplateDefinition = useTemplateStore((s) => s.loadTemplateDefinition);
    const loadTemplateInstances = useTemplateStore((s) => s.loadTemplateInstances);
    const setCanvasMode = useTemplateStore((s) => s.setCanvasMode);
    const enableDesignTools = useTemplateStore((s) => s.enableDesignTools);
    const setSelectedObject = useTemplateStore((s) => s.setSelectedObject);
    const setCanvasRef = useTemplateStore((s) => s.setCanvasRef);
    const selectedObject = useTemplateStore((s) => s.selectedObject);
    const undo = useTemplateStore((s) => s.undo);
    const redo = useTemplateStore((s) => s.redo);
    const copySelection = useTemplateStore((s) => s.copySelection);
    const pasteSelection = useTemplateStore((s) => s.pasteSelection);
    const deleteSelection = useTemplateStore((s) => s.deleteSelection);
    const bringForward = useTemplateStore((s) => s.bringForward);
    const sendBackward = useTemplateStore((s) => s.sendBackward);
    const bringToFront = useTemplateStore((s) => s.bringToFront);
    const sendToBack = useTemplateStore((s) => s.sendToBack);
    const duplicateSelection = useTemplateStore((s) => s.duplicateSelection);
    const selectAll = useTemplateStore((s) => s.selectAll);
    const setBrandKits = useTemplateStore((s) => s.setBrandKits);
    const setCanvasZoom = useTemplateStore((s) => s.setCanvasZoom);
    const setCanvasPan = useTemplateStore((s) => s.setCanvasPan);

    const hydratedRef = useRef(false);
    const brandkits = useQuery(api.queries.brandkits.listBrandKits);

    const normalizedTemplate = useMemo(() => {
        if (!templateId || !definition) return null;
        return { id: templateId, ...definition };
    }, [definition, templateId]);

    const designLikeModes = ['design', 'uiux'];

    useEffect(() => {
        if (setCanvasMode) {
            setCanvasMode(mode);
        }
        if (designLikeModes.includes(mode) && enableDesignTools) {
            enableDesignTools();
        }
    }, [mode, setCanvasMode, enableDesignTools]);

    useEffect(() => {
        if (fabricCanvas && setCanvasRef) {
            setCanvasRef(fabricCanvas);
        }
    }, [fabricCanvas, setCanvasRef]);

    useEffect(() => {
        setSelectedObject?.(activeObject || null);
    }, [activeObject, setSelectedObject]);

    useEffect(() => {
        if (Array.isArray(brandkits)) {
            setBrandKits?.(brandkits);
        }
    }, [brandkits, setBrandKits]);

    useEffect(() => {
        const handleKey = (e) => {
            const target = e.target;
            const tag = target?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                if (e.shiftKey) {
                    redo?.();
                } else {
                    undo?.();
                }
            }

            // COPY
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                copySelection?.();
            }

            // PASTE
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'v') {
                e.preventDefault();
                pasteSelection?.();
            }

            // DELETE
            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelection?.();
            }

            // DUPLICATE
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                duplicateSelection?.();
            }

            // SELECT ALL
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                selectAll?.();
            }

            // BRING FORWARD
            if ((e.metaKey || e.ctrlKey) && e.key === ']') {
                e.preventDefault();
                bringForward?.();
            }

            // SEND BACKWARD
            if ((e.metaKey || e.ctrlKey) && e.key === '[') {
                e.preventDefault();
                sendBackward?.();
            }

            // BRING TO FRONT (meta/ctrl + alt + ])
            if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === ']') {
                e.preventDefault();
                bringToFront?.();
            }

            // SEND TO BACK (meta/ctrl + alt + [)
            if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === '[') {
                e.preventDefault();
                sendToBack?.();
            }

            if (!e.metaKey && !e.ctrlKey && e.key.toLowerCase() === 'a') {
                openLeft('assets');
                setActiveToolId('assets');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [
        undo,
        redo,
        copySelection,
        pasteSelection,
        deleteSelection,
        duplicateSelection,
        selectAll,
        bringForward,
        sendBackward,
        bringToFront,
        sendToBack,
        openLeft,
        setActiveToolId,
    ]);

    useEffect(() => {
        if (hydratedRef.current) return;
        if (!templateId || !normalizedTemplate) return;

        addTemplate(normalizedTemplate);
        loadTemplateDefinition?.(normalizedTemplate);

        if (Array.isArray(instances) && loadTemplateInstances) {
            loadTemplateInstances(instances);
        } else if (normalizedTemplate.definition?.slots) {
            const position = { x: 0, y: 0 };
            useTemplateStore.getState().addTemplateInstance(normalizedTemplate.id, position, normalizedTemplate.definition.slots);
        }

        hydratedRef.current = true;
    }, [templateId, normalizedTemplate, instances, addTemplate, loadTemplateDefinition, loadTemplateInstances]);

    useEffect(() => {
        if (!hoveredTool) {
            setTooltipTool(null);
            return;
        }
        const timer = setTimeout(() => setTooltipTool(hoveredTool), 200);
        return () => clearTimeout(timer);
    }, [hoveredTool]);

    useEffect(() => {
        if (!fabricCanvas) return;
        const updateCount = () => {
            const count = (fabricCanvas.getObjects?.() || []).filter((o) => o.type === 'image').length;
            setImageCount(count);
        };
        updateCount();
        fabricCanvas.on('object:added', updateCount);
        fabricCanvas.on('object:removed', updateCount);
        return () => {
            fabricCanvas.off('object:added', updateCount);
            fabricCanvas.off('object:removed', updateCount);
        };
    }, [fabricCanvas]);

    useEffect(() => {
        if (!fabricCanvas) return;

        const handleWheel = (opt) => {
            const delta = opt.e?.deltaY || 0;
            let zoom = fabricCanvas.getZoom?.() || 1;
            zoom *= 0.999 ** delta;
            zoom = Math.min(Math.max(zoom, 0.25), 3);
            const point = { x: opt.e?.offsetX ?? 0, y: opt.e?.offsetY ?? 0 };
            fabricCanvas.zoomToPoint(point, zoom);
            setCanvasZoom?.(zoom);
            const vpt = fabricCanvas.viewportTransform;
            if (Array.isArray(vpt)) {
                setCanvasPan?.({ x: vpt[4], y: vpt[5] });
            }
            opt.e.preventDefault();
            opt.e.stopPropagation();
        };

        const handleDblClick = (opt) => {
            if (opt?.target) return;
            fabricCanvas.setZoom(1);
            fabricCanvas.absolutePan?.(new fabric.Point(0, 0));
            setCanvasZoom?.(1);
            setCanvasPan?.({ x: 0, y: 0 });
        };

        const isEditableTarget = (target) => {
            if (!target) return false;
            const tag = target.tagName;
            return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
        };

        const handleKeyDown = (e) => {
            if (e.code === 'Space' && !isEditableTarget(e.target)) {
                e.preventDefault();
                spacePanningRef.current = true;
                prevInteractionRef.current = {
                    selection: fabricCanvas.selection,
                    skipTargetFind: fabricCanvas.skipTargetFind,
                };
                fabricCanvas.selection = false;
                fabricCanvas.skipTargetFind = true;
                fabricCanvas.defaultCursor = 'grab';
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === 'Space') {
                spacePanningRef.current = false;
                panStartRef.current = null;
                fabricCanvas.defaultCursor = 'default';
                fabricCanvas.selection = prevInteractionRef.current.selection;
                fabricCanvas.skipTargetFind = prevInteractionRef.current.skipTargetFind;
            }
        };

        const handleMouseDown = (opt) => {
            if (!spacePanningRef.current) return;
            panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY };
            fabricCanvas.setCursor('grabbing');
        };

        const handleMouseMove = (opt) => {
            if (!spacePanningRef.current || !panStartRef.current) return;
            const vpt = fabricCanvas.viewportTransform;
            if (!vpt) return;
            vpt[4] += opt.e.clientX - panStartRef.current.x;
            vpt[5] += opt.e.clientY - panStartRef.current.y;
            fabricCanvas.setViewportTransform(vpt);
            panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY };
            setCanvasPan?.({ x: vpt[4], y: vpt[5] });
        };

        const handleMouseUp = () => {
            if (!spacePanningRef.current) return;
            fabricCanvas.setCursor('grab');
            panStartRef.current = null;
        };

        fabricCanvas.on('mouse:wheel', handleWheel);
        fabricCanvas.on('mouse:dblclick', handleDblClick);
        fabricCanvas.on('mouse:down', handleMouseDown);
        fabricCanvas.on('mouse:move', handleMouseMove);
        fabricCanvas.on('mouse:up', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            fabricCanvas.off('mouse:wheel', handleWheel);
            fabricCanvas.off('mouse:dblclick', handleDblClick);
            fabricCanvas.off('mouse:down', handleMouseDown);
            fabricCanvas.off('mouse:move', handleMouseMove);
            fabricCanvas.off('mouse:up', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [fabricCanvas, setCanvasPan, setCanvasZoom]);

    const modeTabs = ['Image Editing', 'UI/UX Design', 'Graphic Design', 'Animation', 'Video Editing'];
    const libraryItems = [
        { id: 1, label: 'You’re only limited by you.', thumb: '/templates/previews/placeholder.png' },
        { id: 2, label: 'SALE 50% OFF', thumb: '/templates/previews/placeholder.png' },
        { id: 3, label: 'New Collection', thumb: '/templates/previews/placeholder.png' },
        { id: 4, label: 'Screenshot', thumb: '/templates/previews/placeholder.png' },
    ];

    const openLeft = useWorkspaceUIStore((s) => s.openLeft);
    const openRight = useWorkspaceUIStore((s) => s.openRight);
    const openModal = useWorkspaceUIStore((s) => s.openModal);
    const closeLeft = useWorkspaceUIStore((s) => s.closeLeft);
    const closeRight = useWorkspaceUIStore((s) => s.closeRight);
    const activeLeft = useWorkspaceUIStore((s) => s.activeLeftSlideout);
    const activeRight = useWorkspaceUIStore((s) => s.activeRightSlideout);
    const setLeftHoveringTrigger = useWorkspaceUIStore((s) => s.setLeftHoveringTrigger);
    const setRightHoveringTrigger = useWorkspaceUIStore((s) => s.setRightHoveringTrigger);

    const [activeToolId, setActiveToolId] = useState('select');
    const [hoveredTool, setHoveredTool] = useState(null);
    const [tooltipTool, setTooltipTool] = useState(null);
    const [showUndoStrip, setShowUndoStrip] = useState(false);
    const [imageCount, setImageCount] = useState(0);
    const fileInputRef = useRef(null);
    const [collapsedSections, setCollapsedSections] = useState({ position: false, size: false, style: false, typography: false });
    const spacePanningRef = useRef(false);
    const panStartRef = useRef(null);
    const prevInteractionRef = useRef({ selection: true, skipTargetFind: false });

    const closeLeftIfIdle = useCallback(() => {
        const state = useWorkspaceUIStore.getState();
        if (!state.leftHoveringSlideout && !state.leftHoveringTrigger) {
            state.closeLeft();
        }
    }, []);

    const closeRightIfIdle = useCallback(() => {
        const state = useWorkspaceUIStore.getState();
        if (!state.rightHoveringSlideout && !state.rightHoveringTrigger) {
            state.closeRight();
        }
    }, []);

    const tools = useMemo(
        () => [
            { id: 'select', icon: MousePointer, label: 'Select' },
            { id: 'move', icon: Move, label: 'Move' },
            { id: 'text', icon: Type, label: 'Text' },
            { id: 'rect', icon: Square, label: 'Rectangle' },
            { id: 'circle', icon: Circle, label: 'Circle' },
            { id: 'star', icon: Star, label: 'Star' },
            { id: 'assets', icon: Image, label: 'Assets', slideout: 'assets', shortcut: 'A' },
            { id: 'templates', icon: LayoutTemplate, label: 'Templates', slideout: 'templates' },
            { id: 'images', icon: Images, label: 'Images', slideout: 'assets', badge: imageCount },
            { id: 'filters', icon: Filter, label: 'Filters', slideout: 'filters' },
            { id: 'effects', icon: Zap, label: 'Effects', slideout: 'effects' },
            { id: 'settings', icon: Settings, label: 'Settings', rightSlideout: 'settings' },
            { id: 'magic', icon: Sparkles, label: 'Magic' },
        ],
        [imageCount]
    );

    const handleToolClick = useCallback(
        (tool) => {
            setActiveToolId(tool.id);

            if (tool.slideout) {
                if (activeLeft === tool.slideout) {
                    closeLeft();
                } else {
                    openLeft(tool.slideout);
                }
            } else if (tool.rightSlideout) {
                if (activeRight === tool.rightSlideout) {
                    closeRight();
                } else {
                    openRight(tool.rightSlideout);
                }
            } else {
                closeLeft();
                closeRight();
            }

            if (tool.id === 'magic') {
                openModal('bgremove');
            }
        },
        [activeLeft, activeRight, closeLeft, closeRight, openLeft, openModal, openRight]
    );

    const handleAddText = useCallback(() => {
        const canvas = useTemplateStore.getState().canvas || fabricCanvas;
        if (!canvas) return;

        const center = canvas.getCenter ? canvas.getCenter() : { left: canvas.getWidth?.() / 2, top: canvas.getHeight?.() / 2 };
        const text = new fabric.IText('New Text Layer', {
            left: center?.left || 200,
            top: center?.top || 200,
            fill: '#111827',
            fontSize: 32,
            originX: 'center',
            originY: 'center',
        });

        canvas.add(text);
        canvas.setActiveObject?.(text);
        text.setCoords?.();
        canvas.requestRenderAll?.();
        setSelectedObject?.(text);
        useTemplateStore.getState().pushHistory?.();
        setActiveToolId('text');
    }, [fabricCanvas, setSelectedObject]);

    const handleImageFile = useCallback(
        (file) => {
            if (!file) return;
            const canvas = useTemplateStore.getState().canvas || fabricCanvas;
            if (!canvas) return;

            const url = URL.createObjectURL(file);
            fabric.Image.fromURL(
                url,
                (img) => {
                    if (!img) return;
                    img.set({
                        left: (canvas.getWidth?.() || 800) / 2,
                        top: (canvas.getHeight?.() || 800) / 2,
                        originX: 'center',
                        originY: 'center',
                    });
                    canvas.add(img);
                    canvas.setActiveObject?.(img);
                    canvas.requestRenderAll?.();
                    setSelectedObject?.(img);
                    useTemplateStore.getState().pushHistory?.();
                    URL.revokeObjectURL(url);
                },
                { crossOrigin: 'anonymous' }
            );
        },
        [fabricCanvas, setSelectedObject]
    );

    const handleFileChange = useCallback(
        (e) => {
            const file = e.target?.files?.[0];
            if (file) {
                handleImageFile(file);
            }
            if (e.target) {
                e.target.value = '';
            }
        },
        [handleImageFile]
    );

    const handleTemplateOpen = useCallback(() => {
        setActiveToolId('templates');
        if (activeLeft === 'templates') {
            closeLeft();
        } else {
            openLeft('templates');
        }
    }, [activeLeft, closeLeft, openLeft]);

    const handleAddImage = useCallback(() => {
        setActiveToolId('images');
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const applyTransform = useCallback(
        (key, value) => {
            const obj = useTemplateStore.getState().selectedObject;
            if (!obj || Number.isNaN(Number(value))) return;
            obj.set(key, Number(value));
            obj.setCoords?.();
            obj.canvas?.requestRenderAll?.();
            setSelectedObject?.(obj);
            useTemplateStore.getState().pushHistory?.();
        },
        [setSelectedObject]
    );

    const updateSizeField = useCallback(
        (key, value) => {
            const obj = useTemplateStore.getState().selectedObject;
            const next = Number(value);
            if (!obj || Number.isNaN(next) || next <= 0) return;

            if (key === 'width') {
                const base = obj.width || obj.getScaledWidth?.() || 1;
                const baseWidth = obj.width || base / (obj.scaleX || 1) || 1;
                obj.set('scaleX', next / baseWidth);
            } else if (key === 'height') {
                const base = obj.height || obj.getScaledHeight?.() || 1;
                const baseHeight = obj.height || base / (obj.scaleY || 1) || 1;
                obj.set('scaleY', next / baseHeight);
            }

            obj.setCoords?.();
            obj.canvas?.requestRenderAll?.();
            setSelectedObject?.(obj);
            useTemplateStore.getState().pushHistory?.();
        },
        [setSelectedObject]
    );

    const updateFill = useCallback(
        (value) => {
            const obj = useTemplateStore.getState().selectedObject;
            if (!obj) return;
            obj.set('fill', value || '#ffffff');
            obj.canvas?.requestRenderAll?.();
            setSelectedObject?.(obj);
            useTemplateStore.getState().pushHistory?.();
        },
        [setSelectedObject]
    );

    const toggleSection = useCallback(
        (key) =>
            setCollapsedSections((prev) => ({
                ...prev,
                [key]: !prev[key],
            })),
        []
    );

    const selection = selectedObject || activeObject;
    const selectionMetrics = useMemo(() => {
        const obj = selection;
        if (!obj) return { x: 0, y: 0, width: 0, height: 0 };
        const width = Math.round(obj.getScaledWidth ? obj.getScaledWidth() : (obj.width || 0) * (obj.scaleX || 1));
        const height = Math.round(obj.getScaledHeight ? obj.getScaledHeight() : (obj.height || 0) * (obj.scaleY || 1));
        return {
            x: Math.round(obj.left || 0),
            y: Math.round(obj.top || 0),
            width,
            height,
        };
    }, [selection]);
    const isTextSelection = selection && ['i-text', 'text', 'textbox'].includes(selection.type);
    const fillValue = typeof selection?.fill === 'string' ? selection.fill : '#5b43ff';

    return (
        <NamingAssistantProvider>
            {/* LEFT SLIDEOUT */}
            <SlideoutContainer
                side='left'
                slideouts={{
                    assets: AssetBrowser,
                    filters: FilterBrowser,
                    effects: EffectBrowser,
                    templates: TemplatesBrowser,
                    projects: ProjectsBrowser,
                    shapes: ShapesBrowser,
                }}
            />

            {/* RIGHT SLIDEOUT */}
            <SlideoutContainer
                side='right'
                slideouts={{
                    mask: MaskSlideout,
                    filterSettings: FilterSettingsSlideout,
                    settings: WorkspaceSettingsDrawer,
                }}
            />

            {/* POPOUTS */}
            <ModalManager
                modals={{
                    export: ExportModal,
                    bgremove: BGRemoveModal,
                }}
            />

            <div className='nw-shell'>
                <input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} className='nw-file-input' />
                <header className='nw-topbar'>
                    <div className='nw-brand'>
                        <div className='nw-logo-dot' />
                        <span>Dropple</span>
                    </div>
                    <nav className='nw-tabs'>
                        {modeTabs.map((tab, idx) => (
                            <button key={tab} className={`nw-tab ${idx === 0 ? 'is-active' : ''}`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                    <div className='nw-actions'>
                        <span className='nw-status'>
                            <BadgeCheck size={14} />
                            Canvas ready
                        </span>
                        <button className='nw-btn ghost'>
                            <Save size={14} />
                            Save
                        </button>
                        <button className='nw-btn primary' onClick={() => openModal('export')}>
                            <Download size={14} />
                            Export
                        </button>
                        <div className='nw-avatar'>EK</div>
                    </div>
                </header>

                <div className='nw-main'>
                    <aside
                        className='nw-left-rail'
                        onMouseEnter={() => setShowUndoStrip(true)}
                        onMouseLeave={() => setShowUndoStrip(false)}
                    >
                        <div className='nw-tools'>
                            {tools.map((tool) => {
                                const isActive =
                                    activeToolId === tool.id ||
                                    (tool.slideout && activeLeft === tool.slideout) ||
                                    (tool.rightSlideout && activeRight === tool.rightSlideout);
                                const showTip = tooltipTool === tool.id;

                                return (
                                    <div key={tool.id} className='nw-tool-wrap'>
                                        <button
                                            key={tool.id}
                                            type='button'
                                            className={`nw-tool ${isActive ? 'is-active' : ''}`}
                                            title={tool.label}
                                            onClick={() => handleToolClick(tool)}
                                            onMouseEnter={() => setHoveredTool(tool.id)}
                                            onMouseLeave={() => setHoveredTool(null)}
                                        >
                                            <span className='nw-tool-indicator' aria-hidden />
                                            <tool.icon size={16} />
                                            <span className='nw-tool-label'>{tool.label}</span>
                                            {tool.badge ? <span className='nw-tool-badge'>{tool.badge}</span> : null}
                                        </button>
                                        {showTip && <div className='nw-tool-tip'>{tool.label}</div>}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={`nw-undo-strip ${showUndoStrip ? 'is-visible' : ''}`}>
                            <button type='button' onClick={undo}>
                                <Undo2 size={14} />
                                Undo
                            </button>
                            <button type='button' onClick={redo}>
                                <Redo2 size={14} />
                                Redo
                            </button>
                        </div>
                        <div className='nw-templates-card' role='button' tabIndex={0} onClick={handleTemplateOpen} onKeyDown={(e) => e.key === 'Enter' && handleTemplateOpen()}>
                            <p>Templates</p>
                            <span>No templates yet</span>
                        </div>
                        <div className='nw-library-list'>
                            <p className='nw-library-label'>Library</p>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setLeftHoveringTrigger(true);
                                    openLeft('templates');
                                }}
                                onMouseLeave={() => {
                                    setLeftHoveringTrigger(false);
                                    setTimeout(closeLeftIfIdle, 150);
                                }}
                            >
                                <LayoutTemplate size={14} />
                                Templates
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setLeftHoveringTrigger(true);
                                    openLeft('assets');
                                }}
                                onMouseLeave={() => {
                                    setLeftHoveringTrigger(false);
                                    setTimeout(closeLeftIfIdle, 150);
                                }}
                            >
                                <Image size={14} />
                                Assets
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setLeftHoveringTrigger(true);
                                    openLeft('shapes');
                                }}
                                onMouseLeave={() => {
                                    setLeftHoveringTrigger(false);
                                    setTimeout(closeLeftIfIdle, 150);
                                }}
                            >
                                <Square size={14} />
                                Shapes
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setLeftHoveringTrigger(true);
                                    openLeft('projects');
                                }}
                                onMouseLeave={() => {
                                    setLeftHoveringTrigger(false);
                                    setTimeout(closeLeftIfIdle, 150);
                                }}
                            >
                                <Sparkles size={14} />
                                My Projects
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setLeftHoveringTrigger(true);
                                    openLeft('filters');
                                }}
                                onMouseLeave={() => {
                                    setLeftHoveringTrigger(false);
                                    setTimeout(closeLeftIfIdle, 150);
                                }}
                            >
                                <Filter size={14} />
                                Filter Browser
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setLeftHoveringTrigger(true);
                                    openLeft('effects');
                                }}
                                onMouseLeave={() => {
                                    setLeftHoveringTrigger(false);
                                    setTimeout(closeLeftIfIdle, 150);
                                }}
                            >
                                <Zap size={14} />
                                Effect Browser
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setRightHoveringTrigger(true);
                                    openRight('filterSettings');
                                }}
                                onMouseLeave={() => {
                                    setRightHoveringTrigger(false);
                                    setTimeout(closeRightIfIdle, 150);
                                }}
                            >
                                <Settings size={14} />
                                Presets
                            </button>
                            <button
                                type='button'
                                className='nw-library-item'
                                onMouseEnter={() => {
                                    setRightHoveringTrigger(true);
                                    openRight('aiSettings');
                                }}
                                onMouseLeave={() => {
                                    setRightHoveringTrigger(false);
                                    setTimeout(closeRightIfIdle, 150);
                                }}
                            >
                                <Sparkles size={14} />
                                AI Styles
                            </button>
                        </div>
                    </aside>

                    <main className='nw-canvas-wrap'>
                        <div className='nw-canvas-header'>
                            <div>
                                <p className='nw-overline'>Image Canvas</p>
                                <h2>Untitled canvas</h2>
                                <p className='nw-subtext'>Draw a frame to begin</p>
                            </div>
                            <div className='nw-zoom-badge'>1.00x</div>
                        </div>
                        <div className='nw-canvas-surface'>
                            <div className='nw-canvas-actions'>
                                <button className='nw-action-btn primary' onClick={handleAddText}>
                                    <Type size={16} />
                                    Add Text
                                </button>
                                <button className='nw-action-btn' onClick={handleAddImage}>
                                    <Image size={16} />
                                    Add Image
                                </button>
                                <button className='nw-action-btn' onClick={handleTemplateOpen}>
                                    <LayoutTemplate size={16} />
                                    Templates
                                </button>
                            </div>
                            <div className='nw-canvas-frame'>
                                <CanvasWrapper />
                                <div className='nw-canvas-guide' />
                            </div>
                        </div>
                    </main>

                    <aside className='nw-inspector'>
                        <div className='nw-panel'>
                            <div className='nw-panel-head'>
                                <div>
                                    <h3>{selection ? 'Layer Properties' : 'Background'}</h3>
                                    <p className='nw-subtext'>
                                        {selection ? 'Live-updating values for the selected element.' : 'Adjust the canvas baseline styling.'}
                                    </p>
                                </div>
                                <span className='nw-pill'>{selection ? 'Selected' : 'Canvas'}</span>
                            </div>

                            {selection ? (
                                <>
                                    <button className='nw-section-head' onClick={() => toggleSection('position')}>
                                        <span>Position</span>
                                        <span className='nw-subtext'>
                                            {selectionMetrics.x}px, {selectionMetrics.y}px
                                        </span>
                                    </button>
                                    {!collapsedSections.position && (
                                        <div className='nw-field-grid'>
                                            <div className='nw-field'>
                                                <label>X</label>
                                                <input type='number' value={selectionMetrics.x} onChange={(e) => applyTransform('left', e.target.value)} />
                                            </div>
                                            <div className='nw-field'>
                                                <label>Y</label>
                                                <input type='number' value={selectionMetrics.y} onChange={(e) => applyTransform('top', e.target.value)} />
                                            </div>
                                        </div>
                                    )}

                                    <button className='nw-section-head' onClick={() => toggleSection('size')}>
                                        <span>Size</span>
                                        <span className='nw-subtext'>
                                            {selectionMetrics.width}px × {selectionMetrics.height}px
                                        </span>
                                    </button>
                                    {!collapsedSections.size && (
                                        <div className='nw-field-grid'>
                                            <div className='nw-field'>
                                                <label>Width</label>
                                                <input
                                                    type='number'
                                                    value={selectionMetrics.width}
                                                    onChange={(e) => updateSizeField('width', e.target.value)}
                                                />
                                            </div>
                                            <div className='nw-field'>
                                                <label>Height</label>
                                                <input
                                                    type='number'
                                                    value={selectionMetrics.height}
                                                    onChange={(e) => updateSizeField('height', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button className='nw-section-head' onClick={() => toggleSection('style')}>
                                        <span>Style</span>
                                        <span className='nw-subtext'>Fill & effects</span>
                                    </button>
                                    {!collapsedSections.style && (
                                        <div className='nw-field'>
                                            <label>Fill color</label>
                                            <input
                                                type='color'
                                                value={fillValue}
                                                onChange={(e) => updateFill(e.target.value)}
                                                className='nw-color-input'
                                            />
                                        </div>
                                    )}

                                    {isTextSelection && (
                                        <>
                                            <button className='nw-section-head' onClick={() => toggleSection('typography')}>
                                                <span>Typography</span>
                                                <span className='nw-subtext'>Font & weight</span>
                                            </button>
                                            {!collapsedSections.typography && (
                                                <div className='nw-field-grid'>
                                                    <div className='nw-field'>
                                                        <label>Font size</label>
                                                        <input
                                                            type='number'
                                                            value={selection?.fontSize || 16}
                                                            onChange={(e) => applyTransform('fontSize', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='nw-field'>
                                                        <label>Line height</label>
                                                        <input
                                                            type='number'
                                                            step='0.05'
                                                            value={selection?.lineHeight || 1.2}
                                                            onChange={(e) => applyTransform('lineHeight', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className='nw-field'>
                                        <label>Fill Color</label>
                                        <div className='nw-color-row'>
                                            <div className='nw-swatch' />
                                            <div className='nw-swatch' />
                                            <div className='nw-swatch gradient' />
                                        </div>
                                    </div>
                                    <div className='nw-field'>
                                        <label>Overlay opacity</label>
                                        <div className='nw-slider fake' />
                                    </div>
                                    <div className='nw-actions-col'>
                                        <button className='nw-btn primary block'>Upload background image</button>
                                        <button className='nw-btn ghost block'>Remove image</button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='nw-panel'>
                            <h3>Layers & settings</h3>
                            <p className='nw-subtext'>Select an element to edit its styles.</p>
                        </div>
                    </aside>
                </div>

                <div className='nw-bottom'>
                    <div className='nw-ai'>
                        <div>
                            <p className='nw-overline'>AI Studio</p>
                            <p className='nw-subtext'>Generate mockups from any idea</p>
                        </div>
                        <div className='nw-ai-input'>
                            <input type='text' placeholder='Describe your idea...' />
                            <button className='nw-btn primary'>Generate</button>
                        </div>
                    </div>
                    <div className='nw-library'>
                        <div className='nw-library-head'>
                            <p className='nw-overline'>Library</p>
                            <p className='nw-subtext'>Recent uploads & AI outputs</p>
                        </div>
                        <div className='nw-library-grid'>
                            {libraryItems.map((item) => (
                                <div key={item.id} className='nw-lib-card'>
                                    <img src={item.thumb} alt={item.label} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <NamingBubble />
            <NamingQuickModal />
        </NamingAssistantProvider>
    );
}
