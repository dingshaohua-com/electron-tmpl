
// 提取类型定义
type ElectronType = { [key: string]: any };

interface Window { // 扩展全局 Window 接口
  $electron: ElectronType;
}
declare const $electron: ElectronType; // 声明全局变量