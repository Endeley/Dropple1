export const isDesktop =
  typeof window !== "undefined" && Boolean(window.desktopAPI);

export const desktopAPI = {
  runLocalModel: (payload) => window.desktopAPI?.runLocalModel(payload),
  openFile: () => window.desktopAPI?.openFile(),
  saveFile: (data) => window.desktopAPI?.saveFile(data),
  getHardwareInfo: () => window.desktopAPI?.getHardwareInfo?.(),
};
