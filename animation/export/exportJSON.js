export const exportAnimationJSON = (keyframes) => {
    const json = JSON.stringify({ keyframes }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dropple-animation.json';
    a.click();
};
