<template>
  <div class="countdown">
    <div>
      <span>{{ minutes.minuteLeft }}</span>
      <span>{{ minutes.minuteRight }}</span>
    </div>
    <span>:</span>
    <div>
      <span>{{ seconds.secondLeft }}</span>
      <span>{{ seconds.secondRight }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { countdown } from '@/store'

export default Vue.extend({
  computed: {
    minutes() {
      const [minuteLeft, minuteRight] = String(countdown.$time.minutes)
        .padStart(2, '0')
        .split('')

      return {
        minuteLeft,
        minuteRight,
      }
    },
    seconds() {
      const [secondLeft, secondRight] = String(countdown.$time.seconds)
        .padStart(2, '0')
        .split('')

      return {
        secondLeft,
        secondRight,
      }
    },
    time() {
      return countdown.$time.time
    },
  },
  watch: {
    time() {
      countdown.decrementTime()
    },
  },
})
</script>

<style lang="scss" scoped>
.countdown {
  display: flex;
  align-items: center;
  font-family: $secondary-font;
  font-weight: 600;
  color: $title;

  div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: $white;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 8.5rem;
    text-align: center;

    span {
      flex: 1;
    }

    span:first-child {
      border-right: 2px solid #f0f1f3;
    }

    span:last-child {
      border-left: 2px solid #f0f1f3;
    }
  }

  > span {
    font-size: 6.25rem;
    margin: 0 0.5rem;
  }
}
</style>
