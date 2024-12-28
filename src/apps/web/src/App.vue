<template>
  <router-view />
</template>
<script setup lang="ts">
if ($electron) {
  $electron.checkUpdate();
  $electron.onUpdate((info) => {
    // console.log('收到检测更新结果', info);

    if (info.type === 'update-available') {
      console.log('有可用更新，开始调用下载');
      $electron.downloadUpdate();
    }

    if (info.type === 'download-progress') {
      console.log('更新文件下载中：', Math.floor(info.data.percent)+'%');
    }

    if (info.type === 'update-downloaded') {
      console.log('更新文件下载完成😊：', info.data);
      console.log('5s之内 重启安装');
      setTimeout(() => {
        $electron.quitAndInstall();
      }, 5000);
    }
  });
}
</script>
