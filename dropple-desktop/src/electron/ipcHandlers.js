const { ipcMain } = require('electron');
const fileSystem = require('./fileSystem');
const preferences = require('./preferences');
const gpu = require('./native-api/gpu');
const cache = require('./native-api/cache');
const video = require('./native-api/video');
const path = require('path');
const { dialog } = require('electron');

exports.registerIPCHandlers = () => {
    ipcMain.handle('save-file', async (_event, data) => fileSystem.saveFile(data));
    ipcMain.handle('open-file', async () => fileSystem.openFile());
    ipcMain.handle('get-preferences', () => preferences.get());
    ipcMain.handle('set-preferences', (_event, prefs) => preferences.set(prefs));
    ipcMain.handle('gpu-info', async () => gpu.getGPUInfo());
    ipcMain.handle('cache-paths', () => cache.getCachePaths());
    ipcMain.handle('video:encode', async (_event, payload) => video.encode(payload));
    ipcMain.handle('dialog:choose-folder', async () => {
        const res = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] });
        return res?.canceled ? null : res.filePaths?.[0];
    });
    ipcMain.handle('path:join', (_event, parts) => path.join(...(parts || [])));
};
