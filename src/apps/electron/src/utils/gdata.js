import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import Store from 'electron-store';
import { getResourcesPath } from './index.js'

// 定义一个全局变量 __dirname
let dirnameVal = "";
Object.defineProperty(global, "__dirname", {
  get() {
    // ---这段代码不能提出去---
    const stackLines = new Error().stack.split("\n");
    const callerLine = stackLines[2];
    const res = callerLine.match(/\(([^)]*)\)/);
    if(res){
      const [_, callerFilePath] = res;
      return path.dirname(fileURLToPath(callerFilePath));
    }

    // --- 返回出去 ---
    return '';
  },
  set(value) {
    dirnameVal = value;
  },
});

global.require = (path) => {
  // ---这段代码不能提出去---
  const stackLines = new Error().stack.split("\n");
  const callerLine = stackLines[2];
  const [_, callerFilePath] = callerLine.match(/\(([^)]*)\)/);
  const trequire = createRequire(callerFilePath);
  return trequire(path);
};

const cwd = getResourcesPath();
global.app = {
  mainWindow: null,
  store:new Store()
};