<template>
  <aside class="navigation-bar">
    <img src="@/assets/images/logo.svg" alt="Logo Move it" />

    <nav>
      <nuxt-link to="/" exact active-class="active-route">
        <unicon name="estate" width="30" height="30" />
      </nuxt-link>
      <nuxt-link to="/leaderboard" active-class="active-route">
        <unicon name="award-alt" width="30" height="30" />
      </nuxt-link>
    </nav>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
$icon-size: 30px;
$bar-size: 50px;

.navigation-bar {
  height: 100vh;
  background: $white;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-top: 1rem;

  nav {
    display: grid;
    grid-template-rows: repeat(2, $icon-size);
    grid-gap: 2rem;
    width: 100%;

    .unicon {
      display: flex;
      justify-content: center;
      cursor: pointer;
      fill: $text;
    }
  }

  .active-route .unicon {
    fill: $blue-01;
    position: relative;

    &::before {
      content: '';
      width: 4px;
      height: $bar-size;
      background: $blue-01;
      border-radius: 0 5px 5px 0;
      position: absolute;
      left: 0;
      top: calc(($bar-size - $icon-size) / -2);
    }
  }
}
</style>
