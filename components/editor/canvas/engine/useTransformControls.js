'use client';

import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/stores/useEditorStore';
import { useSelectionStore } from '@/stores/useSelectionStore';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { useGuidesStore } from '@/stores/useGuidesStore';
import { useAutoLayoutDragStore } from '@/stores/useAutoLayoutDragStore';
import { computeBoundingBox } from '../utils/computeBoundingBox';
import { computeGroupBoundingBox } from '../utils/computeGroupBoundingBox';
import { computeSmartGuides } from '../utils/computeSmartGuides';
import { computeEqualSpacingX } from '../utils/computeEqualSpacingX';
import { computeEqualSpacingY } from '../utils/computeEqualSpacingY';
import { ensureLayoutProps, getObjectId } from '../layout/layoutDefaults';
import { computeInsertIndex } from '../layout/computeInsertIndex';
import { computeInsertIndicator } from '../layout/computeInsertIndicator';
import { applyAutoLayout } from '../layout/applyAutoLayout';

const HANDLE_DEFS = {
    tl: { x: -1, y: -1, rotate: false },
    tm: { x: 0, y: -1, rotate: false },
    tr: { x: 1, y: -1, rotate: false },
    mr: { x: 1, y: 0, rotate: false },
    br: { x: 1, y: 1, rotate: false },
    bm: { x: 0, y: 1, rotate: false },
    bl: { x: -1, y: 1, rotate: false },
    ml: { x: -1, y: 0, rotate: false },
    rot: { rotate: true },
};

