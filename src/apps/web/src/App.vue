<template>
  <router-view />
</template>
<script setup lang="ts">
  console.log($electron);
</script>


<!-- if (window.$electron) {
  // $electron.checkUpdate();
  // $electron.onUpdate((info) => {
  //   const eventName = 'on' + kebabCase_to_camelCase(info.type, true);
  //   checkUpdateEvent[eventName](info.data);
  // });
} -->