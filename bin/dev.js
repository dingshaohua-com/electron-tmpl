import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// import packageJson  from './package.json';

// 获取都有哪些项目
const ignoreDir = [".DS_Store"];
const appsDir = path.resolve("src", "apps");
const apps = fs
  .readdirSync(appsDir, { withFileTypes: true })
  .filter((it) => !ignoreDir.includes(it.name));

// 根据项目启动顺序排序(貌似也不重要了，后续再优化把)
apps.sort((a, b) => {
  const aPkgPath = path.join(a.parentPath, a.name, "package.json");
  const bPkgPath = path.resolve(b.parentPath, b.name, "package.json");
  const aPkg = JSON.parse(fs.readFileSync(aPkgPath));
  const bPkg = JSON.parse(fs.readFileSync(bPkgPath));
  return aPkg.startSequence - bPkg.startSequence;
});

// 应该全部启动
apps.forEach((app) => {
  if (ignoreDir.includes(app.name)) return false;
  const appPath = path.resolve(app.parentPath, app.name);
  spawn("npm run", ["--prefix", appPath, "dev"], {
    stdio: "inherit",
    shell: true,
  });
  console.log(`启动项目 ${app.name} 成功`);
});


// Vite 项目的启动命令（如 npm run dev）通常会导致 主线程阻塞并等待子进程退出。
// 由于 Vite 的开发服务器是一个 长期运行的进程，它不会主动退出，因此 spawnSync 会一直阻塞，主线程的后续代码也不会执行。