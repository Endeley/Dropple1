const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopAPI', {
    saveFile: (data) => ipcRenderer.invoke('save-file', data),
    openFile: () => ipcRenderer.invoke('open-file'),
    getAppPreferences: () => ipcRenderer.invoke('get-preferences'),
    setAppPreferences: (prefs) => ipcRenderer.invoke('set-preferences', prefs),
    getGPUInfo: () => ipcRenderer.invoke('gpu-info'),
    getCachePaths: () => ipcRenderer.invoke('cache-paths'),
    chooseFolder: () => ipcRenderer.invoke('dialog:choose-folder'),
    encodeVideo: (payload) => ipcRenderer.invoke('video:encode', payload),
    joinPath: (parts) => ipcRenderer.invoke('path:join', parts),
    on: (channel, callback) => {
        const listener = (_event, payload) => callback?.(payload);
        ipcRenderer.on(channel, listener);
        return () => ipcRenderer.removeListener(channel, listener);
    },
});
