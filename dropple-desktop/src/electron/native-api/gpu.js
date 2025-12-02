const { app } = require('electron');

exports.getGPUInfo = async () => {
    try {
        const info = await app.getGPUInfo('complete');
        return {
            ok: true,
            adapters: info?.gpuDevice || [],
            auxAttributes: info?.auxAttributes || {},
        };
    } catch (err) {
        return { ok: false, error: err?.message || 'GPU info unavailable' };
    }
};
