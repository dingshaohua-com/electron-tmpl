<script setup lang="ts">
import { initRtc, joinChannel, getEventHandles } from '@/utils/rtc-helper';

const rtcInit = async () => {
  try {
    // 初始化 RTC 引擎
    const rtc = initRtc();
    console.log('RTC初始化完成');

    const enableVideoResult = rtc.enableVideo();
    if (enableVideoResult < 0) {
      console.error(`enableVideo failed with error code: ${enableVideoResult}`);
      return;
    }
    console.log('启用视频模块');

    const ret = rtc.startPreview();
    if (ret < 0) {
      console.error(`startPreview failed with error code: ${ret}`);
      return;
    }
    console.log('开启本地视频预览');

    joinChannel(rtc);
    console.log('加入频道');

    // 注册事件回调
    const eventHandles = getEventHandles(rtc);
    rtc.registerEventHandler(eventHandles);
  } catch (error) {
    console.error('RTC初始化失败:', error);
  }
};
</script>

<template>
  <div class="welcom">
    <el-button @click="rtcInit()">开始注册</el-button>
    <div class="videos">
      <div class="video">
        <div class="join-channel-local-video"></div>
        <div class="title">本地视频窗口</div>
      </div>
      <div class="video">
        <div class="join-channel-remote-video"></div>
        <div class="title">远端视频窗口</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.welcom {
  padding: 10px;
}
.videos {
  display: flex;
  margin-left: -10px;
  margin-top: 10px;

  .video {
    width: 300px;
    height: 200px;
    margin-left: 10px;
    background-color: #adf59d;
    position: relative;
    .join-channel-local-video, .join-channel-remote-video{
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      left: 0;
      top: 0;
      color: #fefefe;
      font-size: 12px;
    }
  }
}
</style>
