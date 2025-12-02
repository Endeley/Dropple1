import createPixiLayers from './pixi/pixi-layers';
import createPixiRenderer from './pixi/pixi-renderer';

export const useCanvasEngine = () => {
    const setCanvas = useEditorStore((s) => s.setCanvas);

    const initializeEngine = (container) => {
        // Pixi GPU renderer
        const pixiApp = initPixi(container);

        // Pixi Layers
        const pixiLayers = createPixiLayers(pixiApp);

        // Fabric overlay
        const fabricCanvas = initFabric(container, pixiApp);

        // Pixi render loop sync to Fabric
        createPixiRenderer(pixiApp, pixiLayers, fabricCanvas);

        setCanvas(fabricCanvas);
    };

    return { initializeEngine };
};
