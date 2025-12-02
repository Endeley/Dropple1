import * as fabric from 'fabric';

const DEFAULT_DESIGN = '/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png';

/**
 * Minimal mockup render scaffold. This does a simple overlay of design -> mask -> base.
 * Warp/lighting pipelines can be expanded later.
 */
export async function renderMockup(mockupDef, canvas, designSrc = DEFAULT_DESIGN) {
    if (!canvas || !mockupDef) return;
    const { baseImageURL, maskURL, lightingMapURL, blendMode = 'multiply' } = mockupDef;

    const [baseImg, designImg] = await Promise.all([
        loadImage(baseImageURL || designSrc),
        loadImage(designSrc),
    ]);

    if (maskURL) {
        designImg.clipPath = await loadImage(maskURL);
    }

    canvas.add(baseImg);

    if (blendMode && designImg.set) {
        designImg.globalCompositeOperation = blendMode;
    }
    canvas.add(designImg);

    if (lightingMapURL) {
        const lighting = await loadImage(lightingMapURL);
        lighting.globalCompositeOperation = 'soft-light';
        canvas.add(lighting);
    }

    canvas.requestRenderAll?.();
    return { baseImg, designImg };
}

function loadImage(src) {
    return new Promise((resolve) => {
        fabric.Image.fromURL(
            src,
            (img) => resolve(img),
            { crossOrigin: 'anonymous' }
        );
    });
}
