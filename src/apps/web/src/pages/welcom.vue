<script setup lang="ts">
import { initRtc, joinChannel, getEventHandles } from '@/utils/rtc-helper'

const rtcInit = async () => {
  try {
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
  } catch (error) {
    console.error('RTC初始化失败:', error);
  }
};
</script>

<template>
  <el-button @click="rtcInit()">开始注册</el-button>
  <div>
    <!--在界面中添加本地视频窗口 -->
    <div id="join-channel-local-video" style="width: 300px; height: 300px; float: left"></div>
    <!--在界面中添加远端视频窗口 -->
    <div id="join-channel-remote-video" style="width: 300px; height: 300px; float: left"></div>
  </div>

</template>

<style scoped lang="scss">
.local-video {
  width: 400px;
  height: 300px;
  background-color: rgba($color: #000000, $alpha: 0.1);
}
</style>
