<template>
  <div class="completed-challenges">
    <p>Desafios completados</p>
    <span>{{ String(completedChallenges).padStart(2, '0') }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { challenges } from '@/store'

export default Vue.extend({
  computed: {
    completedChallenges() {
      return challenges.$completedChallenges
    },
  },
})
</script>

<style lang="scss" scoped>
.completed-challenges {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: $text;
  font-weight: 600;
  border-bottom: 1.5px solid #d7d8da;
  padding-bottom: 1rem;
}
</style>
