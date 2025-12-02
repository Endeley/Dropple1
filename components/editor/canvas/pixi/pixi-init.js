import { Application } from 'pixi.js';

export default async function initPixi(container) {
    const app = new Application();

    await app.init({
        resizeTo: container,
        backgroundAlpha: 0,
        antialias: true,
    });

    container.appendChild(app.canvas);

    // Layers
    app.stage.sortableChildren = true;

    return app;
}
