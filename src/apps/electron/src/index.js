import { createMainWindow } from "./window.js";
import { app, BrowserWindow, dialog } from "electron";

//  当 Electron 准备完成的时候将会被触发此钩子，这个阶段你可以创建浏览器 窗口，并且执行一些其它API
app.whenReady().then(() => {
  global.app.mainWindow = createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      global.app.mainWindow = createMainWindow();
    }
  });
});

// windows下关闭所有窗口时退出应用（macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


// 检查并获取设备权限
const checkAndApplyDeviceAccessPrivilege = async ()=> {
  // 检查并获取摄像头权限
  const cameraPrivilege = systemPreferences.getMediaAccessStatus('camera');
  console.log(`Camera privilege before applying: ${cameraPrivilege}`);
  if (cameraPrivilege !== 'granted') {
      await systemPreferences.askForMediaAccess('camera');
      console.log('Requested camera access from user');
  }

  // 检查并获取麦克风权限
  const micPrivilege = systemPreferences.getMediaAccessStatus('microphone');
  console.log(`Microphone privilege before applying: ${micPrivilege}`);
  if (micPrivilege !== 'granted') {
      await systemPreferences.askForMediaAccess('microphone');
      console.log('Requested microphone access from user');
  }
}

checkAndApplyDeviceAccessPrivilege();