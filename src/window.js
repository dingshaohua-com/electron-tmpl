import path from "path";
import { app } from "electron";
import { BrowserWindow, nativeImage } from "electron";

export const createMainWindow = () => {
  // 创建主应用窗口
  const mainWinOtp = {
    width: 900,
    height: 600,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, "../src/preload.mjs"),
      nodeIntegrationInWorker: true,
      nodeIntegration: true, // 集成node环境到预加载和渲染进程
      contextIsolation: false, //关闭上下文隔离
    },
    // titleBarStyle: "hidden",
    // titleBarOverlay: {
    //   color: "rgba(0,0,0,0)",
    //   height: 35,
    //   symbolColor: "white",
    // },
  };
  const mainWin = new BrowserWindow(mainWinOtp);
  mainWin.setMaximizable(false);
  const entryPath = path.resolve(__dirname,'..', 'src', 'renderder', 'index.html');
  mainWin.loadFile(entryPath);
  return mainWin;
};


export const createOtherWindow = (width, height, route) => {
  const mainWin = global.app.mainWindow;
  // 创建关于应用窗口
  const winOtp = {
    parent: mainWin,
    // modal: true,
    width,
    height,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "./preload.mjs"),
      nodeIntegrationInWorker: true,
      nodeIntegration: true, // 集成node环境到预加载和渲染进程
      contextIsolation: false, //关闭上下文隔离
    },
    backgroundColor: "#fff",
    icon: nativeImage.createEmpty(),
    autoHideMenuBar: true, // 子窗口不需要在要完整的父窗口的菜单栏
    // frame: false, // 隐藏标题栏
    // title: "关于",
  };
  const win = new BrowserWindow(winOtp);
  win.setMinimizable(false); // 隐藏窗口的最小化按钮
  win.setMaximizable(false); // 隐藏窗口的最大化按钮
  const entryPath = path.resolve(__dirname,'..', 'src', 'renderder', 'index.html');
  win.loadFile(entryPath, { hash:route })
  return win;
};