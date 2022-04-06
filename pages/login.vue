<template>
  <div class="container">
    <img src="@/assets/images/background-logo.svg" class="background-logo" />

    <div class="login-container">
      <img src="@/assets/images/white-logo.svg" alt="move.it" />

      <h1>Bem-vindo</h1>

      <div class="login-text">
        <unicon name="github" fill="#B2B9FF" width="40" height="40" />
        <p>
          Faça login com seu Github <br />
          para começar
        </p>
      </div>

      <button class="login-button" @click="auth">
        <unicon name="github" fill="#B2B9FF" width="40" height="40" />
        Login com github
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import authenticate from '@/services/auth'

export default Vue.extend({
  asyncData({ app, redirect }) {
    if (app.$cookies.get('token')) {
      redirect('/')
    }
  },
  methods: {
    auth() {
      authenticate(this)
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: $blue-01;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  color: $white;

  .background-logo {
    width: 100%;
  }

  .login-container {
    align-self: center;
    display: grid;
    grid-gap: 2rem;
  }

  .login-text {
    display: flex;
    align-items: center;
    color: $text-blue;
  }

  .unicon {
    transform: scaleX(-1);
    margin-right: 1rem;
  }

  .login-button {
    width: 60%;
    background: linear-gradient(90deg, $blue-02 0%, $blue-01 100%) no-repeat;
    background-size: 50%;
    border: 1.5px solid transparent;
    border-radius: 5px;
    padding: 0.8rem;
    color: $text-blue;
    transition: border 0.3s;
    cursor: pointer;
    border: 1.5px solid $blue-02;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s;

    &:hover {
      background-size: 200%;
    }
  }
}
</style>
