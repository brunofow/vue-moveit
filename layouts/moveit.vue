<template>
  <div class="moveit-layout">
    <div :class="isLevelUpModalOpen ? `blur content` : `content`">
      <NavigationBar />
      <Nuxt />
    </div>
    <LevelUpModal v-if="isLevelUpModalOpen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { challenges } from '@/store'

export default Vue.extend({
  computed: {
    isLevelUpModalOpen() {
      return challenges.$isLevelUpModalOpen
    },
  },
})
</script>

<style lang="scss" scoped>
.moveit-layout {
  font-family: $primary-font;
  .content {
    display: grid;
    grid-template-columns: 100px 1fr;
  }
}
</style>
