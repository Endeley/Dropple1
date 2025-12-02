import { useEffectsStore } from '@/stores/useEffectsStore';
import { EFFECT_TYPES } from './effectTypes';
import { applyShadowEffect } from './shadowEffect';
import { applyOuterGlow } from './glowEffect';
import { applyBlurEffect } from './blurEffect';
import { applyBlendMode } from './blendModes';
import { applyColorAdjustments } from './colorAdjustments';
import { applyLUT } from './lutFilters';
import { removeEffects } from './removeEffects';

export const applyEffects = async (canvas, objectId) => {
    const obj = canvas.getObjects().find((o) => o.__objectId === objectId);
    if (!obj) return;

    const effects = useEffectsStore.getState().effects[objectId] || [];

    removeEffects(obj);

    for (const effect of effects) {
        switch (effect.type) {
            case EFFECT_TYPES.SHADOW:
                applyShadowEffect(obj, effect);
                break;

            case EFFECT_TYPES.OUTER_GLOW:
                applyOuterGlow(obj, effect);
                break;

            case EFFECT_TYPES.BLUR:
                await applyBlurEffect(obj, effect.amount);
                break;

            case EFFECT_TYPES.BLEND_MODE:
                applyBlendMode(obj, effect.mode);
                break;

            case EFFECT_TYPES.SATURATION:
            case EFFECT_TYPES.BRIGHTNESS:
            case EFFECT_TYPES.CONTRAST:
            case EFFECT_TYPES.HUE:
                await applyColorAdjustments(obj, effect);
                break;

            case EFFECT_TYPES.LUT:
                await applyLUT(obj, effect.lutURL);
                break;

            default:
                break;
        }
    }

    obj.setCoords();
    canvas.requestRenderAll();
};
