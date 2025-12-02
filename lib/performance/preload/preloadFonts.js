import { preloadCache } from './preloadCache';

export class FontPreloader {
    async preloadFont(fontName, url) {
        if (preloadCache.has(`FONT_${fontName}`)) return;
        const font = new FontFace(fontName, `url(${url})`);
        await font.load();
        document.fonts.add(font);
        preloadCache.set(`FONT_${fontName}`, true);
    }
}

export const fontPreloader = new FontPreloader();
