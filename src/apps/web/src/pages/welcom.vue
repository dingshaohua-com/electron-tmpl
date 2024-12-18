<script setup lang="ts">
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  VideoSourceType,
  VideoViewSetupMode,
} from 'agora-electron-sdk';

const rtcInit = async () => {
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
</script>

<template>
  <el-button @click="rtcInit()">开始注册</el-button>
  <div>
    <div
      id="join-channel-remote-video"
      style="width: 300px; height: 300px; float: left"
    ></div>
  </div>
</template>

<style scoped lang="scss"></style>
