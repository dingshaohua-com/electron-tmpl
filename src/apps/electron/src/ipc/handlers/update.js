import { autoUpdater } from "electron-updater";
import webSendEnum from "../web-send-enum";

//更新检查
export const checkUpdate = () => {
  autoUpdater.checkForUpdates();
};

export const downloadUpdate = () => {
  autoUpdater.downloadUpdate();
};

export const quitAndInstall = () => {
  autoUpdater.quitAndInstall();
};

// 封装更新相关的进程通信方法
const handler = ({ type, data }) => {
  const win = global.app.mainWindow;
  win.webContents.send(webSendEnum.UPDATE, { type, data });
};

// 监听升级失败事件
autoUpdater.on("error", (error) => {
  handler({
    type: "update-error",
    data: error,
  });
});
//监听发现可用更新事件
autoUpdater.on("update-available", (message) => {
  handler({
    type: "update-available",
    data: message,
  });
});
//监听没有可用更新事件
autoUpdater.on("update-not-available", (message) => {
  handler({
    type: "update-not-available",
    data: message,
  });
});

// 更新下载进度事件
autoUpdater.on("download-progress", (progressObj) => {
  handler({
    type: "download-progress",
    data: progressObj,
  });
});
//监听下载完成事件
autoUpdater.on("update-downloaded", (releaseObj) => {
  handler({
    type: "update-downloaded",
    data: releaseObj,
  });
});