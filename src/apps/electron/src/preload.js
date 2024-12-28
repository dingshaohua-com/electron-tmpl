const { contextBridge, ipcRenderer } = require("electron");

if (!window.electronApi) {
  // 获取主进程里的IcpHandler和SendWebEvents
  const { icpHandlers, sendWebEvents } = ipcRenderer.sendSync(
    "getIcpHandlerAndSendWebEvents"
  );

  // 注入到渲染进程的electronApi对象中
  const electronApiContent = {};
  for (const handlerName of icpHandlers) {
    electronApiContent[handlerName] = function () {
      return ipcRenderer.invoke(handlerName, ...arguments);
    };
  }
  const toUperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  for (const eventName of sendWebEvents) {
    const exposedForWebEventName = "on" + toUperCase(eventName);
    electronApiContent[exposedForWebEventName] = (callback) =>
      ipcRenderer.on(eventName, (_event, value) => callback(value));
  }
  contextBridge.exposeInMainWorld("$electron", electronApiContent);
}
