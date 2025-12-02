export const getAssetThumbnail = (asset) => {
    if (asset.type === 'image') return asset.src;
    if (asset.type === 'icon') return asset.src;
    if (asset.type === 'shape') return '/shape-default.png';

    return '/placeholder.png';
};
