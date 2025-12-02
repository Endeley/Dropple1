export const recordVoice = async (timeout = 5000) => {
    if (typeof navigator === 'undefined') throw new Error('Voice input only works in browser');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
    };

    recorder.start();

    return new Promise((resolve) => {
        const stopRecording = () => {
            recorder.stop();
            stream.getTracks().forEach((track) => track.stop());
        };

        recorder.onstop = () => {
            resolve(new Blob(chunks, { type: 'audio/webm' }));
        };

        setTimeout(stopRecording, timeout);
    });
};
