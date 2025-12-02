const fs = require('fs');
const path = require('path');
const { dialog, app } = require('electron');

const PROJECT_FILTER = [{ name: 'Dropple Project', extensions: ['dpp'] }];

exports.saveFile = async (data) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        filters: PROJECT_FILTER,
        defaultPath: path.join(app?.getPath?.('documents') || '', 'project.dpp'),
    });

    if (canceled || !filePath) {
        return null;
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return filePath;
};

exports.openFile = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        filters: PROJECT_FILTER,
        properties: ['openFile'],
    });

    if (canceled || !filePaths?.length) return null;

    const file = fs.readFileSync(filePaths[0], 'utf-8');
    return JSON.parse(file);
};
