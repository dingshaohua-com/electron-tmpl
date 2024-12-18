// 此文件不需要动
import path from "node:path";
import { readdirSync } from "node:fs";
import { ipcMain } from "electron";
import importSync from "import-sync";
import webSendEnum from "./web-send-enum.js";


export const getIcpMainHandler = () => {
  let allHandler = {};
  const dirs = readdirSync(path.join(__dirname, "handlers"), "utf8");
  for (const file of dirs) {
    const filePath = path.join(__dirname, "handlers", file);
    const handlers = importSync(filePath);
    allHandler = {
      ...allHandler,
      ...handlers,
    };
  }
  return allHandler;
};

// 主进程中定义（注册） ipcMain.handle方法
export const registerHandlerForIcpMain = () => {
  const ipcMainHandlers = getIcpMainHandler();
  for (const key in ipcMainHandlers) {
    const handler = ipcMainHandlers[key];
    ipcMain.handle(key, (event, ...params) => handler(...params));
  }
};

// 渲染进程定义（注册） ipcMain.handle方法
export const registerHandlerForPreload = () => {
  const ipcMainHandlers = getIcpMainHandler();
  return Object.keys(ipcMainHandlers);
};

// 以上两个方法的汇总
export const registerHandlerForMainAndPreload = () => {
  registerHandlerForIcpMain();
  ipcMain.on("getIcpHandlerAndSendWebEvents", (event, data) => {
    event.returnValue = {
      icpHandlers: registerHandlerForPreload(),
      sendWebEvents: Object.values(webSendEnum),
    };
  });
};
