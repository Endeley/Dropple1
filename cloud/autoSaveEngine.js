import { saveProject } from './saveProject';

let idleTimeout = null;
let interval = null;

export const initAutoSave = () => {
    interval = setInterval(() => {
        saveProject();
    }, 10000);

    const scheduleIdleSave = () => {
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(saveProject, 3000);
    };

    window.addEventListener('pointerup', scheduleIdleSave);
    window.addEventListener('keydown', scheduleIdleSave);
};

export const stopAutoSave = () => {
    clearInterval(interval);
};
