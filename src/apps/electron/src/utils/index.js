import { app, dialog } from "electron";
import path from "node:path";
export * from "@electron-tmpl/utils/fmt-name.js";

const isPackaged = app.isPackaged;
export const kebabCase_to_camelCase = (fileName, upperCamel = false) => {
  // 转换为小写，并用正则表达式替换每个分隔符后的字符为大写（除非它是字符串的第一个字符）
  let newfileName = fileName
    .toLowerCase() // 先转换为小写
    .replace(/[-_\s]+(.)?/g, (match, p1) => (p1 ? p1.toUpperCase() : ""))
    .replace(/^./, (str) => str.toLowerCase()); // 转换为小驼峰
  if (upperCamel) {
    newfileName.charAt(0).toUpperCase() + newfileName.slice(1);
  }
  return newfileName;
};

export const getFileNameFromUrl = (url) => {
  const match = url.match(/([^/]+)\.([^/]+)?$/); // 使用正则表达式匹配文件名（不包括扩展名）
  let fileName;
  if (match && match[1]) {
    fileName = match[1];
  }
  return fileName;
};

export const getPerfectFnameFromUrl = (url, upperCamel = false) => {
  const res = getFileNameFromUrl(url);
  return kebabCase_to_camelCase(res, upperCamel);
};

// 获取资源路径，在打包时，返回的是 app.asar 所在的路径，在开发时，返回的是 src 路径
export const getResourcesPath = () => {
  if (app.isPackaged) {
    return process.resourcesPath;
  } else {
    return path.join(app.getAppPath(), "src");
  }
};


// 不要在安装界面 点击安装界面 左侧的软件图标启动（虽然这是常识，但是需要防呆）
export const dontOpenFromMount = () => {
  const isFormDvd = app.getAppPath().startsWith("/Volumes");
  if (isFormDvd && process.platform === "darwin") {
    dialog
      .showMessageBox({
        type: "info",
        title: "提示",
        message:
          "勿直接在此打开，请安装后到【启动台 或 访达>应用程序】中使用",
        buttons: ["确定"],
      })
      .then((result) => {
        app.quit();
      })
      .catch((err) => {
        app.quit();
      });
  }
};


export const getAdbProgram = () => {
  let adbToolPath = path.join(__dirname,'..',"files", "adbtool");
  // if(isPackaged){
  //   adbToolPath = path.join(process.resourcesPath,'src',"files", "adbtool");
  // }else{
  //   adbToolPath = path.join(__dirname,'..',"files", "adbtool");
  // }
  const isMac = process.platform === "darwin"; // 获取当前运行平台
  let adbProgram;
  if (isMac) {
    adbProgram = path.join(adbToolPath, "mac", "adb");
  } else {
    adbProgram = path.join(adbToolPath, "win", "adb.exe");
  }
  return adbProgram;
};


export const getShellFilePath = (fileName) => {
  let shellFilesPath = path.join(__dirname,'..',"files", "shell");;
  // if(isPackaged){
  //   shellFilesPath = path.join(process.resourcesPath,'src',"files", "shell");
  // }else{
  //   shellFilesPath = path.join(__dirname,'..',"files", "shell");
  // }
  const isMac = process.platform === "darwin"; // 获取当前运行平台
  let shellFilePath;
  if (isMac) {
    shellFilePath = path.join(shellFilesPath, fileName+".sh");
  } else {
    shellFilePath = path.join(shellFilesPath, fileName+".ps1");
  }
  return shellFilePath;
};