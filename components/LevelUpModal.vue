<template>
  <div class="overlay" @click="closeModal">
    <div class="level-up-modal" @click.stop>
      <img src="@/assets/icons/close.svg" @click="closeModal" />

      <span>
        <img src="@/assets/icons/levelup.svg" />
        <h1>{{ level }}</h1>
      </span>
      <h2>Parabéns</h2>
      <p>Você alcançou um novo level.</p>

      <button>
        Compartilhar no Twitter
        <unicon name="twitter" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { challenges } from '@/store'

export default Vue.extend({
  computed: {
    level() {
      return challenges.$level
    },
  },
  methods: {
    closeModal() {
      challenges.closeModal()
    },
  },
})
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($background, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;

  .level-up-modal {
    background: $white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    user-select: none;

    > img {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 3rem 0 2rem;

      h1 {
        position: absolute;
        font-size: 140px;
        color: $blue-01;
      }
    }

    button {
      width: 400px;
      height: 80px;
      margin-top: 2rem;
      border-top: 1px solid $gray-line;
      border-radius: 0 0 5px 5px;
      background: #f5fcff;
      color: #2aa9e0;
      font-weight: 600;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      .unicon {
        fill: #2aa9e0;
        margin-left: 10px;
      }

      &:hover {
        background: #2aa9e0;
        color: #f5fcff;

        .unicon {
          fill: #fff;
        }
      }
    }
  }
}
</style>
