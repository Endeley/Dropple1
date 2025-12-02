const { app } = require('electron');
const path = require('path');

exports.getCachePaths = () => {
    const base = app.getPath('userData');
    return {
        base,
        cache: path.join(base, 'cache'),
        autosaves: path.join(base, 'autosaves'),
        backups: path.join(base, 'backups'),
        thumbnails: path.join(base, 'thumbnails'),
        plugins: path.join(base, 'plugins'),
        video: path.join(base, 'video-renders'),
    };
};
