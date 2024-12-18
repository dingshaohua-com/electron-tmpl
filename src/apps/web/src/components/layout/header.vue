<script setup lang="ts" name="LayoutHeader">

</script>

<template>
  <div class="header">
    
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  /* 避免被收缩 */
  flex-shrink: 0;
  /* 高度与 main.js 中 titleBarOverlay.height 一致  */
  height: 35px;
  /* 标题栏始终在最顶层（避免后续被 Modal 之类的覆盖） */
  z-index: 9;
  background-color: #23272e;
  color: white;
  padding-left: 12px;
  font-size: 14px;

  /* 避免选中窗口标题 */
  user-select: none;
  /* 设置该属性表明这是可拖拽区域，用来移动窗口 */
  -webkit-app-region: drag;

  .title {
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;

    img {
      width: 25px;
      margin-right: 3px;
    }
  }
}
</style>
