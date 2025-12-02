import GIF from 'gif.js';

export const exportGIF = async (canvas, duration = 3000) => {
    const gif = new GIF({
        workers: 4,
        quality: 10,
    });

    const frames = duration / (1000 / 30);

    for (let i = 0; i < frames; i++) {
        gif.addFrame(canvas.toCanvasElement(), { delay: 33 });
    }

    gif.on('finished', (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dropple-animation.gif';
        link.click();
    });

    gif.render();
};
