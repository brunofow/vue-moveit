<template>
  <div class="countdown-button">
    <button v-if="hasFinished" disabled>
      Ciclo encerrado
      <img src="@/assets/icons/complete.svg" />
    </button>
    <button
      v-else-if="isActive && !hasFinished"
      class="stop-countdown"
      @click="stopCountdown"
    >
      Abandonar ciclo
      <img src="@/assets/icons/close.svg" />
    </button>
    <button
      v-else-if="!isActive"
      class="start-countdown"
      @click="startCountdown"
    >
      Iniciar um ciclo
      <img src="@/assets/icons/play.svg" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { countdown } from '@/store'

export default Vue.extend({
  computed: {
    hasFinished() {
      return countdown.$status.hasFinished
    },
    isActive() {
      return countdown.$status.isActive
    },
  },
  methods: {
    startCountdown() {
      countdown.start()
    },
    stopCountdown() {
      countdown.stop()
    },
  },
})
</script>

<style lang="scss" scoped>
.countdown-button {
  button {
    width: 100%;
    padding: 1.5rem 0;
    border-radius: 5px;
    border: 0;
    background: $white;
    color: $text;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    font-weight: 600;
    transition: background 0.3s;
    cursor: pointer;

    img {
      margin-left: 10px;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &.stop-countdown:hover {
      background: $red;
      color: $white;
    }

    &.start-countdown {
      background: $blue-01;
      color: $white;

      &:hover {
        background: $blue-02;
      }
    }
  }
}
</style>
