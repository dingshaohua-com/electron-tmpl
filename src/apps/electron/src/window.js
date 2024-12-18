import path from 'path';
import { app } from 'electron';
import { BrowserWindow } from 'electron';


// 将网页内容与 Electron 的预加载脚本隔离开来，使得它们各自运行在独立的 JavaScript 环境中。

// 防止了网站直接访问Electron的内部API和强大的preload脚本AP
const preload = path.resolve('src','preload.js');
app.allowRendererProcessReuse = false;
console.log(111,preload);
export const createMainWindow = () => {
  // 创建主应用窗口
  const mainWinOtp = {
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      preload: preload // 指定预加载脚本
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 35,
      symbolColor: 'white',
    },
  };
  const mainWin = new BrowserWindow(mainWinOtp);
  mainWin.setMaximizable(false);
  if (app.isPackaged) {
    // mainWin.loadFile(path.resolve('../src/web/index.html'));
  } else {
    mainWin.loadURL('http://localhost:1234');
  }
  return mainWin;
};
