import fs from "node:fs";
import path from "node:path";
import fsExtra from "fs-extra/esm";
import {spawn, spawnSync } from "node:child_process";


const args = process.argv.slice(2);
const projectName = args[0];

const projectRoot = path.resolve(process.cwd());
const rootDist = path.resolve(projectRoot, "dist");

const webPath = path.resolve("src","apps","web");
const electronPath = path.resolve("src","apps","electron");

fs.rmSync("dist", { recursive: true, force: true });

if(projectName === "electron"){
    const electronRenderder = path.resolve(electronPath, "src", "renderder");
    const webDist = path.resolve(webPath, "dist");
    // web端打包并移动到electron的src目录下
    spawnSync("npm run", ["--prefix", webPath, "build"], { stdio: "inherit", shell: true });
    fsExtra.moveSync(webDist, electronRenderder, { overwrite: true });
    spawn("npm run", ["--prefix", electronPath, "build"], { stdio: "inherit", shell: true });
}else {
    spawnSync("npm run", ["--prefix", webPath, "build"], {
      stdio: "inherit",
      shell: true,
    });
    fsExtra.moveSync(webDist, rootDist, { overwrite: true });
  }