export const aiCanvasAPI = {
    getSelection(canvas) {
        return canvas?.getActiveObjects?.() || [];
    },

    center(canvas, objects = []) {
        const items = objects.length ? objects : this.getSelection(canvas);
        if (!canvas || !items.length) return;

        const center = canvas.getCenter();
        items.forEach((obj) => {
            obj.center();
            obj.set({ left: center.left - obj.getScaledWidth() / 2, top: center.top - obj.getScaledHeight() / 2 });
            obj.setCoords();
        });
        canvas.requestRenderAll();
    },

    setTextStyle(obj, style = '') {
        if (!obj || obj.type !== 'textbox') return;

        const lowered = style.toLowerCase();
        if (lowered.includes('bold')) obj.set('fontWeight', 'bold');
        if (lowered.includes('italic')) obj.set('fontStyle', 'italic');
        if (lowered.includes('uppercase')) obj.set('textTransform', 'uppercase');

        const sizeMatch = lowered.match(/(\d{2,3})\s?px/);
        if (sizeMatch) {
            obj.set('fontSize', parseInt(sizeMatch[1], 10));
        }

        if (lowered.includes('center')) obj.set('textAlign', 'center');
        if (lowered.includes('left')) obj.set('textAlign', 'left');
        if (lowered.includes('right')) obj.set('textAlign', 'right');
    },

    replaceImage(obj, url) {
        const fabric = typeof window !== 'undefined' ? window.fabric : null;
        if (!fabric || !obj || obj.type !== 'image') return;

        fabric.Image.fromURL(url, (img) => {
            img.set({
                left: obj.left,
                top: obj.top,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                angle: obj.angle,
            });

            obj.canvas.remove(obj);
            obj.canvas.add(img);
            obj.canvas.setActiveObject(img);
            obj.canvas.requestRenderAll();
        }, { crossOrigin: 'anonymous' });
    },
};
