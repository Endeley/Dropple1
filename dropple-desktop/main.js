const { app, BrowserWindow } = require('electron');
const path = require('path');
const { createAppMenu } = require('./src/electron/appMenu');
const { registerIPCHandlers } = require('./src/electron/ipcHandlers');
const { initAutoUpdater } = require('./src/electron/autoUpdater');

const isDev = process.env.NODE_ENV === 'development';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1500,
        height: 900,
        minWidth: 1100,
        minHeight: 700,
        backgroundColor: '#111111',
        title: 'Dropple',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    if (isDev) {
        const devURL = process.env.DROPPLE_DESKTOP_URL || 'http://localhost:3000';
        win.loadURL(devURL);
        win.webContents.openDevTools({ mode: 'detach' });
    } else {
        const rendererPath = path.join(__dirname, 'src/renderer/index.html');
        win.loadFile(rendererPath);
    }
};

app.whenReady().then(() => {
    createAppMenu();
    registerIPCHandlers();

    if (!isDev) {
        initAutoUpdater();
    }

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
