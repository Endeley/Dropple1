import { preloadCache } from './preloadCache';

export class TemplatePreloader {
    async preloadTemplateList() {
        if (preloadCache.has('TEMPLATE_LIST')) {
            return preloadCache.get('TEMPLATE_LIST');
        }

        const res = await fetch('/api/templates/list');
        const list = await res.json();
        preloadCache.set('TEMPLATE_LIST', list);
        return list;
    }

    async preloadThumbnails(templates = []) {
        templates.forEach((template) => {
            if (!preloadCache.has(`TPL_THUMB_${template.id}`)) {
                const img = new Image();
                img.src = template.thumbnail;
                preloadCache.set(`TPL_THUMB_${template.id}`, img);
            }
        });
    }

    async preloadFullTemplate(templateId) {
        if (preloadCache.has(`TEMPLATE_${templateId}`)) {
            return preloadCache.get(`TEMPLATE_${templateId}`);
        }

        const res = await fetch(`/api/templates/${templateId}`);
        const data = await res.json();

        await Promise.all((data.assets || []).map((src) => this.preloadImage(src)));

        preloadCache.set(`TEMPLATE_${templateId}`, data);
        return data;
    }

    preloadImage(src) {
        return new Promise((resolve) => {
            if (preloadCache.has(src)) {
                resolve(preloadCache.get(src));
                return;
            }

            const img = new Image();
            img.src = src;
            img.onload = () => {
                preloadCache.set(src, img);
                resolve(img);
            };
        });
    }
}

export const templatePreloader = new TemplatePreloader();
