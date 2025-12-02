const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopAPI", {
  runLocalModel: (payload) => ipcRenderer.invoke("run-local-model", payload),
  openFile: () => ipcRenderer.invoke("open-file"),
  saveFile: (data) => ipcRenderer.invoke("save-file", data),
  getHardwareInfo: () => ipcRenderer.invoke("get-hardware-info"),
});
