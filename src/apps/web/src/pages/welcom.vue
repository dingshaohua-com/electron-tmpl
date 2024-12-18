<script setup lang="ts">

const rtcInit = async () => {
  console.log(electronApi);
  await electronApi.rtcInit();
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
