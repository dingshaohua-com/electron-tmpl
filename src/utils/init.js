import "./gdata.js";
import fixPath from "fix-path";
import { app } from "electron"; // 此模块用于 控制应用程序的事件生命周期&创建和管理应用程序窗口

fixPath();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
app.commandLine.appendSwitch("lang", "zh-CN"); // 设置electron（包含渲染进程 默认语言为）为中文
