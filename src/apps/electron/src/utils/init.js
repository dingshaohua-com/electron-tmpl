import "./gdata.js";
import fixPath from "fix-path";
import { app } from "electron"; // 此模块用于 控制应用程序的事件生命周期&创建和管理应用程序窗口
// import { usb } from "usb";
// import webSendEnum from '../ipc/web-send-enum.js'

fixPath();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
app.commandLine.appendSwitch("lang", "zh-CN"); // 设置electron（包含渲染进程 默认语言为）为中文

// // --===监听Usb插拔 start===--
// const handler = (params) => {
//   const win = global.app.mainWindow;
//   win.webContents.send(webSendEnum.USB, params);
// };
// // 监听设备连接
// usb.on("attach", (device) => {
//   handler({ status: "attach", device });
// });
// // 监听设备断开
// usb.on("detach", (device) => {
//   handler({ status: "detach", device });
// });
// // --===监听Usb插拔 end===--
