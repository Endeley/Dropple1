export const exportSVG = (canvas) => {
    const svg = canvas.toSVG({ suppressPreamble: false });
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dropple.svg';
    a.click();
};
