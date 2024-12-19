const {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  VideoSourceType,
  VideoViewSetupMode,
} = require('agora-electron-sdk');
const { initRtc, joinChannel, getEventHandles } = require('../../utils/rtc-helper')



export const rtcEngine = () => {
  const rtc = createAgoraRtcEngine();
  console.log(11122222, rtc.initialize);

  return { ...rtc, initialize: rtc.initialize };
};

export const rtcInit = () => {
  // 初始化 RTC 引擎
  const rtc = initRtc();
  console.log('RTC初始化完成');

  // 设置本地视频
  // const localVideo = document.querySelector('.join-channel-local-video');
  // const setupLocalVideoResult = rtc.setupLocalVideo(localVideo);
  // if (setupLocalVideoResult < 0) {
  //   console.error(`setupLocalVideo failed with error code: ${setupLocalVideoResult}`);
  //   return;
  // }

  // 启用视频模块
  const enableVideoResult = rtc.enableVideo();
  if (enableVideoResult < 0) {
    console.error(`enableVideo failed with error code: ${enableVideoResult}`);
    return;
  }
  console.log('启用视频模块');

  // 开启本地视频预览
  const ret = rtc.startPreview();
  if (ret < 0) {
    console.error(`startPreview failed with error code: ${ret}`);
    return;
  }
  console.log('开启本地视频预览');


  joinChannel(rtc)

  // 注册事件回调
  const eventHandles = getEventHandles(rtc);
  rtc.registerEventHandler(eventHandles);
  
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