export function useTransformControls() {
    const sessionRef = useRef(null);
    const autoLayoutFrameRef = useRef(null);
    const canvas = useEditorStore((s) => s.fabricCanvas);
    const setSelectionBounds = useSelectionStore((s) => s.setSelection);
    const clearSelectionBounds = useSelectionStore((s) => s.clear);
    const setZoom = useCanvasStore((s) => s.setZoom);
    const setOffset = useCanvasStore((s) => s.setOffset);
    const setGuides = useGuidesStore((s) => s.setGuides);
    const setSpacingGuides = useGuidesStore((s) => s.setSpacing);
    const clearGuides = useGuidesStore((s) => s.clear);

    useEffect(() => {
        if (!canvas) return;

        const updateOverlay = () => {
            const zoom = canvas.getZoom();
            const vpt = canvas.viewportTransform;
            setZoom(zoom);
            setOffset({ x: vpt[4], y: vpt[5] });

            const actives = canvas.getActiveObjects() || [];
            if (!actives.length) {
                clearSelectionBounds();
                return;
            }

            const activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'group') {
                const bbox = computeBoundingBox(activeObject, canvas);
                const childIds = activeObject._objects.map(
                    (obj, idx) => obj.__objectId ?? obj.id ?? obj.name ?? `obj-${idx}`
                );
                const groupId =
                    activeObject.__objectId ??
                    activeObject.id ??
                    activeObject.name ??
                    'group-active';
                setSelectionBounds([groupId, ...childIds], bbox);
                return;
            }

            if (actives.length === 1) {
                const active = actives[0];
                const bbox = computeBoundingBox(active, canvas);
                const id = active.__objectId ?? active.id ?? active.name ?? 'active';
                setSelectionBounds([id], bbox);
                return;
            }

            const bbox = computeGroupBoundingBox(actives, canvas);
            const ids = actives.map((obj, idx) => obj.__objectId ?? obj.id ?? obj.name ?? `obj-${idx}`);
            setSelectionBounds(ids, bbox);
        };

        const events = [
            'object:moving',
            'object:scaling',
            'object:rotating',
            'object:modified',
            'selection:created',
            'selection:updated',
            'selection:cleared',
            'canvas:zoom',
            'canvas:pan',
            'canvas:render',
            'after:render',
            'mouse:wheel',
        ];

        const handleObjectMoving = (evt) => {
            const active = evt?.target;
            if (!active) {
                clearGuides();
                return;
            }

            const others = canvas.getObjects().filter((obj) => obj !== active);
            if (!others.length) {
                setGuides([]);
                setSpacingGuides([]);
                return;
            }

            const guides = computeSmartGuides(active, others, canvas, 6);
            setGuides(guides);

            const spacingX = computeEqualSpacingX(active, others, canvas, 6);
            const spacingY = computeEqualSpacingY(active, others, canvas, 6);
            setSpacingGuides([...spacingX, ...spacingY]);

            const rect = active.getBoundingRect(false, false);
            const offsetX = active.left - rect.left;
            const offsetY = active.top - rect.top;

            guides.forEach((guide) => {
                switch (guide.type) {
                    case 'v-center': {
                        const newRectLeft = guide.x1 - rect.width / 2;
                        active.set({ left: newRectLeft + offsetX });
                        break;
                    }
                    case 'h-center': {
                        const newRectTop = guide.y1 - rect.height / 2;
                        active.set({ top: newRectTop + offsetY });
                        break;
                    }
                    case 'v-left': {
                        const newRectLeft = guide.x1;
                        active.set({ left: newRectLeft + offsetX });
                        break;
                    }
                    case 'v-right': {
                        const newRectLeft = guide.x1 - rect.width;
                        active.set({ left: newRectLeft + offsetX });
                        break;
                    }
                    case 'h-top': {
                        const newRectTop = guide.y1;
                        active.set({ top: newRectTop + offsetY });
                        break;
                    }
                    case 'h-bottom': {
                        const newRectTop = guide.y1 - rect.height;
                        active.set({ top: newRectTop + offsetY });
                        break;
                    }
                    default:
                        break;
                }
            });

            spacingX.forEach((spacing) => {
                const newRectLeft = spacing.x1 - rect.width;
                active.set({ left: newRectLeft + offsetX });
            });

            spacingY.forEach((spacing) => {
                const newRectTop = spacing.y1 - rect.height;
                active.set({ top: newRectTop + offsetY });
            });

            active.setCoords();
            canvas.requestRenderAll?.();
        };

        const clearGuideOverlay = () => {
            clearGuides();
        };

        events.forEach((evt) => canvas.on(evt, updateOverlay));
        canvas.on('object:moving', handleObjectMoving);
        canvas.on('mouse:up', clearGuideOverlay);
        canvas.on('selection:cleared', clearGuideOverlay);
        updateOverlay();

        return () => {
            events.forEach((evt) => canvas.off(evt, updateOverlay));
            canvas.off('object:moving', handleObjectMoving);
            canvas.off('mouse:up', clearGuideOverlay);
            canvas.off('selection:cleared', clearGuideOverlay);
        };
    }, [
        canvas,
        clearGuides,
        clearSelectionBounds,
        setGuides,
        setOffset,
        setSelectionBounds,
        setSpacingGuides,
        setZoom,
    ]);

    useEffect(() => {
        if (!canvas) return;

        const storeApi = useAutoLayoutDragStore.getState;

        const findAutoLayoutParent = (obj) => {
            let current = obj?.group;
            while (current) {
                if (current.layoutProps?.autoLayout) return current;
                current = current.group;
            }
            return null;
        };

        const handleMouseDown = (opt) => {
            const target = opt?.target;
            if (!target) return;
            const frame = findAutoLayoutParent(target);
            if (!frame) return;

            autoLayoutFrameRef.current = frame;

            const props = ensureLayoutProps(frame);
            const childId = getObjectId(target);
            if (!childId) return;

            props.draggingChildId = childId;
            const currentIndex = props.children?.indexOf(childId);
            props.dragOverIndex = currentIndex >= 0 ? currentIndex : null;

            const indicator = computeInsertIndicator(frame, props.dragOverIndex ?? 0);
            if (indicator) {
                storeApi().setIndicator(indicator);
            }
        };

        const handleMouseMove = (opt) => {
            const active = canvas.getActiveObject();
            const frame =
                autoLayoutFrameRef.current || findAutoLayoutParent(active);
            if (!frame) return;

            const props = ensureLayoutProps(frame);
            if (!props.draggingChildId) return;

            const pointer = canvas.getPointer(opt?.e);
            const insertIndex = computeInsertIndex(frame, canvas, pointer);
            if (insertIndex === null || insertIndex === undefined) return;

            props.dragOverIndex = insertIndex;

            const indicator = computeInsertIndicator(frame, insertIndex);
            if (indicator) {
                storeApi().setIndicator(indicator);
            } else {
                storeApi().clear();
            }

            canvas.requestRenderAll();
        };

        const handleMouseUp = () => {
            const store = storeApi();
            const active = canvas.getActiveObject();
            const frame =
                autoLayoutFrameRef.current || findAutoLayoutParent(active);

            if (!frame) {
                store.clear();
                autoLayoutFrameRef.current = null;
                return;
            }

            const props = ensureLayoutProps(frame);
            if (props.draggingChildId && props.dragOverIndex !== null) {
                const childId = props.draggingChildId;
                const children = props.children || [];
                const oldIndex = children.indexOf(childId);
                let newIndex = props.dragOverIndex;

                if (oldIndex !== -1) {
                    children.splice(oldIndex, 1);
                    if (newIndex > oldIndex) newIndex -= 1;
                    if (newIndex < 0) newIndex = 0;
                    children.splice(newIndex, 0, childId);
                }

                props.draggingChildId = null;
                props.dragOverIndex = null;

                applyAutoLayout(frame, canvas);
                canvas.requestRenderAll();
            } else {
                props.draggingChildId = null;
                props.dragOverIndex = null;
                canvas.requestRenderAll();
            }

            store.clear();
            autoLayoutFrameRef.current = null;
        };

        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);

        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
        };
    }, [canvas]);

    // -----------------------------------------
    // MOUSE HELPERS
    // -----------------------------------------
    function getMouseWorld(event) {
        if (!canvas) return { x: 0, y: 0 };
        const pointer = canvas.getPointer(event);
        return { x: pointer.x, y: pointer.y };
    }

    // -----------------------------------------
    // START TRANSFORM
    // -----------------------------------------
    function beginTransform(handleId, event) {
        if (!canvas) return;

        const objects = canvas.getActiveObjects();
        if (!objects || objects.length === 0) return;

        const def = HANDLE_DEFS[handleId];
        const mouse = getMouseWorld(event);

        let groupMetrics;
        if (objects.length === 1) {
            const rect = objects[0].getBoundingRect(true, true);
            groupMetrics = {
                groupLeft: rect.left,
                groupTop: rect.top,
                groupWidth: rect.width,
                groupHeight: rect.height,
            };
        } else {
            const bbox = computeGroupBoundingBox(objects, canvas);
            groupMetrics = {
                groupLeft: bbox.groupLeft,
                groupTop: bbox.groupTop,
                groupWidth: bbox.groupWidth,
                groupHeight: bbox.groupHeight,
            };
        }

        const centerX = groupMetrics.groupLeft + groupMetrics.groupWidth / 2;
        const centerY = groupMetrics.groupTop + groupMetrics.groupHeight / 2;

        const startPointerAngle =
            Math.atan2(mouse.y - centerY, mouse.x - centerX) * (180 / Math.PI);

        sessionRef.current = {
            handleId,
            def,
            objects,
            startMouse: mouse,
            startRect: {
                left: groupMetrics.groupLeft,
                top: groupMetrics.groupTop,
                width: groupMetrics.groupWidth,
                height: groupMetrics.groupHeight,
            },
            center: { x: centerX, y: centerY },
            objectsState: objects.map((obj) => ({
                obj,
                left: obj.left,
                top: obj.top,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                angle: obj.angle || 0,
            })),
            isShift: event.shiftKey,
            isAlt: event.altKey,
            startPointerAngle,
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }

    // -----------------------------------------
    // ROTATION
    // -----------------------------------------
    function rotate(mouse) {
        const session = sessionRef.current;
        if (!session) return;

        const angle =
            Math.atan2(mouse.y - session.center.y, mouse.x - session.center.x) *
            (180 / Math.PI);
        const delta = angle - session.startPointerAngle;
        const angleRad = (delta * Math.PI) / 180;

        session.objectsState.forEach((state) => {
            const obj = state.obj;
            const dx = state.left - session.center.x;
            const dy = state.top - session.center.y;

            const newX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
            const newY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

            obj.set({
                left: session.center.x + newX,
                top: session.center.y + newY,
                angle: state.angle + delta,
            });
            obj.setCoords();
        });
    }

    // -----------------------------------------
    // RESIZING
    // -----------------------------------------
    function resize(dx, dy) {
        const session = sessionRef.current;
        if (!session) return;
        const { def, startRect, isShift, isAlt } = session;

        let newW = startRect.width + dx * def.x;
        let newH = startRect.height + dy * def.y;

        if (isShift) {
            const aspect = startRect.width / startRect.height;
            if (Math.abs(newW / newH - aspect) > 0.001) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    newH = newW / aspect;
                } else {
                    newW = newH * aspect;
                }
            }
        }

        if (isAlt) {
            newW = startRect.width + dx * def.x * 2;
            newH = startRect.height + dy * def.y * 2;
        }

        newW = Math.max(5, newW);
        newH = Math.max(5, newH);

        const scaleX = def.x === 0 ? 1 : newW / startRect.width;
        const scaleY = def.y === 0 ? 1 : newH / startRect.height;

        session.objectsState.forEach((state) => {
            const obj = state.obj;
            const newLeft = startRect.left + (state.left - startRect.left) * scaleX;
            const newTop = startRect.top + (state.top - startRect.top) * scaleY;

            obj.set({
                left: newLeft,
                top: newTop,
                scaleX: state.scaleX * scaleX,
                scaleY: state.scaleY * scaleY,
            });
            obj.setCoords();
        });
    }

    // -----------------------------------------
    // ON DRAG MOVE
    // -----------------------------------------
    function onMove(event) {
        if (!sessionRef.current || !canvas) return;

        const mouse = getMouseWorld(event);

        const dx = mouse.x - sessionRef.current.startMouse.x;
        const dy = mouse.y - sessionRef.current.startMouse.y;

        if (sessionRef.current.def.rotate) {
            rotate(mouse);
        } else {
            resize(dx, dy);
        }

        canvas.requestRenderAll?.();
        canvas.renderAll();
    }

    // -----------------------------------------
    // END TRANSFORM
    // -----------------------------------------
    function onUp() {
        sessionRef.current = null;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
    }

    function finishTransform() {
        onUp();
    }

    return {
        beginTransform,
        finishTransform,
    };
}
