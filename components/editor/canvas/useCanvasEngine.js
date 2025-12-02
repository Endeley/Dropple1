'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useEditorStore } from '@/stores/useEditorStore';
import { useCanvasStore } from '@/stores/useCanvasStore';
import { syncLayersWithCanvas } from './engine/syncLayersWithCanvas';
import { attachAutoLayoutEngine } from './engine/autoLayoutEngine';
import { attachComponentEngine } from './engine/componentEngine';
import { attachHistoryEngine } from './engine/historyEngine';
import { attachAutoLayerNaming } from './engine/autoLayerNaming';
import initPixi from './pixi/pixi-init';
import initFabric from './fabric/fabric-init';
import createPixiLayers from './pixi/pixi-layers';
import createPixiRenderer from './pixi/pixi-renderer';

export const useCanvasEngine = () => {
    const setCanvas = useEditorStore((s) => s.setCanvas);
    const setCanvasInstance = useCanvasStore((s) => s.setCanvasInstance);
    const layerSyncCleanup = useRef(null);
    const autoLayoutCleanup = useRef(null);
    const componentEngineCleanup = useRef(null);
    const historyCleanup = useRef(null);
    const autoNameCleanup = useRef(null);

    useEffect(() => {
        return () => {
            if (layerSyncCleanup.current) {
                layerSyncCleanup.current();
                layerSyncCleanup.current = null;
            }
            if (autoLayoutCleanup.current) {
                autoLayoutCleanup.current();
                autoLayoutCleanup.current = null;
            }
            if (componentEngineCleanup.current) {
                componentEngineCleanup.current();
                componentEngineCleanup.current = null;
            }
            if (historyCleanup.current) {
                historyCleanup.current();
                historyCleanup.current = null;
            }
            if (autoNameCleanup.current) {
                autoNameCleanup.current();
                autoNameCleanup.current = null;
            }
        };
    }, []);

    const initializeEngine = useCallback(
        async (container) => {
            // Pixi GPU renderer
            const pixiApp = await initPixi(container);

            // Pixi Layers
            const pixiLayers = createPixiLayers(pixiApp);

            // Fabric overlay
            const fabricCanvas = initFabric(container, pixiApp);

            // Pixi render loop sync to Fabric
            createPixiRenderer(pixiApp, pixiLayers, fabricCanvas);

            setCanvas(fabricCanvas);
            setCanvasInstance(fabricCanvas);

            if (layerSyncCleanup.current) {
                layerSyncCleanup.current();
            }
            layerSyncCleanup.current = syncLayersWithCanvas(fabricCanvas);

            if (autoLayoutCleanup.current) {
                autoLayoutCleanup.current();
            }
            autoLayoutCleanup.current = attachAutoLayoutEngine(fabricCanvas);

            if (componentEngineCleanup.current) {
                componentEngineCleanup.current();
            }
            componentEngineCleanup.current = attachComponentEngine(fabricCanvas);

            if (historyCleanup.current) {
                historyCleanup.current();
            }
            historyCleanup.current = attachHistoryEngine(fabricCanvas);

            if (autoNameCleanup.current) {
                autoNameCleanup.current();
            }
            autoNameCleanup.current = attachAutoLayerNaming(fabricCanvas);
        },
        [setCanvas, setCanvasInstance]
    );

    return { initializeEngine };
};
