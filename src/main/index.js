import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";

// eslint-disable-line
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\"); // eslint-disable-line
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9080"
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false
  });
  mainWindow.maximize();
  mainWindow.loadURL(winURL);

  mainWindow.webContents.on("did-finish-load", () => {
    globalShortcut.register("CommandOrControl+Shift+J", () => {
      mainWindow.webContents.openDevTools({ mode: "undocked" });
    });
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

// import { autoUpdater } from "electron-updater";

// autoUpdater.on("update-downloaded", () => {
//   autoUpdater.quitAndInstall();
// });

// app.on("ready", () => {
//   if (process.env.NODE_ENV === "production") autoUpdater.checkForUpdates();
// });

ipcMain.on("installUpdates", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on("checkForUpdates", event => {
  autoUpdater.on("error", e => {
    event.sender.send("updates-reply", {
      type: "error",
      payload: {
        ...e
      }
    });
  });
  autoUpdater.on("update-available", e => {
    event.sender.send("updates-reply", {
      type: "available",
      payload: {
        ...e
      }
    });
  });
  autoUpdater.on("update-not-available", e => {
    event.sender.send("updates-reply", {
      type: "not-available",
      payload: {
        ...e
      }
    });
  });
  autoUpdater.on("update-downloaded", () => {
    event.sender.send("updates-reply", {
      type: "downloaded"
    });
  });
  autoUpdater.on("download-progress", ({ percent }) => {
    event.sender.send("updates-reply", {
      type: "progress",
      payload: {
        percent: percent
      }
    });
  });

  autoUpdater.setFeedURL({
    owner: "Holthain",
    provider: "github",
    repo: "peach",
    url: "https://github.com/Holthain/Peach"
  });

  autoUpdater.checkForUpdates();
});
