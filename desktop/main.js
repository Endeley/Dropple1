const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const runLocalSD = require("./ai/localSD");
const runLocalInpaint = require("./ai/localInpaint");
const runLocalUpscale = require("./ai/localUpscale");
const runLocalAudioTTS = require("./ai/localAudioTTS");
const runLocalVideoSD = require("./ai/localVideoSD");

const isProd = process.env.NODE_ENV === "production";

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    backgroundColor: "#0A0A0A",
    title: "Dropple Desktop Pro+",
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    win.loadFile(path.join(__dirname, "../out/index.html"));
  } else {
    win.loadURL(process.env.DROPPLE_DESKTOP_URL || "http://localhost:3000");
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("run-local-model", async (_event, args = {}) => {
  switch (args.type) {
    case "sdxl":
      return runLocalSD(args);
    case "inpaint":
      return runLocalInpaint(args);
    case "upscale":
      return runLocalUpscale(args);
    case "tts":
      return runLocalAudioTTS(args);
    case "video":
      return runLocalVideoSD(args);
    default:
      throw new Error(`Unsupported local model type: ${args.type}`);
  }
});

ipcMain.handle("open-file", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: "Dropple Project", extensions: ["drpl"] }],
    properties: ["openFile"],
  });
  if (canceled || !filePaths?.length) return null;
  return fs.readFileSync(filePaths[0]).toString("base64");
});

ipcMain.handle("save-file", async (_event, data) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [{ name: "Dropple Project", extensions: ["drpl"] }],
  });
  if (canceled || !filePath) return false;
  fs.writeFileSync(filePath, Buffer.from(data, "base64"));
  return true;
});

ipcMain.handle("get-hardware-info", async () => {
  return {
    platform: process.platform,
    arch: process.arch,
    gpu: app.getGPUFeatureStatus?.() ?? {},
  };
});
