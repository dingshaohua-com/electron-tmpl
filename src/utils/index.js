import { app, dialog } from "electron";

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
