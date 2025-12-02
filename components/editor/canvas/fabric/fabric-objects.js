import * as fabric from 'fabric';
import { ensureLayoutProps } from '../layout/layoutDefaults';

/**
 * This file centralizes all Fabric object creation rules,
 * default styles, metadata and future Pixi-sync extensions.
 *
 * It ensures Dropple has consistent objects across:
 * - Graphic design mode
 * - UI/UX design mode
 * - Animation mode
 * - Image editing mode
 *
 * This is the “object factory” of your engine.
 */

// ===============
// GLOBAL FABRIC CONFIG
// ===============
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = '#3b82f6';
fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.prototype.cornerSize = 10;
fabric.Object.prototype.padding = 4;

// For UI/UX mode (Figma-like controls)
fabric.Object.prototype.borderColor = '#3b82f6';
fabric.Object.prototype.borderScaleFactor = 2;
fabric.Object.prototype.selectionBackgroundColor = 'rgba(59,130,246,0.1)';

// Add metadata to all objects
fabric.Object.prototype.toDroppleMeta = function () {
    return {
        id: this.id,
        type: this.type,
        left: this.left,
        top: this.top,
        width: this.width * this.scaleX,
        height: this.height * this.scaleY,
        rotation: this.angle,
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
    };
};

// Generate unique IDs
let OBJECT_ID = 0;
function generateId() {
    return `dropple_obj_${++OBJECT_ID}`;
}

// ===============
// OBJECT FACTORY FUNCTIONS
// ===============

/**
 * Creates a rectangle with Dropple defaults
 */
export function createRectangle(props = {}) {
    const rect = new fabric.Rect({
        id: generateId(),
        width: 200,
        height: 120,
        fill: '#a78bfa',
        rx: 12,
        ry: 12,
        ...props,
    });

    ensureLayoutProps(rect);
    return rect;
}

/**
 * Creates a text element with Dropple defaults
 */
export function createText(content = 'Your Text', props = {}) {
    const text = new fabric.IText(content, {
        id: generateId(),
        fontSize: 32,
        fontFamily: 'Inter, sans-serif',
        fill: '#000',
        ...props,
    });

    ensureLayoutProps(text);
    return text;
}

/**
 * Creates a circle
 */
export function createCircle(props = {}) {
    const circle = new fabric.Circle({
        id: generateId(),
        radius: 60,
        fill: '#34d399',
        ...props,
    });

    ensureLayoutProps(circle);
    return circle;
}

/**
 * Creates an image from URL or file
 */
export function createImage(url, props = {}) {
    return new Promise((resolve) => {
        fabric.Image.fromURL(url, (img) => {
            img.set({
                id: generateId(),
                objectCaching: false,
                ...props,
            });
            ensureLayoutProps(img);

            resolve(img);
        });
    });
}

/**
 * Creates a line
 */
export function createLine(points = [0, 0, 200, 0], props = {}) {
    const line = new fabric.Line(points, {
        id: generateId(),
        stroke: '#000',
        strokeWidth: 4,
        ...props,
    });

    ensureLayoutProps(line);
    return line;
}

/**
 * Creates a transparent image fill (for textures)
 */
export function applyTextureFill(object, textureURL) {
    fabric.util.loadImage(textureURL, (img) => {
        object.set({
            fill: new fabric.Pattern({
                source: img,
                repeat: 'repeat',
            }),
        });
        object.canvas.renderAll();
    });
}

// ===============================
// PIXI SYNC HOOK (Future Integration)
// ===============================
export function fabricToPixiData(obj) {
    return {
        id: obj.id,
        type: obj.type,
        fill: obj.fill,
        stroke: obj.stroke,
        strokeWidth: obj.strokeWidth,
        x: obj.left,
        y: obj.top,
        width: obj.width * obj.scaleX,
        height: obj.height * obj.scaleY,
        rotation: obj.angle,
    };
}

// ===============================
// EXPORT ALL
// ===============================
const fabricObjects = {
    createRectangle,
    createText,
    createCircle,
    createImage,
    createLine,
    applyTextureFill,
    fabricToPixiData,
};

export default fabricObjects;
