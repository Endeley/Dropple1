import { templatePreloader } from './preloadTemplates';
import { assetPreloader } from './preloadAssets';
import { fontPreloader } from './preloadFonts';
import { preloadPredictionEngine } from './preloadPredictions';

class PreloadManager {
    preloadTemplates(category) {
        preloadPredictionEngine.record(`CATEGORY_${category.toUpperCase()}`);
        return templatePreloader.preloadTemplateList().then((list) => {
            const filtered = list.filter((template) => template.category === category);
            return templatePreloader.preloadThumbnails(filtered);
        });
    }

    preloadTemplateFull(id) {
        preloadPredictionEngine.record(`HOVER_TEMPLATE_${id}`);
        return templatePreloader.preloadFullTemplate(id);
    }

    preloadAssets(list) {
        return assetPreloader.preloadAssets(list);
    }

    preloadFont(name, url) {
        return fontPreloader.preloadFont(name, url);
    }

    tickPrediction() {
        preloadPredictionEngine.predictAndPreload();
    }
}

export const preloadManager = new PreloadManager();
