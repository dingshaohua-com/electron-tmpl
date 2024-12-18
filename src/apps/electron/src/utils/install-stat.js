import fs from "node:fs";
import path from "node:path";
import { app } from "electron";

// 获取安装app的时间
export const getInstallTime = () => {
  const appPath = path.join(app.getAppPath());
  const appRoot = path.dirname(appPath);
  const fileInfo = fs.statSync(appRoot);
  const installTime = fileInfo.ctime.toLocaleString();
  return installTime;
};

// 判断是否安装后 第一次打开
export const getIsFirstOpen = () => {
  const installTime = getInstallTime();
  const installTimeFromStore = global.app.store.get("installTime");
  // 如果 store记录里的安装时间 与 真实的安装时间 不一致，则说明是第一次打开
  if (installTimeFromStore !== installTime) {
    return true;
  } else {
    return false;
  }
};

// 当 app 第一次安装或者重新安装时，第一次打开的时候 执行的操作
export const fisrtOpenDo = () => {
  const isFirstOpen = getIsFirstOpen();
  // if(isFirstOpen){
  //     console.log('第一次打开');
  //     app.store.clear();
  //     app.store.set('installTime', installTime);
  // }else{
  //     console.log('不是第一次打开');
  // }
};
