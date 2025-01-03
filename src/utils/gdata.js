import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// 定义一个全局变量 __dirname
let dirnameVal = "";
Object.defineProperty(global, "__dirname", {
  get() {
    // ---这段代码不能提出去---
    const stackLines = new Error().stack.split("\n");
    const callerLine = stackLines[2];
    const [_, callerFilePath] = callerLine.match(/\(([^)]*)\)/);

    // --- 返回出去 ---
    return path.dirname(fileURLToPath(callerFilePath));
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

global.app = {
  mainWindow: null,
};

