export async function generateWaveform(audioBuffer, samples = 1024) {
  const channelData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(channelData.length / samples);
  const waveform = [];
  for (let i = 0; i < samples; i++) {
    const start = i * blockSize;
    const end = start + blockSize;
    let min = 1.0;
    let max = -1.0;
    for (let j = start; j < end; j++) {
      const v = channelData[j];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    waveform.push({ min, max });
  }
  return waveform;
}
