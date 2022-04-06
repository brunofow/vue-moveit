<template>
  <div class="challenge-card">
    <div v-if="actualChallenge" class="active-challenge">
      <header>Ganhe {{ actualChallenge.amount }} xp</header>
      <img :src="challengeImage()" />
      <strong>Novo desafio</strong>

      <p>
        {{ actualChallenge.description }}
      </p>

      <div class="challenge-buttons">
        <button @click="resetChallenge()">Falhei</button>
        <button @click="completeChallenge()">Completei</button>
      </div>
    </div>
    <div v-else class="no-challenge">
      <p v-if="!isActive" class="head">Inicie um ciclo para receber desafios</p>
      <p v-else class="head">Ciclo iniciado</p>

      <div :class="isActive && `active-countdown`">
        <img src="@/assets/icons/level-up-arrow.svg" alt="" />

        <p v-if="!isActive">
          Avance de level completando <br />
          os desafios.
        </p>
        <p v-else>
          Complete este ciclo para ganhar experiência e subir de level.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { countdown, challenges } from '@/store'

export default Vue.extend({
  computed: {
    actualChallenge() {
      return challenges.$actualChallenge
    },
    hasFinished() {
      return countdown.$status.hasFinished
    },
    isActive() {
      return countdown.$status.isActive
    },
  },
  watch: {
    hasFinished() {
      if (this.hasFinished) {
        challenges.startNewChallenge()
      }
    },
  },
  methods: {
    challengeImage() {
      if (this.actualChallenge) {
        return require(`@/assets/icons/${this.actualChallenge.type}.svg`)
      }
    },
    completeChallenge() {
      challenges.completeChallenge()
    },
    resetChallenge() {
      challenges.resetChallenge()
      countdown.resetCountdown()
    },
  },
})
</script>

<style lang="scss" scoped>
.challenge-card {
  width: 450px;
  height: 100%;
  background: $white;
  text-align: center;
  border-radius: 5px;

  display: grid;
  align-items: center;
  justify-items: center;

  .active-challenge {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    header {
      padding: 2rem;
      width: 80%;
      font-size: 20px;
      font-weight: 600;
      color: $blue-01;
      border-bottom: 1.5px solid $gray-line;
    }

    img {
      width: 140px;
    }

    strong {
      font-weight: 600;
      color: $title;
      font-size: 30px;
    }

    p {
      width: 80%;
    }

    .challenge-buttons {
      height: 5rem;
      display: flex;
      width: 100%;

      button {
        width: 50%;
        border: 1px solid $gray-line;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;

        &:first-child {
          background: #fff5f5;
          border-left: 0;
          border-bottom: 0;
          color: $red;

          &:hover {
            background: $red;
            color: $white;
          }
        }

        &:last-child {
          background: #f7fff5;
          color: $green;
          border-right: 0;
          border-bottom: 0;

          &:hover {
            background: $green;
            color: $white;
          }
        }
      }
    }
  }

  .no-challenge {
    display: grid;
    justify-items: center;
    grid-gap: 2rem;
    color: $text;

    .head {
      font-size: 24px;
    }

    img {
      transition: all 0.3s;
    }

    p {
      transition: all 0.3s;
    }
  }

  .active-countdown {
    img {
      width: 30px;
      transform: translateX(calc(350px / -2));
    }

    p {
      width: 320px;
      transform: translateY(-45px);
    }
  }
}
</style>
