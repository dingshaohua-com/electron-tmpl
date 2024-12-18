<script setup lang="ts" name="Layout">
import LayoutHeader from "./header.vue";
import LayoutContent from "./content.vue";
</script>
<template>
  <div>
    <layout-header />
    <layout-content />
  </div>
</template>
<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
