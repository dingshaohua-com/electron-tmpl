import path from 'path';
import { app } from 'electron';
import { BrowserWindow } from 'electron';

app.allowRendererProcessReuse = false;
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
      nodeIntegration: true,
      contextIsolation: false,
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
