<template>
  <div class="experience-bar">
    <span>0 xp</span>
    <div class="outside-bar">
      <div
        class="inside-bar"
        :style="{ width: `${percentageToNextLevel}%` }"
      ></div>

      <span
        v-if="percentageToNextLevel > 0"
        class="current-experience"
        :style="{ left: `${percentageToNextLevel}%` }"
      >
        {{ currentExperience }} xp
      </span>
    </div>
    <span>{{ experienceToNextLevel }} xp</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { challenges } from '@/store'

export default Vue.extend({
  computed: {
    currentExperience() {
      return challenges.$currentExperience
    },
    experienceToNextLevel() {
      return challenges.$experienceToNextLevel
    },
    percentageToNextLevel() {
      return Math.round(
        (challenges.$currentExperience * 100) /
          challenges.$experienceToNextLevel
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.experience-bar {
  display: flex;
  align-items: center;

  .outside-bar {
    flex: 1;
    height: 4px;
    background: $gray-line;
    margin: 0 1.5rem;
    border-radius: 4px;
    position: relative;
  }

  .inside-bar {
    height: 4px;
    background: $green;
    border-radius: 4px;
    transition: width 0.5s ease-in-out;
  }

  .current-experience {
    position: absolute;
    top: 12px;
  }
}
</style>
