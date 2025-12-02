class PreloadCache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value) {
        this.cache.set(key, value);
    }

    get(key) {
        return this.cache.get(key);
    }

    has(key) {
        return this.cache.has(key);
    }

    remove(key) {
        this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }
}

export const preloadCache = new PreloadCache();
