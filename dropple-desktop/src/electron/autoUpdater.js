const { autoUpdater } = require('electron-updater');
const { app, dialog } = require('electron');

exports.initAutoUpdater = () => {
    if (process.env.NODE_ENV === 'development') return;

    autoUpdater.on('update-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: 'A new version of Dropple is downloading in the background.',
        });
    });

    autoUpdater.on('update-downloaded', () => {
        dialog
            .showMessageBox({
                type: 'info',
                title: 'Update ready',
                message: 'Restart Dropple to apply updates?',
                buttons: ['Restart', 'Later'],
            })
            .then((result) => {
                if (result.response === 0) {
                    autoUpdater.quitAndInstall();
                }
            });
    });

    autoUpdater.checkForUpdatesAndNotify();
};
