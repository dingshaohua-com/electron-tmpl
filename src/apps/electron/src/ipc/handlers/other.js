import path from "node:path";
import {app} from 'electron';
import process from "node:process";
import { createOtherWindow } from "../../window.js";
import { dialog, clipboard, shell } from "electron";

export const getEnv = () => {
  return JSON.stringify(process.env);
};

export const openOther = (width, height, route) => {
  createOtherWindow(width, height, route);
};

export const openFileDialog = async (extensions = "*", isMult) => {
  // 创建一个函数，用于选择文件并获取其路径
  // 使用Electron的dialog模块打开文件选择对话框
  const opt = {
    properties: ["openFile"], // 允许用户选择多个文件
    filters: [{ name: "All Files", extensions: [extensions] }],
  };
  isMult && opt.properties.push("multiSelections");
  const result = await dialog.showOpenDialog(opt);

  // 检查用户是否取消了操作或者选择了文件
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  } else {
    console.log("No file selected");
    return null;
  }
};

export const openFilesDialog = async (extensions = ["*"], isMult) => {
  // 创建一个函数，用于选择文件并获取其路径
  // 使用Electron的dialog模块打开文件选择对话框
  const opt = {
    properties: ["openFile"], // 允许用户选择多个文件
    filters: [{ name: "All Files", extensions }],
  };
  isMult && opt.properties.push("multiSelections");
  const result = await dialog.showOpenDialog(opt);

  // 检查用户是否取消了操作或者选择了文件
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths;
  } else {
    console.log("No file selected");
    return null;
  }
};

export const copyToClipboard = (text) => {
  // 打开关于页面
  // 设置剪贴板内容为 'Example Text'
  clipboard.writeText(text);
};

export const showExplorer = (path) => {
  // 文件资源管理器中展示
  const extractDirectoryPath = (filePath) => {
    // 匹配从字符串开始到最后一个目录分隔符（包括）的所有内容
    // 注意：这里同时处理了Unix/Linux风格的`/`和Windows风格的`\`
    const regex = /^(.*[\\\/])?/;
    const matches = filePath.match(regex);
    // 如果找到匹配项，则返回目录部分（matches[0]去掉尾部的目录分隔符），否则返回undefined
    return matches ? matches[0].replace(/[\\\/]$/, "") : filePath;
  };
  const filePath = extractDirectoryPath(path);
  shell.openPath(filePath);
};

export const getAppInfo = () => {
  const appPath = app.getAppPath();
  let builderCfgPath;
  if (app.isPackaged) {
    builderCfgPath = path.join(process.resourcesPath, "electron-builder.json");
  } else {
    builderCfgPath = path.join(appPath, "electron-builder.json");
  }
  const builderCfg = require(builderCfgPath);
  const packageCfg = require(path.join(appPath, "package.json"));
  const allCfg = {
    builderCfg,
    packageCfg,
  };
  return JSON.parse(JSON.stringify(allCfg));
};


export const openExternalLink = (link) => {
  shell.openExternal(link);
};
