import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  VideoSourceType,
  VideoViewSetupMode,
} from 'agora-electron-sdk';

export const rtcEngine = () => {
  const rtc = createAgoraRtcEngine();
  console.log(11122222, rtc.initialize);

  return { ...rtc, initialize: rtc.initialize };
};

export const rtcInit = () => {
  const rtc = createAgoraRtcEngine();
  // 填入你的 App ID
  const APPID = '422860c7ccc744b284943683959f4c38';
  // 填入你的临时 Token
  let token =
    '007eJxTYLhtdfp9xRldS56HIvqx/M3R7zInpjmZb33hX6cy92DrARYFBhMjIwszg2Tz5ORkcxOTJCMLE0sTYzMLY0tTyzSTZGOLH5OS0hsCGRmWFccwMTJAIIjPypCWWVRcwsAAABuwHrc=';
  // 填入生成 Token 时使用的频道名
  const channel = 'first';
  // 用户 ID，并确保其在频道内的唯一性
  let uid = 123;
  // 初始化 RtcEngine 实例
  rtc.initialize({
    appId: APPID,
    logConfig: { filePath: '' },
  });
  console.log('RTC初始化完成');
  
};

// const os = require("os");
// const path = require("path");

// // 填入你的 App ID
// const APPID = "422860c7ccc744b284943683959f4c38";
// // 填入你的临时 Token
// let token = "007eJxTYLhtdfp9xRldS56HIvqx/M3R7zInpjmZb33hX6cy92DrARYFBhMjIwszg2Tz5ORkcxOTJCMLE0sTYzMLY0tTyzSTZGOLH5OS0hsCGRmWFccwMTJAIIjPypCWWVRcwsAAABuwHrc=";
// // 填入生成 Token 时使用的频道名
// const channel = "first";
// // 用户 ID，并确保其在频道内的唯一性
// let uid = 123;
// let rtcEngineTemp;

// const sdkLogPath = path.resolve(os.homedir(), "./test.log");

// // 创建 RtcEngine 实例
// rtcEngineTemp = createAgoraRtcEngine();

// // 初始化 RtcEngine 实例
// rtcEngineTemp.initialize({
//     appId: APPID,
//     logConfig: { filePath: sdkLogPath}
// });

// export const rtcEngine = rtcEngineTemp;

// // 启用视频模块
// rtcEngine.enableVideo();
// // 开启本地视频预览
// rtcEngine.startPreview();
