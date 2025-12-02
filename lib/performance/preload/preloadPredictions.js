import { templatePreloader } from './preloadTemplates';
import { assetPreloader } from './preloadAssets';

export class PreloadPredictionEngine {
    constructor() {
        this.history = [];
    }

    record(action) {
        this.history.push(action);
    }

    async predictAndPreload() {
        const last = this.history[this.history.length - 1];
        if (!last) return;

        if (last === 'CATEGORY_FLYERS') {
            const list = await templatePreloader.preloadTemplateList();
            const flyers = list.filter((template) => template.category === 'flyer');
            await templatePreloader.preloadThumbnails(flyers.slice(0, 10));
        }

        if (last.startsWith('HOVER_TEMPLATE_')) {
            const id = last.replace('HOVER_TEMPLATE_', '');
            await templatePreloader.preloadFullTemplate(id);
        }
    }
}

export const preloadPredictionEngine = new PreloadPredictionEngine();
