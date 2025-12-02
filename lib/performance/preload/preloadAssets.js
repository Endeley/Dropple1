import { preloadCache } from './preloadCache';

export class AssetPreloader {
    async preloadAssets(list = []) {
        return Promise.all(list.map((src) => this.preloadImage(src)));
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

export const assetPreloader = new AssetPreloader();
