const { Menu, BrowserWindow } = require('electron');

const sendToFocused = (channel, payload) => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;
    win.webContents.send(channel, payload);
};

exports.createAppMenu = () => {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => sendToFocused('app:new-project'),
                },
                {
                    label: 'Open Recent',
                    submenu: [{ role: 'recentDocuments' }, { type: 'separator' }, { label: 'Clear', role: 'clearRecentDocuments' }],
                },
                {
                    label: 'Open…',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => sendToFocused('app:open-project'),
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => sendToFocused('app:save-project'),
                },
                { type: 'separator' },
                { role: 'close' },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn Dropple',
                    click: () => sendToFocused('app:help'),
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
