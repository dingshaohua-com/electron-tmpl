import path from 'path';
import { app } from 'electron';
import { BrowserWindow, nativeImage } from 'electron';


export const createMainWindow = () => {
  console.log(111, );
  
  // 创建主应用窗口
  const mainWinOtp = {
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, '../src/preload.js'),
      // nodeIntegration: true,
      // contextIsolation: false,
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
    mainWin.loadFile(path.join(__dirname, '../src/web/index.html'));
  } else {
    mainWin.loadURL('http://localhost:1234');
  }
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
      preload: path.join(__dirname, './preload.js'),
    },
    backgroundColor: '#fff',
    icon: nativeImage.createEmpty(),
    autoHideMenuBar: true, // 子窗口不需要在要完整的父窗口的菜单栏
    // frame: false, // 隐藏标题栏
    // title: "关于",
  };
  const win = new BrowserWindow(winOtp);
  win.setMinimizable(false); // 隐藏窗口的最小化按钮
  win.setMaximizable(false); // 隐藏窗口的最大化按钮
  if (app.isPackaged) {
    const entryPath = path.resolve(__dirname, '..', 'src', 'web', 'index.html');
    win.loadFile(entryPath, { hash: route });
  } else {
    win.loadURL('http://localhost:1234/#' + route);
  }
  return win;
};
