const Store = require('electron-store');

const store = new Store({
    name: 'dropple-preferences',
    defaults: {
        theme: 'dark',
        autosave: true,
        hardwareAcceleration: true,
        lastOpened: null,
    },
});

exports.get = () => store.store;
exports.set = (prefs) => store.set(prefs);
